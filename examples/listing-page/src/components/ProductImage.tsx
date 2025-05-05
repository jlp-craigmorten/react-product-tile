import { ProductTile } from '../../../../src';
import styles from './Product.module.css';

interface ProductImageProps {
  image: string;
  alt: string;
}

function ProductImage({ image, alt }: ProductImageProps) {
  return (
    <ProductTile.Image>
      <div className={styles.imageContainer}>
        <img className={styles.image} alt={alt} src={image} />
      </div>
    </ProductTile.Image>
  );
}

export default ProductImage;
