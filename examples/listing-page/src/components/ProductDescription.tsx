import styles from './Product.module.css';

interface ProductDescriptionProps {
  description: string;
}

function ProductDescription({ description }: ProductDescriptionProps) {
  return <div className={styles.description}>{description}</div>;
}

export default ProductDescription;
