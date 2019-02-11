const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let user = new Schema({
	id: { type: Schema.Types.ObjectId },
	userName: { type: String, unique: true },
	email: { type: String },
	password: { type: String }
});

module.exports = mongoose.model('user', user);