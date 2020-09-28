/* --------------------
 * @overlook/framework module
 * Entry point
 * ------------------*/

'use strict';

// Modules
// eslint-disable-next-line node/no-unsupported-features/node-builtins
const fileStat = require('fs').promises.stat,
	pathJoin = require('path').join,
	Route = require('@overlook/route'),
	loadRoutes = require('@overlook/load-routes'),
	buildPlugin = require('@overlook/plugin-build'),
	loadPlugin = require('@overlook/plugin-load'),
	pathPlugin = require('@overlook/plugin-path'),
	staticPlugin = require('@overlook/plugin-static'),
	staticDirPlugin = require('@overlook/plugin-static-dir'),
	matchPlugin = require('@overlook/plugin-match'),
	orderedPlugin = require('@overlook/plugin-ordered'),
	httpServerPlugin = require('@overlook/plugin-serve-http'),
	{PATH} = require('@overlook/plugin-request');

const {INIT_ROUTE} = Route,
	{BUILD, PRE_BUILD, BUILD_FILE, BUILD_FILES, FS_ROOT_PATH, deleteRouteProperties} = buildPlugin,
	{
		FILES, PARENT_PATH, GET_PARENT_PATH,
		DIR_INDEX, ROUTE_EXTS,
		GET_DIR_INDEX, GET_ROUTE_EXTS, IDENTIFY_ROUTE_FILE
	} = loadPlugin,
	{PATH_PART, GET_PATH_PART, PARAMS, HANDLE_ROUTE, MATCH} = pathPlugin,
	{
		STATIC_FILE, GET_STATIC_FILE,
		STATIC_FILE_HEADERS, GET_STATIC_FILE_HEADERS, RESPOND_WITH_FILE,
		GET_FILE_PATH, READ_FILE, WRITE_FILE, CREATE_VIRTUAL_PATH, FS_FILES,
		File
	} = staticPlugin,
	{PORT, REQ, RES, METHOD, URL, URL_STR, URL_OBJ, QUERY, QUERY_STR, START, STOP} = httpServerPlugin,
	{STATIC_DIR_PATH} = staticDirPlugin,
	{IS_BEFORE} = orderedPlugin;

// Exports

const MainRoute = Route.extend(buildPlugin)
	.extend(loadPlugin)
	.extend(pathPlugin)
	.extend(staticPlugin);

const RootRoute = MainRoute.extend(httpServerPlugin);

async function load(path, options) {
	let {Loader} = options || {};
	if (!Loader) Loader = RootRoute;

	// Load routes
	const router = await loadRoutes(path, {Loader});

	// Add static dir route
	if (!router.children.find(route => route.name === 'static')) {
		const staticPath = pathJoin(path, 'static');
		let stat;
		try {
			stat = await fileStat(staticPath);
		} catch (err) {} // eslint-disable-line no-empty

		if (stat && stat.isDirectory()) {
			const StaticDirRoute = Route.extend(buildPlugin)
				.extend(matchPlugin)
				.extend(staticDirPlugin)
				.extend(orderedPlugin);

			const staticRoute = new StaticDirRoute({
				[STATIC_DIR_PATH]: staticPath,
				[IS_BEFORE]() { return true; },
				[MATCH]() { return {exact: true}; }
			});

			router.attachChild(staticRoute);
		}
	}

	return router;
}

module.exports = {
	load,
	RootRoute,
	Route: MainRoute,
	File,
	deleteRouteProperties,
	INIT_ROUTE,
	BUILD,
	PRE_BUILD,
	BUILD_FILE,
	BUILD_FILES,
	FS_ROOT_PATH,
	FILES,
	PARENT_PATH,
	GET_PARENT_PATH,
	DIR_INDEX,
	ROUTE_EXTS,
	GET_DIR_INDEX,
	GET_ROUTE_EXTS,
	IDENTIFY_ROUTE_FILE,
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
	GET_STATIC_FILE_HEADERS,
	RESPOND_WITH_FILE,
	GET_FILE_PATH,
	READ_FILE,
	WRITE_FILE,
	CREATE_VIRTUAL_PATH,
	FS_FILES
};
