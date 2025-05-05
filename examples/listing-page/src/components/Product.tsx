import { ProductTile } from '../../../../src';
import styles from './Product.module.css';
import ProductImage from './ProductImage';
import ProductDescription from './ProductDescription';
import ProductReview from './ProductReview';
import ProductTag from './ProductTag';
import ProductPrice from './ProductPrice';

interface ProductProps {
  image: string;
  description: string;
  review?: number;
  tag?: string;
  price: string;
}

function Product({ image, description, review, tag, price }: ProductProps) {
  return (
    <div className={styles.productTile}>
      <ProductTile layout={ProductTile.DefaultLayout}>
        <ProductImage image={image} alt={description} />
        <ProductDescription description={description} />
        <ProductReview rating={review} />
        <ProductTag tag={tag} />
        <ProductPrice price={price} />
      </ProductTile>
    </div>
  );
}

export default Product;
