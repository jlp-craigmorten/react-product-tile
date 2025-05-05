import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import type { Product } from './types';

// biome-ignore lint/suspicious/noExplicitAny: Lazy typing ;)
const products: Product[] = JSON.parse((window as any).__PRODUCTS__) || [];

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <App products={products} />
  </StrictMode>,
);
