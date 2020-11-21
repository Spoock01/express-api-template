import './utils/ConsoleLogger';
import './utils/GlobalFunctions';
import 'express-async-errors';

import cors from 'cors';
import { createMongoConnection } from './config/Mongo';
import env from './environment/Environment';
import express from 'express';
import getAllRoutes from './SyncPathLoader';
import globalErrorMiddleware from './Exceptions/ErrorMiddleware';
import helmet from 'helmet';
import morgan from 'morgan';
import successMiddleware from './utils/SuccessResponseMiddleware';

const router = express.Router();

const importSingleRoute = (verb, route) => {
	systemInfo(`Registering ${verb} ${route.path}`);
	const lowerVerb = verb.toLowerCase();
	router[lowerVerb](route.path, route.middleware, route.function);
};

const app = express();

export const runServer = async () => {
	await createMongoConnection();

	const importRoutes = () => {
		const routes = getAllRoutes();
		const keys = Object.keys(routes);
		let numberOfEndpoints = 0;

		serviceInfo('Importing endpoints automatically');
		for (const key of keys) {
			for (const route of routes[key]) {
				importSingleRoute(key, route);
				++numberOfEndpoints;
			}
		}

		serviceInfo(`${numberOfEndpoints} imported endpoints..`);
	};

	importRoutes();

	app.use(cors());
	app.use(helmet());
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.use(morgan('dev'));
	app.use(successMiddleware);
	app.use(router);
	app.use(globalErrorMiddleware);
	app.listen(env.PORT, () => serviceInfo(`Listening on port ${env.PORT}\n`));
};
