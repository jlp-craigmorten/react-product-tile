import cssModulesPlugin from 'esbuild-css-modules-plugin';
import { type Options, defineConfig } from 'tsup';
import { dependencies } from './package.json';

export default defineConfig((options) => {
  const commonOptions: Partial<Options> = {
    clean: true,
    entry: {
      index: 'src/index.tsx',
    },
    sourcemap: true,
    esbuildPlugins: [
      cssModulesPlugin({
        inject: false,
        localsConvention: 'camelCase',
      }),
    ],
    loader: {
      '.css': 'copy',
    },
    ...options,
  };

  return [
    // Modern ESM
    {
      ...commonOptions,
      format: ['esm'],
      outExtension: () => ({ js: '.mjs' }),
      dts: true,
      outDir: './lib/esm/',
    },
    // Support Webpack 4 by pointing `"module"` to a file with a `.js` extension
    {
      ...commonOptions,
      entry: {
        'index.legacy-esm': 'src/index.tsx',
      },
      format: ['esm'],
      outExtension: () => ({ js: '.js' }),
      target: 'es2017',
      outDir: './lib/esm/',
    },
    // Browser-ready ESM, production + minified
    {
      ...commonOptions,
      entry: {
        'index.browser': 'src/index.tsx',
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
      format: ['esm'],
      outExtension: () => ({ js: '.js' }),
      dts: true,
      minify: true,
      noExternal: Object.keys(dependencies),
      skipNodeModulesBundle: false,
      splitting: false,
      outDir: './lib/esm/',
    },
    // CJS
    {
      ...commonOptions,
      format: ['cjs'],
      outExtension: () => ({ js: '.cjs' }),
      dts: true,
      outDir: './lib/cjs/',
    },
    // CJS old extension
    {
      ...commonOptions,
      format: ['cjs'],
      outExtension: () => ({ js: '.js' }),
      outDir: './lib/cjs/',
    },
  ] as Options[];
});
