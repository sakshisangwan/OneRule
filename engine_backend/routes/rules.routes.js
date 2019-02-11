module.exports = (app) => {
	const rule = require('../controllers/rules.controller.js');

	app.post('/createRule', rule.createRule);
	app.post('/getRules', rule.getRules);
}