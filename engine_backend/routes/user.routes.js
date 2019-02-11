module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    app.post('/userSignup', user.userSignup);
    app.post('/userLogin', user.userLogin);
}