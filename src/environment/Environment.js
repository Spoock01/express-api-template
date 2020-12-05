import dotenv from 'dotenv';
import path from 'path';

const loadEnvironments = function loadEnviromentVariables() {
	if (process.env.NODE_ENV === 'dev') {
		return path.join(__dirname, `.env.dev`);
	}

	return process.env;
};

const env = dotenv.config({ path: loadEnvironments() }).parsed;

export default env;
