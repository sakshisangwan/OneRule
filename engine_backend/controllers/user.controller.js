const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');

module.exports = {

// ------------------------ Sign up for Campaign Manager ---------------------------------
	userSignup: (req, res) => {
        if (!req.body.userName || !req.body.email || !req.body.password) {
            return res.send({
                statusCode: 400,
                message: "Please send all input parameters."
            });
        }
        else {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return res.send({
                        statusCode: 400,
                        message: "Something went wrong"
                    });
                }
                else {
                    req.body.password = hash
                    req.body.email.toLowerCase()
                    User.create(req.body)
                        .then(success => {
                            return res.send({
                                statusCode: 200,
                                message: "User signup successful.",
                                result: success
                            });
                        })
                        .catch(unsuccess => {
                            if (unsuccess.code == 11000) {
                                return res.send({
                                    statusCode: 500,
                                    message: "Username already exists."
                                });
                            }
                            else {
                                return res.send({
                                    statusCode: 400,
                                    message: "Signup unsuccessful, please try again."
                                });
                            }
                        })
                }
            })
        }
    },

// -------------------------- Login for Campaign Manager ----------------------------
	userLogin: (req, res) => {
		if(!req.body.userName || !req.body.password) {
			return res.send({
				statusCode: 400,
				message: "Please send all input parameters."
			});
		}
		else {
			User.findOne({ userName: req.body.userName })
				.then(success => {
					if(success) {
						bcrypt.compare(req.body.password, success.password, function(error, resp) {
							if(error) {
								return res.send({
									statusCode: 400,
									message: "Something went wrong.",
									result: error
								});
							}
							else {
								if(resp == true || resp == 'true') {
									return res.send({
										statusCode: 200,
										message: "Login successful.",
										result: success
									});
								}
								else {
									return res.send({
										statusCode: 400,
										message: "Incorrect password."
									});
								}
							}
						})
					}
					else {
						return res.send({
							statusCode: 404,
							message: "Sorry, you are not registered with us."
						});
					}
				})
				.catch(unsuccess => {
					return res.send({
						statusCode: 400,
						message: "Something went wrong.",
						result: unsuccess
					})
				})
		}
	}
}

