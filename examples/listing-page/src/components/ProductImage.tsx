import { useState } from 'react';
import { ProductTile } from '../../../../src';
import styles from './Product.module.css';

interface ProductImageProps {
  image: string;
}

function ProductImage({ image }: ProductImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <ProductTile.Image>
      <div
        className={`${styles.imageContainer} ${imageError ? styles.imageContainerError : ''}`}
      >
        <img
          alt=""
          className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          src={image}
        />
      </div>
    </ProductTile.Image>
  );
}

export default ProductImage;
