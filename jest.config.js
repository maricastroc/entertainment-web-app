module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Mantém os aliases de importação
  },
  // Novo padrão para encontrar testes dentro de src
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx)'],
  
  // Opcional: ignora pastas de build e node_modules
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/'
  ],
  
  // Configurações adicionais recomendadas
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/tests/'
  ]
};