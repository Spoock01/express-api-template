const validatePathOrThrow = (path) => {
	if (typeof path !== 'string' || !path.startsWith('/'))
		throw new Error(`Invalid path found: ${path}`);
};

const validateFnOrThrow = (fn) => {
	if (typeof fn !== 'function') throw new Error('Invalid function.');
};

const isArrayOfFunctions = (middlewares) => {
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

export default (routePath, fn, middlewares = []) => {
	validatePathOrThrow(routePath);
	validateFnOrThrow(fn);
	isArrayOfFunctions(middlewares);

	return { route: routePath, routeFunction: fn, middlewares };
};
