import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default [
  {
    input: 'dist/index.js',
    output: {
      file: 'dist/bundles/hexagine.umd.js',
      format: 'umd',
      name: 'hexagine',
      sourcemap: true
    },
    plugins: [
      resolve({ jsnext: true }),
      commonjs(),
      sourcemaps()
    ]
  },
  {
    input: 'dist/index.js',
    output: {
      file: 'dist/module/hexagine.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      resolve({ jsnext: true }),
      commonjs(),
      sourcemaps()
    ]
  }
]

