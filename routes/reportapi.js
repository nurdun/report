
var express = require('express');
var report = require('../model/reportdata')
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;
 //用户列表接口
router.get('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    report.findOne({reportBelongId:1}, function (err, report) {
        console.log(report);
        if (req.query && req.query.callback) {
        //console.log(params.query.callback);
            res.jsonp({status: 200,report});
        } else {
            res.json({status: 200,report});
        }
    });
});
 
module.exports = router;