import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var userSchema = new Schema({
	name: { type: String, required: true },
	cpf: { type: String, required: true, unique: true },
	email: { type: String, default: null },
	permission: { type: String, required: true },
	profilePhoto: { type: String, default: null },
	refreshToken: { type: String, default: null },
	phoneNumber: { type: String, default: null },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('User', userSchema);
