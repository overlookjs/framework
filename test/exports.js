/* --------------------
 * @overlook/framework module
 * Tests
 * Test function to ensure all exports present
 * ------------------*/

/* eslint-disable jest/no-export */

'use strict';

// Exports

module.exports = function itExports(Overlook) {
	describe('methods', () => {
		it.each([
			'load'
		])('%s', (key) => {
			expect(Overlook[key]).toBeFunction();
		});
	});

	describe('classes', () => {
		it.each([
			'RootRoute',
			'Route'
		])('%s', (key) => {
			expect(Overlook[key]).toBeFunction();
		});
	});

	describe('symbols', () => {
		it.each([
			'INIT_ROUTE',
			'HANDLE_ROUTE',
			'PATH_PART',
			'GET_PATH_PART',
			'REQ',
			'RES',
			'METHOD',
			'URL',
			'URL_STR',
			'URL_OBJ',
			'PATH',
			'QUERY',
			'QUERY_STR',
			'PARAMS',
			'START',
			'STOP',
			'PORT',
			'STATIC_FILE_PATH',
			'GET_STATIC_FILE_PATH',
			'STATIC_FILE_HEADERS',
			'GET_STATIC_FILE_HEADERS'
		])('%s', (key) => {
			expect(typeof Overlook[key]).toBe('symbol');
		});
	});
};
