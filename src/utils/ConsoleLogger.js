import chalk from 'chalk';

const systemInfo = (message) => {
	console.log(chalk.green(`INFO: ${message}`));
};

const systemWarn = (message) => {
	console.warn(chalk.yellow(`WARNING: ${message}`));
};

const systemError = (message) => {
	console.error(chalk.red.bold(`ERROR: ${message}`));
};

const serviceInfo = (message) => {
	console.error(chalk.black.bgWhiteBright.bold(`SERVICE INFO: ${message}`));
};

const serviceError = (message) => {
	console.error(chalk.redBright.bold(`SERVICE ERROR: ${message}`));
};

global.systemInfo = systemInfo;
global.systemWarn = systemWarn;
global.systemError = systemError;
global.serviceInfo = serviceInfo;
global.serviceError = serviceError;
