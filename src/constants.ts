export const MANDATORY_SLOT_IMAGE = Symbol('ProductTile.Image');
export const MANDATORY_SLOT_DESCRIPTION = Symbol('ProductTile.Description');
export const MANDATORY_SLOT_PRICE = Symbol('ProductTile.Price');
export const OPTIONAL_SLOT_REVIEW = Symbol('ProductTile.Review');

export type SlotType =
  | typeof MANDATORY_SLOT_IMAGE
  | typeof MANDATORY_SLOT_DESCRIPTION
  | typeof MANDATORY_SLOT_PRICE
  | typeof OPTIONAL_SLOT_REVIEW
  | symbol;

export const MANDATORY_SLOTS: SlotType[] = [
  MANDATORY_SLOT_IMAGE,
  MANDATORY_SLOT_DESCRIPTION,
  MANDATORY_SLOT_PRICE,
];

export interface Slots {
  [slot: SlotType]: React.ReactNode;
}

export type LayoutComponent = React.FC<Slots>;
