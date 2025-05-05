import {
  MANDATORY_SLOT_DESCRIPTION,
  MANDATORY_SLOT_IMAGE,
  MANDATORY_SLOT_PRICE,
  OPTIONAL_SLOT_REVIEW,
  type Slots,
} from './constants';
import styles from './DefaultLayout.module.css';

export function DefaultLayout(slots: Slots) {
  return (
    <article className={styles.defaultLayout}>
      <div className={styles.defaultLayoutImage}>
        {slots[MANDATORY_SLOT_IMAGE]}
      </div>
      <div className={styles.defaultLayoutDescription}>
        {slots[MANDATORY_SLOT_DESCRIPTION]}
      </div>
      {slots[OPTIONAL_SLOT_REVIEW] && (
        <div className={styles.defaultLayoutReview}>
          {slots[OPTIONAL_SLOT_REVIEW]}
        </div>
      )}
      <div className={styles.defaultLayoutPrice}>
        {slots[MANDATORY_SLOT_PRICE]}
      </div>
    </article>
  );
}
