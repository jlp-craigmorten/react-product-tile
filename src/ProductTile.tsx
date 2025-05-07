import type React from 'react';
import {
  type LayoutComponentProps,
  description,
  image,
  price,
  review,
} from './constants';
import { error } from './error';
import { useSlots } from './useSlots';

interface ProductTileSlotProps {
  children: React.ReactNode;
}

function ProductTileImage({ children }: ProductTileSlotProps) {
  // TODO: this could be opinionated in what they render
  return children;
}

function ProductTileDescription({ children }: ProductTileSlotProps) {
  // TODO: this could be opinionated in what they render
  return children;
}

function ProductTileReview({ children }: ProductTileSlotProps) {
  // TODO: this could be opinionated in what they render
  return children;
}

function ProductTilePrice({ children }: ProductTileSlotProps) {
  // TODO: this could be opinionated in what they render
  return children;
}

const PRODUCT_TILE_SLOTS_CONFIG = {
  [image]: ProductTileImage,
  [description]: ProductTileDescription,
  [review]: ProductTileReview,
  [price]: ProductTilePrice,
};

const MANDATORY_SLOTS = [image, description, price];

interface ProductTileProps {
  layout: React.FC<LayoutComponentProps>;
  children: React.ReactNode;
}

export function ProductTile({ layout: Layout, children }: ProductTileProps) {
  const [slots, defaults] = useSlots(children, PRODUCT_TILE_SLOTS_CONFIG);

  if (process.env.NODE_ENV === 'development') {
    const missingSlots = MANDATORY_SLOTS.filter((slot) => {
      return !slots[slot as keyof typeof PRODUCT_TILE_SLOTS_CONFIG];
    });

    if (missingSlots.length > 0) {
      console.error(
        error(
          `\`<ProductTile />\` missing mandatory, direct ${missingSlots.length > 1 ? 'children' : 'child'}: ${missingSlots.map((slot) => `\`<${slot} />\``).join(', ')}.`,
        ),
      );
    }
  }

  return <Layout slots={slots}>{defaults}</Layout>;
}

ProductTile.Image = ProductTileImage;
ProductTile.Description = ProductTileDescription;
ProductTile.Review = ProductTileReview;
ProductTile.Price = ProductTilePrice;
