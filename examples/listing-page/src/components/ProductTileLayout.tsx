import {
  type LayoutComponentProps,
  slotNames,
  useSlots,
} from '../../../../src';
import styles from './ProductTileLayout.module.css';

const tag = 'ProductTileLayout.Tag';

interface ProductTileLayoutTagProps {
  children: React.ReactNode;
}

function ProductTileLayoutTag({ children }: ProductTileLayoutTagProps) {
  return children;
}

const PRODUCT_TILE_LAYOUT_SLOTS_CONFIG = {
  [tag]: ProductTileLayoutTag,
};

export function ProductTileLayout({ children, slots }: LayoutComponentProps) {
  const [layoutSlots, defaults] = useSlots(
    children,
    PRODUCT_TILE_LAYOUT_SLOTS_CONFIG,
  );

  return (
    <article className={styles.defaultLayout}>
      <div className={styles.defaultLayoutImage}>{slots[slotNames.image]}</div>
      <div className={styles.defaultLayoutDescription}>
        {slots[slotNames.description]}
      </div>
      {layoutSlots[tag] && (
        <div className={styles.defaultLayoutTag}>{layoutSlots[tag]}</div>
      )}
      {slots[slotNames.review] && (
        <div className={styles.defaultLayoutReview}>
          {slots[slotNames.review]}
        </div>
      )}
      <div className={styles.defaultLayoutPrice}>{slots[slotNames.price]}</div>
      {defaults}
    </article>
  );
}

ProductTileLayout.Tag = ProductTileLayoutTag;
