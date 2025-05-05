import type React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { error } from './error';
import { SlotContext, useRegisterSlot } from './SlotContext';
import {
  type LayoutComponent,
  MANDATORY_SLOTS,
  MANDATORY_SLOT_DESCRIPTION,
  MANDATORY_SLOT_IMAGE,
  MANDATORY_SLOT_PRICE,
  OPTIONAL_SLOT_REVIEW,
  type SlotType,
  type Slots,
} from './constants';

interface ProductTileProps {
  layout: LayoutComponent;
  children: React.ReactNode;
}

export function ProductTile({ layout: Layout, children }: ProductTileProps) {
  const [slots, setSlots] = useState<Slots>({});

  const registerSlot = useCallback((key: SlotType, value: React.ReactNode) => {
    setSlots((currentSlots) => ({
      ...currentSlots,
      [key]: value,
    }));
  }, []);

  if (process.env.NODE_ENV === 'development') {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (mounted) {
        const missingSlots = MANDATORY_SLOTS.filter((slot) => !slots[slot]);

        if (missingSlots.length > 0) {
          console.error(
            error(
              `\`<ProductTile />\` missing mandatory ${missingSlots.length > 1 ? 'children' : 'child'}: ${missingSlots.map((slot) => `\`<${slot.description} />\``).join(', ')}.`,
            ),
          );
        }
      }
    }, [slots, mounted]);
  }

  return (
    <>
      <SlotContext.Provider value={registerSlot}>
        {children}
      </SlotContext.Provider>
      <Layout {...slots} />
    </>
  );
}

interface ProductTileSlotProps {
  children: React.ReactNode;
}

interface ProductTileCustomSlotProps extends ProductTileSlotProps {
  type: symbol;
}

function ProductTileCustomSlot({ children, type }: ProductTileCustomSlotProps) {
  useRegisterSlot(type, children);

  return null;
}

function ProductTileImage({ children }: ProductTileSlotProps) {
  useRegisterSlot(MANDATORY_SLOT_IMAGE, children);

  return null;
}

function ProductTileDescription({ children }: ProductTileSlotProps) {
  useRegisterSlot(MANDATORY_SLOT_DESCRIPTION, children);

  return null;
}

function ProductTileReview({ children }: ProductTileSlotProps) {
  useRegisterSlot(OPTIONAL_SLOT_REVIEW, children);

  return null;
}

function ProductTilePrice({ children }: ProductTileSlotProps) {
  useRegisterSlot(MANDATORY_SLOT_PRICE, children);

  return null;
}

ProductTile.Image = ProductTileImage;
ProductTile.Description = ProductTileDescription;
ProductTile.Review = ProductTileReview;
ProductTile.Price = ProductTilePrice;
ProductTile.Slot = ProductTileCustomSlot;
