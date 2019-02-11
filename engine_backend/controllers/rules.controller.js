const Rule = require('../models/rules.model.js');
const Campaign = require('../models/campaigns.model.js');
const Async = require('async');
var email = require('../helpers/email.js')

module.exports = {

// ------------------ To create a new rule or edit an existing rule --------------------------
	createRule : (req, res) => {
		if(!req.body.ruleName || !req.body.campaignName || !req.body.schedule || !req.body.action || !req.body.status) {
			return res.send({
				statusCode: 400,
				message: "Please send all input parameters."
			});
		}
		else if(req.body._id) {
			Rule.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true })
				.then(success => {
                    if (!success) {
                        return res.send({
                            statusCode: 404,
                            message: "ID does not exist."
                        })
                    }
                    else {
                        return res.send({
                            statusCode: 200,
                            message: "Data updated successfully.",
                            result: success
                        })
                    }
                })
                .catch(unsuccess => {
                    return res.send({
                        statusCode: 400,
                        message: "Data couldn't be updated, please try again.",
                        result: unsuccess
                    })
                })
		}
		else {
			if(req.body.symb1 == 'gte' && req.body.symb2 == 'lte'){
				req.body.symbType = 1;
			}
			else if(req.body.symb1 == 'gte' && req.body.symb2 == 'gte') {
				req.body.symbType = 2;
			}
			else if(req.body.symb1 == 'lte' && req.body.symb2 == 'lte') {
				req.body.symbType = 3;
			}
			else if(req.body.symb1 == 'lte' && req.body.symb2 == 'gte') {
				req.body.symbType = 4;
			}

			Rule.create(req.body)
				.then(success => {
					return res.send({
						statusCode: 200,
						message: "New rule added successfully.",
						result: success
					});
				})
				.catch(unsuccess => {
					return res.send({
						statusCode: 400,
						message: "Something went wrong."
					});
				})
		}
	},

// ------------------- Get all rules or a single rule based on rule ID ------------------
	getRules: (req, res) => {
		if(req.body.id) {
			Rule.find({_id: req.body.id})
			.then(success => {
				return res.send({
					statusCode: 200,
					message: "Rules fetched.",
					result: success
				});
			})
			.catch(unsuccess => {
				return res.send({
					statusCode: 400,
					message: "Something went wrong.",
					result: unsuccess
				})
			})
		}
		else {
			Rule.find()
				.then(success => {
					return res.send({
						statusCode: 200,
						message: "Rules fetched.",
						result: success
					});
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

// -------------------- Cron job that runs every 15 minutes -------------------------

var CronJob = require('cron').CronJob;
new CronJob('* 15 * * * *', function() {
	
	Rule.find({ status:"activated" }) 
		.then(success => {
			Async.forEachLimit(success, 1, (element, next) => {
				let cond1 = element.cond1;
				let val1 = element.val1;
				var query1 = {};
				let cond2 = element.cond2;;
				let val2 = element.val2;
				var query2 = {};
				let campaignName = element.campaignName;
				let symbType = element.symbType;
				let ruleName = element.ruleName;
				if(symbType == 1) {
					query1[cond1] = {$gte: val1};
					query2[cond2] = {$lte: val2};
					Campaign.find({ $and: [query1, query2, {campaignName: campaignName}]})
					.then(result => {
						Async.forEachLimit(result, 1, (i, next) => {
							email.conditionMail('email address', campaignName, ruleName);
						})
					})
					.catch(err => {
						console.log("err..........",err);
					})
				}
				else if(symbType == 2) {
					query1[cond1] = {$gte: val1};
					query2[cond2] = {$gte: val2};
					Campaign.find({ $and: [query1, query2, {campaignName: campaignName}]})
					.then(result => {
						Async.forEachLimit(result, 1, (i, next) => {
							email.conditionMail('email address', campaignName, ruleName);
						})
					})
					.catch(err => {
						console.log("err..........",err);
					})
				}
				else if(symbType == 3) {
					query1[cond1] = {$lte: val1};
					query2[cond2] = {$lte: val2};
					Campaign.find({ $and: [query1, query2, {campaignName: campaignName}]})
					.then(result => {
						Async.forEachLimit(result, 1, (i, next) => {
							email.conditionMail('email address', campaignName, ruleName);
						})
					})
					.catch(err => {
						console.log("err..........",err);
					})
				}
				else if(symbType == 4) {
					query1[cond1] = {$lte: val1};
					query2[cond2] = {$gte: val2};
					Campaign.find({ $and: [query1, query2, {campaignName: campaignName}]})
					.then(result => {
						Async.forEachLimit(result, 1, (i, next) => {
							email.conditionMail('email address', campaignName, ruleName);
						})
					})
					.catch(err => {
						console.log("err..........",err);
					})
				}
				
			})
		})
		.catch(unsuccess=> {
			console.log(unsuccess);
		})
}, null, true, 'America/Los_Angeles');

