const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let campaign = new Schema({
	id: { type: Schema.Types.ObjectId },
	campaignName: { type: String },
	spend: { type: Number },
	impression: { type: Number }
});

module.exports = mongoose.model('campaigns', campaign);