
var express = require('express');
var userdata = require('../model/user')
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;
 //用户列表接口
router.get('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var name = req.params;
    userdata.findOne({name:name}, function (err, user) {
        console.log(user);
        if (req.query && req.query.callback) {
        //console.log(params.query.callback);
            res.jsonp({status: 200,user});
        } else {
            res.json({status: 200,user});
        }
    });
});
 
module.exports = router;