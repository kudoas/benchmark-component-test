// require('jest-preset-angular/ngcc-jest-processor');

module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/app/test/jest/setup-jest.ts'],
  testMatch: ['<rootDir>/src/app/test/jest/**/*.spec.ts'],
};
