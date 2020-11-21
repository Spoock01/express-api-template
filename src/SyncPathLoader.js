const fs = require('fs');
const path = require('path');
const { allowedVerbs, apiBasePath } = require('./config/ServerConfiguration');

const walkSync = (dir, callback) => {
	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		var filepath = path.join(dir, file);
		const stats = fs.statSync(filepath);

		if (stats.isDirectory()) {
			walkSync(filepath, callback);
		} else if (stats.isFile()) {
			callback(filepath, stats);
		}
	});
};

const createArrayOfAllowedVerbs = () => {
	const result = {};

	for (const allowedVerb of allowedVerbs) {
		result[allowedVerb] = [];
	}

	return result;
};

const validateDefaultImport = (defaultImport) => {
	if (typeof defaultImport !== 'object') return false;

	const keys = Object.keys(defaultImport);

	for (const allowedVerb of allowedVerbs) {
		if (keys.includes(allowedVerb)) {
			return true;
		}
	}

	return false;
};

const getValidBasePath = (basePath) => {
	if (basePath && basePath.length > 2 && basePath.startsWith('/')) {
		return basePath;
	}
	return '';
};

const addBasePath = (basePath, routePath) => {
	return path.join(basePath, routePath);
};

const addApiBasePath = (path) => {
	return addBasePath(apiBasePath, path).replace(/\\/g, '/');
};

const extractRoutes = (defaultImport) => {
	const routes = createArrayOfAllowedVerbs();
	const basePath = getValidBasePath(defaultImport.BASE_PATH);
	const middleware = defaultImport.MIDDLEWARE ?? [];

	for (const allowedVerb of allowedVerbs) {
		const route = defaultImport[allowedVerb];
		if (route !== undefined && route.length > 0) {
			for (const singleRoute of route) {
				const finalRoute = addApiBasePath(
					addBasePath(basePath, singleRoute.route)
				);

				const routeFunction = singleRoute.routeFunction;
				const middlewares = [...middleware, singleRoute.middlewares];

				routes[allowedVerb].push({
					path: finalRoute,
					function: routeFunction,
					middleware: middlewares,
				});
			}
		}
	}

	return routes;
};

const validateAndExtractRoute = (defaultImport) => {
	if (validateDefaultImport(defaultImport)) {
		return extractRoutes(defaultImport);
	}
};

const getAllRoutes = () => {
	const routes = createArrayOfAllowedVerbs();

	walkSync(path.join(__dirname, '/controllers'), (filepath) => {
		try {
			const extractedRoutes = validateAndExtractRoute(
				require(filepath)['default']
			);

			if (extractedRoutes !== undefined) {
				const keys = Object.keys(extractedRoutes);

				for (const key of keys) {
					routes[key] = [...routes[key], ...extractedRoutes[key]];
				}
			}
		} catch (error) {
			throw new Error(`Error importing ${filepath}: ${error.message}`);
		}
	});

	return routes;
};

export default getAllRoutes;
