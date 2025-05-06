import { slotNames, type Slots, type SlotName } from '../../../../src';
import styles from './ProductTileLayout.module.css';

const OPTIONAL_SLOT_TAG: SlotName = Symbol('ProductTileLayout.Tag');

export function ProductTileLayout(slots: Slots) {
  return (
    <article className={styles.defaultLayout}>
      <div className={styles.defaultLayoutImage}>
        {slots[slotNames.MANDATORY_SLOT_IMAGE]}
      </div>
      <div className={styles.defaultLayoutDescription}>
        {slots[slotNames.MANDATORY_SLOT_DESCRIPTION]}
      </div>
      {slots[OPTIONAL_SLOT_TAG] && (
        <div className={styles.defaultLayoutTag}>
          {slots[OPTIONAL_SLOT_TAG]}
        </div>
      )}
      {slots[slotNames.OPTIONAL_SLOT_REVIEW] && (
        <div className={styles.defaultLayoutReview}>
          {slots[slotNames.OPTIONAL_SLOT_REVIEW]}
        </div>
      )}
      <div className={styles.defaultLayoutPrice}>
        {slots[slotNames.MANDATORY_SLOT_PRICE]}
      </div>
    </article>
  );
}

ProductTileLayout.slots = {
  OPTIONAL_SLOT_TAG,
};
