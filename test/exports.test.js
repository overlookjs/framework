/* --------------------
 * @overlook/framework module
 * Tests
 * CJS export
 * ------------------*/

'use strict';

// Modules
const Overlook = require('@overlook/framework');

// Imports
const itExports = require('./exports.js');

// Tests

describe('CJS export', () => { // eslint-disable-line jest/lowercase-name
	it('is an object', () => {
		expect(Overlook).toBeObject();
	});

	describe('has properties', () => {
		itExports(Overlook);
	});
});
