import { ProductTile } from '../../../../src';
import styles from './Product.module.css';

interface ProductPriceProps {
  price: string;
}

function ProductPrice({ price }: ProductPriceProps) {
  return (
    <ProductTile.Price>
      <div className={styles.price}>{price}</div>
    </ProductTile.Price>
  );
}

export default ProductPrice;
