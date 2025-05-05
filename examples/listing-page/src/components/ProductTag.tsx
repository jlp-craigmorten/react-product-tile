import { ProductTile } from '../../../../src';
import styles from './Product.module.css';

interface ProductTagProps {
  tag?: string;
}

function ProductTag({ tag }: ProductTagProps) {
  if (typeof tag !== 'string') {
    return null;
  }

  return (
    <ProductTile.CustomSlot type={ProductTile.DefaultLayout.Tag}>
      <div className={styles.tag}>{tag}</div>
    </ProductTile.CustomSlot>
  );
}

export default ProductTag;
