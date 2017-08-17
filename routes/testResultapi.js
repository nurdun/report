
var express = require('express');
var result = require('../model/testResult')
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;
 //用户列表接口
router.get('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var userId = req.params;
    result.findOne({userId:userId}, function (err, result) {
        console.log(result);
        if (req.query && req.query.callback) {
        //console.log(params.query.callback);
            res.jsonp({status: 200,result});
        } else {
            res.json({status: 200,result});
        }
    });
});
 
module.exports = router;