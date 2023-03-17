const express = require('express')
const {URL} = require('../models/url')

const router = express.Router();

router.get('/', async (req, res) => {
    // if (!req.user) return res.redirect('/');
    const allurls = await URL.find({createdBy: req.body._id});
    return res.render('home', {
        urls: allurls,
        user: req.user,
    })
})

router.get('/signup', (req, res) => {
    return res.render('signup');
})

router.get('/login', (req, res) => {
    return res.render('login');
})

module.exports = {
    staticRouter : router,
};