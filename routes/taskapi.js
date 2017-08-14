
var express = require('express');
var task = require('../model/taskdata')
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;
 //用户列表接口
router.get('/', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    task.findOne({_id:'5991667d776a6f27f4ba579c'}, function (err, task) {
        console.log(task);
        if (req.query && req.query.callback) {
        //console.log(params.query.callback);
            res.jsonp({status: 200,task});
        } else {
            res.json({status: 200,task});
        }
    });
});
 
module.exports = router;