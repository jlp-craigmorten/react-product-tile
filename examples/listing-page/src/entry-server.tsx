import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import type { Product } from './types';

export function render(products: Product[]) {
  return renderToString(
    <StrictMode>
      <App products={products} />
    </StrictMode>,
  );
}
