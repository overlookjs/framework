/* --------------------
 * @overlook/framework module
 * ESM entry point
 * ------------------*/

// Exports

import Overlook from '../lib/index.js';

export default Overlook;
export const {
	load,
	RootRoute,
	Route,
	File,
	INIT_ROUTE,
	HANDLE_ROUTE,
	PATH_PART,
	GET_PATH_PART,
	REQ,
	RES,
	METHOD,
	URL,
	URL_STR,
	URL_OBJ,
	PATH,
	QUERY,
	QUERY_STR,
	PARAMS,
	START,
	STOP,
	PORT,
	STATIC_FILE,
	GET_STATIC_FILE,
	STATIC_FILE_HEADERS,
	GET_STATIC_FILE_HEADERS
} = Overlook;
