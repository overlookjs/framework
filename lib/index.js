/* --------------------
 * @overlook/framework module
 * Entry point
 * ------------------*/

'use strict';

// Modules
const Route = require('@overlook/route'),
	loadRoutes = require('@overlook/load-routes'),
	loadPlugin = require('@overlook/plugin-load'),
	{HANDLE_ROUTE} = require('@overlook/plugin-match'),
	pathPlugin = require('@overlook/plugin-path'),
	staticPlugin = require('@overlook/plugin-static'),
	httpServerPlugin = require('@overlook/plugin-serve-http'),
	{PATH} = require('@overlook/plugin-request'),
	startPlugin = require('@overlook/plugin-start');

const {INIT_ROUTE} = Route,
	{PATH_PART, GET_PATH_PART, PARAMS} = pathPlugin,
	{
		STATIC_FILE_PATH, GET_STATIC_FILE_PATH,
		STATIC_FILE_HEADERS, GET_STATIC_FILE_HEADERS
	} = staticPlugin,
	{START, STOP} = startPlugin,
	{PORT, REQ, RES, METHOD, URL, URL_STR, URL_OBJ, QUERY, QUERY_STR} = httpServerPlugin;

// Exports

const MainRoute = Route.extend(loadPlugin)
	.extend(pathPlugin)
	.extend(staticPlugin);

const RootRoute = MainRoute.extend(httpServerPlugin);

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
	STATIC_FILE_PATH,
	GET_STATIC_FILE_PATH,
	STATIC_FILE_HEADERS,
	GET_STATIC_FILE_HEADERS
};
