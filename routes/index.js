var express = require('express');
var router = express.Router();
var userdata = require('../model/user')
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/* GET index listing. */
router.get('/', function(req, res, next) {
    userdata.findOne({name:"nurdun"}, function (err, user) {
        console.log(user);
        res.render('index', {title: 'Express', user: user });
    });
});

module.exports = router;
