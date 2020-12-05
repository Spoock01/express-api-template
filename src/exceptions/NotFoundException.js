class NotFoundException extends Error {
	constructor(message, errors) {
		super(message);

		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);

		this.statusCode = 404;

		this.errors = errors;
	}
}

export default NotFoundException;
