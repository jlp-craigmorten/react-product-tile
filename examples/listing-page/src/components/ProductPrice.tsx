import styles from './Product.module.css';

interface ProductPriceProps {
  price: string;
}

function ProductPrice({ price }: ProductPriceProps) {
  return <div className={styles.price}>{price}</div>;
}

export default ProductPrice;
