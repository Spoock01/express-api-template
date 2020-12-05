class BadRequestException extends Error {
	constructor(message, errors) {
		super(message);

		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);

		this.statusCode = 400;

		this.errors = errors;
	}
}

export default BadRequestException;
