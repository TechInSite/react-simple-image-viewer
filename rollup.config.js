import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './src/index.ts',

  output: [
    {
      name: 'index.js',
      sourcemap: true,
      file: './dist/index.js',
      format: 'esm',
      globals: { react: 'React' },
    },
  ],

  plugins: [
    typescript(),
    postcss({ modules: true }),
  ],

  external: ['react', 'react-dom'],
};