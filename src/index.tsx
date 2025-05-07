/**
 * react-product-tile
 *
 * Proof of concept composable product tile components.
 *
 * @packageDocumentation
 */

export { ProductTile } from './ProductTile';
export { useSlots } from './useSlots';
export { DefaultLayout } from './DefaultLayout';
export type { LayoutComponentProps } from './constants';

import { description, image, price, review } from './constants';

export const slotNames = {
  image,
  description,
  price,
  review,
};
