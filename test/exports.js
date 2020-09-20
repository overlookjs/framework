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
			'Route',
			'File'
		])('%s', (key) => {
			expect(Overlook[key]).toBeFunction();
		});
	});

	describe('symbols', () => {
		it.each([
			'INIT_ROUTE',
			'FILES',
			'PARENT_PATH',
			'GET_PARENT_PATH',
			'DIR_INDEX',
			'ROUTE_EXTS',
			'GET_DIR_INDEX',
			'GET_ROUTE_EXTS',
			'IDENTIFY_ROUTE_FILE',
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
			'STATIC_FILE',
			'GET_STATIC_FILE',
			'STATIC_FILE_HEADERS',
			'GET_STATIC_FILE_HEADERS',
			'RESPOND_WITH_FILE',
			'GET_FILE_PATH',
			'READ_FILE',
			'WRITE_FILE',
			'CREATE_VIRTUAL_PATH',
			'FS_FILES'
		])('%s', (key) => {
			expect(typeof Overlook[key]).toBe('symbol');
		});
	});
};
