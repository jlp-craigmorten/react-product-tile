import type { Product as IProduct } from '../types';
import Product from './Product';
import styles from './ProductList.module.css';

interface ProductListProps {
  products: IProduct[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
}

export default ProductList;
