import type React from 'react';
import { createContext, useContext, useEffect } from 'react';
import { error } from './error';
import type { SlotType } from './constants';

type RegisterSlotCallback = (key: SlotType, value: React.ReactNode) => void;

export const SlotContext = createContext<RegisterSlotCallback | null>(null);

export function useRegisterSlot(key: SlotType, value: React.ReactNode) {
  const registerSlot = useContext(SlotContext);

  if (!registerSlot) {
    throw error(
      `\`<${key.description} />\` must be a child of a \`<ProductTile />\` component.`,
    );
  }

  useEffect(() => {
    registerSlot(key, value);
  }, [key, registerSlot, value]);
}
