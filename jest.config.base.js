const {pathsToModuleNameMapper} = require('ts-jest/utils')

const colors = ['blue', 'magenta', 'cyan', 'pink', 'gray']
module.exports = ({compilerOptions: {paths}}, {name}) => ({
	preset: 'ts-jest',
	displayName: {
		name: name.split('/').pop() || name || 'no name',
		color: colors[Math.floor(Math.random() * colors.length)],
	},
	bail: true, // when running per-project
	errorOnDeprecated: true,
	globals: {
		'ts-jest': {
			diagnostics: false,
			tsConfig: "../utils-ts/tsconfig.base.json"
		}
	},
	moduleNameMapper: paths && pathsToModuleNameMapper(
		paths, {prefix: '<rootDir>/'}),
	testEnvironment: 'node',
	moduleDirectories: [
		'node_modules',
		'src'
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	setupFilesAfterEnv: [
		'jest-expect-message',
		'@strider/utils-ts/utils/testing/customMatchers.ts',
		'@strider/utils-ts/utils/testing/jest.matchers.either.ts'
	],
	testRegex: '.*.spec.ts$',
	collectCoverageFrom: [
		'src/**/*.ts'
	],

	coveragePathIgnorePatterns: [
		'src/.*/entity',
		'src/graphql/generated'
	],
	coverageDirectory: '<rootDir>/test/coverage/'
})
