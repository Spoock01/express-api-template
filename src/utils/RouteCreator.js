const validatePath = (path) => {
	if (typeof path !== 'string' || !path.startsWith('/'))
		throw new Error(`Invalid path found: ${path}`);
};

const validateFunction = (fn) => {
	if (typeof fn !== 'function') throw new Error('Invalid function.');
};

const validateMiddlewares = (middlewares) => {
	if (middlewares && middlewares.length === 0) return true;

	if (!middlewares) {
		throw new Error(
			'Middlewares must be an empty array or an array of functions'
		);
	}

	for (const fn of middlewares) {
		if (typeof fn !== 'function')
			throw new Error('Middlewares must be an array of functions');
	}
	return true;
};

export default (path, fn, middlewares = []) => {
	validatePath(path);
	validateFunction(fn);
	validateMiddlewares(middlewares);

	return { route: path, routeFunction: fn, middlewares };
};
