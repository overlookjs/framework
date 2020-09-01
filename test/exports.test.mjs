/* --------------------
 * @overlook/framework module
 * Tests
 * ESM export
 * ------------------*/

// Modules
import Overlook, * as namedExports from '@overlook/framework/es';

// Imports
import itExports from './exports.js';

// Tests

describe('ESM export', () => {
	it('default export is an object', () => {
		expect(Overlook).toBeObject();
	});

	describe('default export has properties', () => {
		itExports(Overlook);
	});

	describe('named exports', () => {
		itExports(namedExports);
	});
});
