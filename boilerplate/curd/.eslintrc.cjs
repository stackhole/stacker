/* eslint-disable no-undef */
module.exports = {
  ignorePatterns: ["dist/**/*"],
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};