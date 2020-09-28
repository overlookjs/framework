/* --------------------
 * @overlook/framework module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const pathJoin = require('path').join,
	Route = require('@overlook/route'),
	loadRoutes = require('@overlook/load-routes'),
	buildPlugin = require('@overlook/plugin-build'),
	loadPlugin = require('@overlook/plugin-load'),
	pathPlugin = require('@overlook/plugin-path'),
	staticPlugin = require('@overlook/plugin-static'),
	staticDirPlugin = require('@overlook/plugin-static-dir'),
	matchPlugin = require('@overlook/plugin-match'),
	httpServerPlugin = require('@overlook/plugin-serve-http'),
	{PATH} = require('@overlook/plugin-request');

const {INIT_ROUTE} = Route,
	{BUILD, PRE_BUILD, BUILD_FILE, BUILD_FILES, FS_ROOT_PATH, deleteRouteProperties} = buildPlugin,
	{
		FILES, PARENT_PATH, GET_PARENT_PATH,
		DIR_INDEX, ROUTE_EXTS,
		GET_DIR_INDEX, GET_ROUTE_EXTS, IDENTIFY_ROUTE_FILE,
		SRC_DIR_PATH
	} = loadPlugin,
	{PATH_PART, GET_PATH_PART, PARAMS, HANDLE_ROUTE, MATCH, IS_BEFORE} = pathPlugin,
	{
		STATIC_FILE, GET_STATIC_FILE,
		STATIC_FILE_HEADERS, GET_STATIC_FILE_HEADERS, RESPOND_WITH_FILE,
		GET_FILE_PATH, READ_FILE, WRITE_FILE, CREATE_VIRTUAL_PATH, FS_FILES,
		File
	} = staticPlugin,
	{PORT, REQ, RES, METHOD, URL, URL_STR, URL_OBJ, QUERY, QUERY_STR, START, STOP} = httpServerPlugin,
	{STATIC_DIR_PATH, STATIC_BUILD_PATH} = staticDirPlugin;

// Exports

const MainRoute = Route.extend(buildPlugin)
	.extend(loadPlugin)
	.extend(pathPlugin)
	.extend(staticPlugin);

const ServerRoute = MainRoute.extend(httpServerPlugin);

class RootRoute extends ServerRoute {
	[IDENTIFY_ROUTE_FILE](exts, isIndex, name) {
		if (name !== 'public' || !isIndex) return super[IDENTIFY_ROUTE_FILE](exts, isIndex, name);

		// Create static dir route for public dir
		const publicPath = pathJoin(this[SRC_DIR_PATH], 'public');

		const StaticDirRoute = Route.extend(buildPlugin)
			.extend(matchPlugin)
			.extend(staticDirPlugin);

		return new StaticDirRoute({
			[STATIC_DIR_PATH]: publicPath,
			[STATIC_BUILD_PATH]: 'public',
			[IS_BEFORE]() { return true; },
			[MATCH]() { return {exact: true}; }
		});
	}
}

async function load(path, options) {
	let {Loader} = options || {};
	if (!Loader) Loader = RootRoute;

	const router = await loadRoutes(path, {Loader});
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
