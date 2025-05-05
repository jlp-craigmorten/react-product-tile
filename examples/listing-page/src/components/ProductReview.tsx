import { ProductTile } from '../../../../src';
import StarRating from './StarRating';

interface ProductReviewProps {
  rating?: number;
}

function ProductReview({ rating }: ProductReviewProps) {
  if (typeof rating !== 'number') {
    return null;
  }

  return (
    <ProductTile.Review>
      <StarRating rating={rating} />
    </ProductTile.Review>
  );
}

export default ProductReview;
