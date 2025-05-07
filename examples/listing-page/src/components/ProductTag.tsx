import styles from './Product.module.css';

interface ProductTagProps {
  tag?: string;
}

function ProductTag({ tag }: ProductTagProps) {
  if (typeof tag !== 'string') {
    return null;
  }

  return <div className={styles.tag}>{tag}</div>;
}

export default ProductTag;
