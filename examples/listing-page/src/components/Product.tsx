import { ProductTile } from '../../../../src';
// import { DefaultLayout } from '../../../../src';
import styles from './Product.module.css';
import ProductDescription from './ProductDescription';
import ProductImage from './ProductImage';
import ProductPrice from './ProductPrice';
import ProductReview from './ProductReview';
import ProductTag from './ProductTag';
import { ProductTileLayout } from './ProductTileLayout';

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
      <ProductTile layout={ProductTileLayout}>
        {/* <ProductTile layout={DefaultLayout}> */}
        <ProductTile.Image>
          <ProductImage image={image} />
        </ProductTile.Image>
        <ProductTile.Description>
          <ProductDescription description={description} />
        </ProductTile.Description>
        <ProductTile.Review>
          <ProductReview rating={review} />
        </ProductTile.Review>
        <ProductTileLayout.Tag>
          <ProductTag tag={tag} />
        </ProductTileLayout.Tag>
        <ProductTile.Price>
          <ProductPrice price={price} />
        </ProductTile.Price>
      </ProductTile>
    </div>
  );
}

export default Product;
