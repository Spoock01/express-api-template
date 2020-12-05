import env from '../environment/Environment';
import moment from 'moment';

const globalErrorMiddleware = (error, req, res, next) => {
	let method = req.method;
	let path = req.route.path;

	const statusCode = error.statusCode ?? 500;
	const message = statusCode === 500 ? 'Internal Server Error' : error.message;
	const errors = error.errors;

	if (statusCode === 500) {
		console.error(error);
	}

	return res.status(statusCode).json({
		timestamp: moment().format(env.ERROR_TIMESTAMP_FORMAT),
		statusCode,
		method,
		path,
		message,
		errors,
	});
};

export default globalErrorMiddleware;
