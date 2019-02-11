const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rule = new Schema({
	id: { type: Schema.Types.ObjectId },
	ruleName: { type: String },
	campaignName: { type : String },
	schedule: { type: String },
	cond1: { type: String },
	symb1: { type: String },
	val1: { type: Number },
	cond2: { type: String },
	symb2: { type: String },
	val2: { type: Number },
	action: { type: String },
	status: { type: String },
	symbType: { type: Number }
});

module.exports = mongoose.model('rule', rule);