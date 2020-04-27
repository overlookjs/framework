/* --------------------
 * @overlook/framework module
 * Jest config
 * ------------------*/

'use strict';

// Exports

module.exports = {
	testEnvironment: 'node',
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['index.js', 'lib/**/*.js'],
	setupFilesAfterEnv: ['jest-extended'],
	moduleNameMapper: {
		'^@overlook/framework$': '<rootDir>/index.js'
	}
};
