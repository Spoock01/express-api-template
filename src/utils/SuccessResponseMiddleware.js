const ok = (res, content = undefined) => {
	res.status(200).json({
		statusCode: 200,
		content,
	});
};

const created = (res, content = undefined) => {
	res.status(201).json({
		statusCode: 201,
		content,
	});
};

const noContent = (res) => {
	res.status(204).json({
		statusCode: 204,
	});
};

const responseMiddleware = (req, res, next) => {
	res.ok = (message, content) => {
		ok(res, message, content);
	};
	res.created = (content) => {
		created(res, content);
	};
	res.noContent = () => {
		noContent(res);
	};
	next();
};

export default responseMiddleware;
