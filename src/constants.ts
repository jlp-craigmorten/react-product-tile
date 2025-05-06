export const MANDATORY_SLOT_IMAGE = Symbol('ProductTile.Image');
export const MANDATORY_SLOT_DESCRIPTION = Symbol('ProductTile.Description');
export const MANDATORY_SLOT_PRICE = Symbol('ProductTile.Price');
export const OPTIONAL_SLOT_REVIEW = Symbol('ProductTile.Review');

export type SlotName =
  | typeof MANDATORY_SLOT_IMAGE
  | typeof MANDATORY_SLOT_DESCRIPTION
  | typeof MANDATORY_SLOT_PRICE
  | typeof OPTIONAL_SLOT_REVIEW
  | symbol;

export const MANDATORY_SLOTS: SlotName[] = [
  MANDATORY_SLOT_IMAGE,
  MANDATORY_SLOT_DESCRIPTION,
  MANDATORY_SLOT_PRICE,
];

export interface Slots {
  [slot: SlotName]: React.ReactNode;
}

export type LayoutComponent = React.FC<Slots>;
