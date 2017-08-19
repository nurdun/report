
var express = require('express');
var taskState = require('../model/taskState')
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;

// router.get('/', function(req, res) {
//     res.header('Access-Control-Allow-Origin', '*');
//     var taskId = req.params;
//     taskState.findOne({taskId:taskId}, function (err, taskState) {
//         console.log(taskState);
//         if (req.query && req.query.callback) {
//         //console.log(params.query.callback);
//             res.jsonp({status: 200,taskState});
//         } else {
//             res.json({status: 200,taskState});
//         }
//     });
// });
 
// module.exports = router;


//任务状态信息接口

// 获取某个任务的状态信息
const routes = (app) => {
    app.get('/taskstate', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let taskId = req.query.taskId;
        taskState.find({taskId:taskId}, function (err, taskState) {
            console.log(taskState);
            if (req.query && req.query.callback) {
                //console.log(params.query.callback);
                res.jsonp({status: 200,taskState});
            } else {
                res.json({status: 200,taskState});
            }
        });
    });
    // 增加任务状态信息
    app.get('/createstate', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let newrState = [{
            taskId: req.query.taskId,
            stateName: req.query.stateName,
            statement: req.query.statement
        }]
        taskState.create(newrState, (err) => {
            if(err) return console.log(err)
            res.send("<a href='/'>添加日报成功，点击返回首页</a>");
        })
    })
    // 删除任务状态信息
    app.get('/delstate', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let taskId = req.query.taskId;
        taskState.remove({taskId: taskId}, (err, result) => {
            if(err) return console.log(err)
            console.log(result.result)
            res.send("<a href='/'>删除成功，点击返回首页</a>")
        })
    })
    // // 修改任务状态信息
    app.get('/updatestate', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        console.log(req.body)
        let taskId = req.query.taskId,
            condiction = {taskId: taskId },
            query = {$set: {
                stateName: req.query.stateName,
                statement: req.query.statement
            }}
        taskState.update(condiction, query, (err, result) => {
            if(err) {
                console.log(err)
                res.send('<script>alert("请选择你要修改的任务")</script>')
            }
            res.send("<a href='/'>修改成功，点击返回首页</a>")
        })
    })
}
module.exports = routes;