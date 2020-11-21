import {
	BadRequestException,
	ForbiddenException,
	NotFoundException,
	ServiceUnavailableException,
	UnauthorizedException,
	UnprocessableEntityException,
} from '../exceptions';

import createRoute from '../utils/RouteCreator';

const badRequestExample = async (request, response, next) => {
	throw new BadRequestException('BadRequestExceptionMessage');
};
const forbiddenExample = async (request, response, next) => {
	throw new ForbiddenException('ForbiddenExceptionMessage');
};
const notFoundExample = async (request, response, next) => {
	throw new NotFoundException('NotFoundExceptionMessage');
};
const unauthtorizedtExample = async (request, response, next) => {
	throw new UnprocessableEntityException('ServiceUnavailableExceptionMessage', [
		{ err: 'error' },
		{ err: 'error2' },
	]);
};
const serviceUnavailableExample = async (request, response, next) => {
	throw new UnauthorizedException('UnauthorizedExceptionMessage');
};

export default {
	BASE_PATH: '/exception',
	MIDDLEWARE: [],
	GET: [
		createRoute('/bad-request', badRequestExample),
		createRoute('/forbidden', forbiddenExample),
		createRoute('/not-found', notFoundExample),
		createRoute('/unauthorized', unauthtorizedtExample),
		createRoute('/service-unavailable', serviceUnavailableExample),
	],
};
