import { ProductTile } from '../../../../src';
import styles from './Product.module.css';

interface ProductDescriptionProps {
  description: string;
}

function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <ProductTile.Description>
      <div className={styles.description}>{description}</div>
    </ProductTile.Description>
  );
}

export default ProductDescription;
