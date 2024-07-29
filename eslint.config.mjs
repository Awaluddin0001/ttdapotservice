import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
      '@typescript-eslint/no-explicit-any': 'off', // Mengizinkan penggunaan tipe any
      'prettier/prettier': 'error',
    },
  },
];
