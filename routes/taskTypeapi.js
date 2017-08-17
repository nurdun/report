
var express = require('express');
var taskType = require('../model/taskType')
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;
 //用户列表接口
router.get('/', function(req, res) {
    var taskId = req.params
    res.header('Access-Control-Allow-Origin', '*');
    taskType.findOne({taskId:taskId}, function (err, taskType) {
        console.log(taskType);
        if (req.query && req.query.callback) {
        //console.log(params.query.callback);
            res.jsonp({status: 200,taskType});
        } else {
            res.json({status: 200,taskType});
        }
    });
});
 
module.exports = router;