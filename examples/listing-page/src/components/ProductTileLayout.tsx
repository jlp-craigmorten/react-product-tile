import { slotTypes, type Slots, type SlotType } from '../../../../src';
import styles from './ProductTileLayout.module.css';

const OPTIONAL_SLOT_TAG: SlotType = Symbol('ProductTileLayout.Tag');

export function ProductTileLayout(slots: Slots) {
  return (
    <article className={styles.defaultLayout}>
      <div className={styles.defaultLayoutImage}>
        {slots[slotTypes.MANDATORY_SLOT_IMAGE]}
      </div>
      <div className={styles.defaultLayoutDescription}>
        {slots[slotTypes.MANDATORY_SLOT_DESCRIPTION]}
      </div>
      {slots[OPTIONAL_SLOT_TAG] && (
        <div className={styles.defaultLayoutTag}>
          {slots[OPTIONAL_SLOT_TAG]}
        </div>
      )}
      {slots[slotTypes.OPTIONAL_SLOT_REVIEW] && (
        <div className={styles.defaultLayoutReview}>
          {slots[slotTypes.OPTIONAL_SLOT_REVIEW]}
        </div>
      )}
      <div className={styles.defaultLayoutPrice}>
        {slots[slotTypes.MANDATORY_SLOT_PRICE]}
      </div>
    </article>
  );
}

ProductTileLayout.slotTypes = {
  OPTIONAL_SLOT_TAG,
};
