import Joi from 'joi';

const registerSchema = Joi.object({
	name: Joi.string().min(2).max(30).pattern(new RegExp('[A-Za-z]*')).required(),

	cpf: Joi.string()
		.min(11)
		.max(11)
		.pattern(/\d{11}/)
		.required(),

	permission: Joi.string().valid("ADMIN" ,"USER").required(),

	email: Joi.string().email().required(),
});

export { registerSchema };
