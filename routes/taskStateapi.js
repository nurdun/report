
var express = require('express');
var taskState = require('../model/taskState')
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;
 //用户列表接口
router.get('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    var taskId = req.params;
    taskState.findOne({taskId:taskId}, function (err, taskState) {
        console.log(taskState);
        if (req.query && req.query.callback) {
        //console.log(params.query.callback);
            res.jsonp({status: 200,taskState});
        } else {
            res.json({status: 200,taskState});
        }
    });
});
 
module.exports = router;