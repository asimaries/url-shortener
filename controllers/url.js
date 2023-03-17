const shortid = require('shortid')
const { URL } = require('../models/url');

async function handleGenrateNewShortURL(req, res) {

	const body = req.body;
	if (!body.redirectURL)
		return res.render('404', { error: 'URL is requried' });
	console.log(req.user)
	const shortId = shortid();
	await URL.create({
		shortId: shortId,
		redirectURL: body.redirectURL,
		visitHistory: [],
		createdBy: req.user._id
	});
	// return res.json({ id: shortId });
	return res.render('home', { id: shortId });
}
async function handleAnalytics(req, res) {
	const shortId = req.params.shortId;
	const result = await URL.findOne({ shortId });
	return res.render('analytics', {
		data: result, one: true,
	})
}

async function handleAllAnalytics(req, res) {
	return res.render('analytics', {
		data: await URL.find({ createdBy: req.user._id })
	});
}

module.exports = {
	handleGenrateNewShortURL,
	handleAnalytics,
	handleAllAnalytics
};