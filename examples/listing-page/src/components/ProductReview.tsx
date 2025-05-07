import StarRating from './StarRating';

interface ProductReviewProps {
  rating?: number;
}

function ProductReview({ rating }: ProductReviewProps) {
  if (typeof rating !== 'number') {
    return null;
  }

  return <StarRating rating={rating} />;
}

export default ProductReview;
