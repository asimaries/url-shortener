const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
	shortId: {
		type: String,
		required: true,
		unique: true,
	},
	redirectURL: {
		type: String,
		required: true,
	},
	visitHistory: [{
		timestamp: { type: Number }
	}],
}, { timestamps: true })


urlSchema.pre('save', function (next) {
	console.log(this.redirectURL)
	this.redirectURL = this.redirectURL.trim()
	next()
})

const URL = mongoose.model('url', urlSchema)
module.exports = { URL }

