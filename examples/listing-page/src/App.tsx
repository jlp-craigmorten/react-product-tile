import './styles.css';

import Header from './components/Header';
import ProductList from './components/ProductList';
import type { Product } from './types';
import styles from './App.module.css';

interface AppProps {
  products: Product[];
}

function App({ products }: AppProps) {
  return (
    <main className={styles.app}>
      <Header />
      <ProductList products={products} />
    </main>
  );
}

export default App;
