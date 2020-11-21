import {
	BadRequestException,
	ForbiddenException,
	NotFoundException,
	ServiceUnavailable,
	UnauthorizedException,
} from '../exceptions';

import createRoute from '../utils/RouteCreator';

const getExample = async (request, response, next) => {
	response.ok('This is a get example');
};
const postExample = async (request, response, next) => {
	response.ok('This is a post example');
};
const putExample = async (request, response, next) => {
	response.ok('This is a put example');
};
const deleteExample = async (request, response, next) => {
	response.ok('This is a delete example');
};

export default {
	BASE_PATH: '/',
	MIDDLEWARE: [],
	POST: [createRoute('/', postExample)],
	GET: [createRoute('/', getExample)],
	PUT: [createRoute('/', putExample)],
	DELETE: [createRoute('/', deleteExample)],
};
