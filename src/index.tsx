/**
 * react-product-tile
 *
 * Proof of concept composable product tile components.
 *
 * @packageDocumentation
 */

import type React from 'react';
import { createContext, useContext, useEffect } from 'react';
import styles from './ProductTile.module.css';

const SLOT_IMAGE = Symbol('ProductTile.Image');
const SLOT_DESCRIPTION = Symbol('ProductTile.Description');
const SLOT_REVIEW = Symbol('ProductTile.Review');
const SLOT_PRICE = Symbol('ProductTile.Price');

type SlotKey =
  | typeof SLOT_IMAGE
  | typeof SLOT_DESCRIPTION
  | typeof SLOT_REVIEW
  | typeof SLOT_PRICE
  | symbol;

const MANDATORY_SLOTS: SlotKey[] = [SLOT_IMAGE, SLOT_DESCRIPTION, SLOT_PRICE];

type RegisterSlotCallback = (key: SlotKey, value: React.ReactNode) => void;

const SlotsContext = createContext<RegisterSlotCallback | null>(null);

function error(message: string) {
  return new Error(`[react-product-tile] ${message}`);
}

function useRegisterSlot(key: SlotKey, value: React.ReactNode) {
  const registerSlot = useContext(SlotsContext);

  if (!registerSlot) {
    throw error('Component must be a child of a `<ProductTile />` component');
  }

  registerSlot(key, value);
}

export type Slots = Map<SlotKey, React.ReactNode>;

export interface LayoutComponentProps {
  slots: Slots;
}

export type LayoutComponent = React.FC<LayoutComponentProps>;

function ProductTileImage({ children }: ProductTileSlotProps) {
  useRegisterSlot(SLOT_IMAGE, children);

  return null;
}

function ProductTileDescription({ children }: ProductTileSlotProps) {
  useRegisterSlot(SLOT_DESCRIPTION, children);

  return null;
}

function ProductTileReview({ children }: ProductTileSlotProps) {
  useRegisterSlot(SLOT_REVIEW, children);

  return null;
}

function ProductTilePrice({ children }: ProductTileSlotProps) {
  useRegisterSlot(SLOT_PRICE, children);

  return null;
}

interface ProductTileCustomSlotProps extends ProductTileSlotProps {
  type: symbol;
}

function ProductTileCustomSlot({ children, type }: ProductTileCustomSlotProps) {
  useRegisterSlot(type, children);

  return null;
}

type ProductTileChild =
  | React.ReactElement<ProductTileSlotProps, typeof ProductTileImage>
  | React.ReactElement<ProductTileSlotProps, typeof ProductTileDescription>
  | React.ReactElement<ProductTileSlotProps, typeof ProductTileReview>
  | React.ReactElement<ProductTileSlotProps, typeof ProductTilePrice>
  | null;

export interface ProductTileProps {
  layout: LayoutComponent;
  children: ProductTileChild | ProductTileChild[];
}

export function ProductTile({ layout: Layout, children }: ProductTileProps) {
  const slots: Slots = new Map();

  // biome-ignore lint/correctness/useExhaustiveDependencies: development only check for on-mount.
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      for (const slot of MANDATORY_SLOTS) {
        if (!slots.has(slot)) {
          throw error(
            `\`<ProductTile />\` missing mandatory child: \`<${slot.description} />\``,
          );
        }
      }
    }
  }, []);

  function registerSlot(key: SlotKey, value: React.ReactNode) {
    slots.set(key, value);
  }

  return (
    <SlotsContext.Provider value={registerSlot}>
      {children}
      <Layout slots={slots} />
    </SlotsContext.Provider>
  );
}

export interface ProductTileSlotProps {
  children: React.ReactNode;
}

ProductTile.Image = ProductTileImage;
ProductTile.Description = ProductTileDescription;
ProductTile.Review = ProductTileReview;
ProductTile.Price = ProductTilePrice;
ProductTile.CustomSlot = ProductTileCustomSlot;

const SLOT_TAG: SlotKey = Symbol('ProductTile.DefaultLayout.Tags');

function ProductTileDefaultLayout({ slots }: LayoutComponentProps) {
  return (
    <article className={styles.defaultLayout}>
      <div className={styles.defaultLayoutImage}>{slots.get(SLOT_IMAGE)}</div>
      <div className={styles.defaultLayoutDescription}>
        {slots.get(SLOT_DESCRIPTION)}
      </div>
      {slots.has(SLOT_TAG) && (
        <div className={styles.defaultLayoutTag}>{slots.get(SLOT_TAG)}</div>
      )}
      {slots.has(SLOT_REVIEW) && (
        <div className={styles.defaultLayoutReview}>
          {slots.get(SLOT_REVIEW)}
        </div>
      )}
      <div className={styles.defaultLayoutPrice}>{slots.get(SLOT_PRICE)}</div>
    </article>
  );
}

ProductTileDefaultLayout.Tag = SLOT_TAG;
ProductTile.DefaultLayout = ProductTileDefaultLayout;
