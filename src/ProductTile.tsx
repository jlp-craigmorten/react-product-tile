import type React from 'react';
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  useLayoutEffect,
} from 'react';
import { error } from './error';
import { SlotContext, useRegisterSlot } from './SlotContext';
import {
  type LayoutComponent,
  MANDATORY_SLOTS,
  MANDATORY_SLOT_DESCRIPTION,
  MANDATORY_SLOT_IMAGE,
  MANDATORY_SLOT_PRICE,
  OPTIONAL_SLOT_REVIEW,
  type SlotName,
  type Slots,
} from './constants';

interface ProductTileProps {
  layout: LayoutComponent;
  children: React.ReactNode;
}

const useForceUpdate = () => {
  const [, rerender] = useState({});

  return useCallback(() => rerender({}), []);
};

export function ProductTile({ layout: Layout, children }: ProductTileProps) {
  const slotsRef = useRef<Slots>({});
  const rerenderWithSlots = useForceUpdate();
  const [isMounted, setIsMounted] = useState(false);

  useLayoutEffect(() => {
    rerenderWithSlots();
    setIsMounted(true);
  }, [rerenderWithSlots]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && isMounted) {
      const missingSlots = MANDATORY_SLOTS.filter(
        (slot) => !slotsRef.current[slot],
      );

      if (missingSlots.length > 0) {
        console.error(
          error(
            `\`<ProductTile />\` missing mandatory ${missingSlots.length > 1 ? 'children' : 'child'}: ${missingSlots.map((slot) => `\`<${slot.description} />\``).join(', ')}.`,
          ),
        );
      }
    }
  }, [isMounted]);

  const registerSlot = useCallback(
    (name: SlotName, value: React.ReactNode) => {
      slotsRef.current[name] = value;

      if (isMounted) {
        rerenderWithSlots();
      }
    },
    [isMounted, rerenderWithSlots],
  );

  const unregisterSlot = useCallback(
    (name: SlotName) => {
      delete slotsRef.current[name];

      rerenderWithSlots();
    },
    [rerenderWithSlots],
  );

  return (
    <>
      <SlotContext.Provider value={{ registerSlot, unregisterSlot }}>
        {children}
      </SlotContext.Provider>
      <Layout {...slotsRef.current} />
    </>
  );
}

interface ProductTileSlotProps {
  children: React.ReactNode;
}

interface ProductTileCustomSlotProps extends ProductTileSlotProps {
  name: symbol;
}

function ProductTileCustomSlot({ children, name }: ProductTileCustomSlotProps) {
  useRegisterSlot(name, children);

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
