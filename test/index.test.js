/* --------------------
 * @overlook/framework module
 * Tests
 * ------------------*/

'use strict';

// Modules
const Overlook = require('@overlook/framework');

// Init
require('./support/index.js');

// Tests

describe('tests', () => {
	it.skip('all', () => { // eslint-disable-line jest/no-disabled-tests
		expect(Overlook).not.toBeUndefined();
	});
});
