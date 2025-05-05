import styles from './StarRating.module.css';

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className={styles.reviewContainer}>
      {Array.from({ length: 5 }, (_, index) => {
        const starPosition = index + 1;
        const isFilled = starPosition <= rating;

        return (
          <span
            key={starPosition}
            className={isFilled ? styles.star : styles.emptyStar}
          >
            {isFilled ? '★' : '☆'}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
