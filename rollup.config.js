// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import uglify from 'rollup-plugin-uglify';

export default {
    entry: 'src/main.js',
    dest: 'dist/gif-search.min.js',
    format: 'cjs',
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            customResovleOptions: {
                moduleDirectory: 'node_modules',
            },
        }),
        commonjs(),
        json(),
        eslint(),
        babel({
            exclude: [
                'node_modules/**',
                '*.json',
            ],
        }),
        uglify(),
    ],
    external: ['request'],
};