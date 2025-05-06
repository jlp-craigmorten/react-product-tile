/**
 * react-product-tile
 *
 * Proof of concept composable product tile components.
 *
 * @packageDocumentation
 */

export { ProductTile } from './ProductTile';
export { DefaultLayout } from './DefaultLayout';
export type { Slots, SlotName } from './constants';

import {
  MANDATORY_SLOT_IMAGE,
  MANDATORY_SLOT_DESCRIPTION,
  MANDATORY_SLOT_PRICE,
  OPTIONAL_SLOT_REVIEW,
} from './constants';

export const slotNames = {
  MANDATORY_SLOT_IMAGE,
  MANDATORY_SLOT_DESCRIPTION,
  MANDATORY_SLOT_PRICE,
  OPTIONAL_SLOT_REVIEW,
};
