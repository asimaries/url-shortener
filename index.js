const express = require('express');
const path = require('path');

const { router } = require('./route/url');
const { connectToMongoDB } = require('./connect');
const { URL } = require('./models/url')
const app = express();
const PORT = 7777;

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener')
	.then(() => console.log('MONGO DB connected'))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
	console.log(new Date(Date.now()).toString())
	next()
})
app.use('/url', router)

app.get('/', (req, res) => {
	return res.render('home');
});


app.get('/url/:shortID', async (req, res) => {
	const shortID = req.params.shortID;
	const entry = await URL.findOneAndUpdate({
		shortId: shortID
	}, {
		$push: {
			visitHistory: { timestamp: Date.now() }
		},
	});
	// console.log(entry);
	return res.redirect(entry.redirectURL)
})
app.get('/url/analytics', async (req, res) => {
	return res.redirect(entry.redirectURL)
})

app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));