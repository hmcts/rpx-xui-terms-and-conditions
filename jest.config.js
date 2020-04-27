module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    coverageReporters: ['lcov', 'html', 'text-summary'],
    coverageDirectory: './reports/coverage',
};
