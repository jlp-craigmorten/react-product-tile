import styles from './DefaultLayout.module.css';
import {
  type LayoutComponentProps,
  description,
  image,
  price,
  review,
} from './constants';

export function DefaultLayout({ slots }: LayoutComponentProps) {
  return (
    <article className={styles.defaultLayout}>
      <div className={styles.defaultLayoutImage}>{slots[image]}</div>
      <div className={styles.defaultLayoutDescription}>
        {slots[description]}
      </div>
      {slots[review] && (
        <div className={styles.defaultLayoutReview}>{slots[review]}</div>
      )}
      <div className={styles.defaultLayoutPrice}>{slots[price]}</div>
    </article>
  );
}
