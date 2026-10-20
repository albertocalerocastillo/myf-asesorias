// Reglas de la guía de estilos de tms.web (docs/wiki_frontend.md) que ESLint puede comprobar solo.
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'scripts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2022, globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // Guía: `any` y `var` no se permiten en ningún caso; `let` solo si no cabe `const`.
      '@typescript-eslint/no-explicit-any': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      // Guía: arrow functions siempre que sea posible.
      'prefer-arrow-callback': 'error',
      'func-style': ['error', 'expression'],
      // Guía: interfaces en vez de `type`.
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      // Guía: no dejar código muerto.
      '@typescript-eslint/no-unused-vars': 'error',
      // Guía: comentarios en la línea anterior, nunca en la misma.
      'no-inline-comments': 'error',
      'spaced-comment': ['error', 'always', { markers: ['#region', '#endregion'] }],
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],
      'comma-dangle': ['error', 'never']
    }
  },
  {
    // Solo se usa al compilar (prerenderizado), nunca con recarga en caliente.
    files: ['src/entry-server.tsx'],
    rules: { 'react-refresh/only-export-components': 'off' }
  }
);
