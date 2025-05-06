import { ProductTile } from '../../../../src';
import styles from './Product.module.css';
import { ProductTileLayout } from './ProductTileLayout';

interface ProductTagProps {
  tag?: string;
}

function ProductTag({ tag }: ProductTagProps) {
  if (typeof tag !== 'string') {
    return null;
  }

  return (
    <ProductTile.Slot name={ProductTileLayout.slots.OPTIONAL_SLOT_TAG}>
      <div className={styles.tag}>{tag}</div>
    </ProductTile.Slot>
  );
}

export default ProductTag;
