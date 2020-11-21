import env from '../environment/Environment';
import mongoose from 'mongoose';

export const createMongoConnection = async () => {
	try {
		serviceInfo('Starting mongo connection...');
		await mongoose.connect(env.MONGO_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		serviceInfo('Mongo started');
	} catch (err) {
		throw new Error('Error starting mongo service. ' + err.message);
	}
};
