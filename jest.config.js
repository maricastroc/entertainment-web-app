module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],

  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],

  transformIgnorePatterns: ['/node_modules/(?!(bcrypt)/)'],

  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
}
