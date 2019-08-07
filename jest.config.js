module.exports = {
    roots: [
        '<rootDir>/src'
    ],
    moduleFileExtensions: [
        'js',
        'ts'
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
}