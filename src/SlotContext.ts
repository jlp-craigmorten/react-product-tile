import type React from 'react';
import { createContext, useContext, useLayoutEffect } from 'react';
import { error } from './error';
import type { SlotName } from './constants';

type SlotContextProps = {
  registerSlot: (name: SlotName, value: React.ReactNode) => void;
  unregisterSlot: (name: SlotName) => void;
};

export const SlotContext = createContext<SlotContextProps | null>(null);

export function useRegisterSlot(name: SlotName, value: React.ReactNode) {
  const context = useContext(SlotContext);

  if (!context) {
    throw error(
      `\`<${name.description} />\` must be a child of a \`<ProductTile />\` component.`,
    );
  }

  const { registerSlot, unregisterSlot } = context;

  useLayoutEffect(() => {
    registerSlot(name, value);

    return () => {
      unregisterSlot(name);
    };
  }, [name, registerSlot, unregisterSlot, value]);
}
