// Harness deliberately matches cfg-core-browser's (jest + @swc/jest + jsdom + @testing-library)
// rather than cfg-threejs's node-env jest, so the atoms/molecules arriving from
// cfg-core-browser#125 bring their existing tests across unchanged.
// `.cjs` because package.json sets "type": "module".
module.exports = {
  testEnvironment: 'jsdom',
  // Tests sit outside `rootDir: src` (tsconfig) so nothing leaks into `dist`.
  roots: ['<rootDir>/tests'],
  testMatch: ['<rootDir>/tests/**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    // Source imports carry the ESM-required `.js` suffix; resolve those to the `.tsx`/`.ts` source.
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      '@swc/jest',
      {
        jsc: {
          parser: { syntax: 'typescript', tsx: true },
          transform: { react: { runtime: 'automatic' } },
          target: 'es2022',
        },
        module: { type: 'commonjs' },
      },
    ],
  },
}
