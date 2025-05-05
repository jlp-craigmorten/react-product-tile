import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <h1>react-product-tile</h1>
      <p>Proof of concept for composable product tiles</p>
    </header>
  );
}

export default Header;
