const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')

const { connectToMongoDB } = require('./connect');
const { URL } = require('./models/url')
const { restrictToLoggedInUserOnly } = require('./middleware/auth')

const { staticRouter } = require('./route/staticRouter');
const { router: urlRouter } = require('./route/url');
const { UserRouter } = require('./route/user');


const app = express();
const PORT = 7777;

connectToMongoDB('mongodb://127.0.0.1:27017/url-shortener')
	.then(() => console.log('MONGO DB connected'))

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(function (req, res, next) {
	console.log((new Date(Date.now()).toString()).substring(0, 25), req.path)
	next()
})

app.use('/url', restrictToLoggedInUserOnly, urlRouter)
app.use('/user', UserRouter)
app.use('/', staticRouter)

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


// app.get('/url/analytics', async (req, res) => {
// 	return res.redirect(entry.redirectURL)
// })


app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));