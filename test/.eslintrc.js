/* --------------------
 * @overlook/framework module
 * Tests ESLint config
 * ------------------*/

'use strict';

// Exports

module.exports = {
	extends: [
		'@overlookmotel/eslint-config-jest'
	],
	rules: {
		'import/no-unresolved': ['error', {ignore: ['^@overlook/framework(/|$)']}],
		'node/no-missing-require': ['error', {allowModules: ['@overlook/framework']}],
		'node/no-missing-import': ['error', {allowModules: ['@overlook/framework']}]
	},
	overrides: [{
		files: ['*.mjs'],
		parserOptions: {
			sourceType: 'module'
		},
		rules: {
			'node/no-unsupported-features/es-syntax': ['error', {ignores: ['modules']}]
		}
	}]
};
