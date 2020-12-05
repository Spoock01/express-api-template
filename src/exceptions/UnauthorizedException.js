class UnauthorizedException extends Error {
	constructor(message, errors) {
		super(message);

		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);

		this.statusCode = 401;

		this.errors = errors;
	}
}

export default UnauthorizedException;
