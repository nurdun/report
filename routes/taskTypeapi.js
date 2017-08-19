
var express = require('express');
var taskType = require('../model/taskType')
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;

// router.get('/', function(req, res) {
//     var taskId = req.params
//     res.header('Access-Control-Allow-Origin', '*');
//     taskType.findOne({taskId:taskId}, function (err, taskType) {
//         console.log(taskType);
//         if (req.query && req.query.callback) {
//         //console.log(params.query.callback);
//             res.jsonp({status: 200,taskType});
//         } else {
//             res.json({status: 200,taskType});
//         }
//     });
// });
 
// module.exports = router;

//任务类型信息接口

//任务类型
const routes = (app) => {
    app.get('/tasktype', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let taskId = req.query.taskId;
        taskType.find({taskId:taskId}, function (err, taskType) {
            console.log(taskType);
            if (req.query && req.query.callback) {
                //console.log(params.query.callback);
                res.jsonp({status: 200,taskType});
            } else {
                res.json({status: 200,taskType});
            }
        });
    });
    // 增加任务类型信息
    app.get('/createtasktype', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let newTaskType = [{
            taskId: req.query.taskId,
            typeName: req.query.typeName,
            typeStatemen: req.query.typeStatemen
        }]
        taskType.create(newTaskType, (err) => {
            if(err) return console.log(err)
            res.send("<a href='/'>添加任务类型信息成功，点击返回首页</a>");
        })
    })
    // 删除任务类型
    app.get('/deltasktype', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let taskId = req.query.taskId;
        taskType.remove({taskId: taskId}, (err, result) => {
            if(err) return console.log(err)
            console.log(result.result)
            res.send("<a href='/'>删除成功，点击返回首页</a>")
        })
    })
    // // 修改任务类型
    app.get('/updatetasktype', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        console.log(req.body)
        let taskId = req.query.taskId,
            condiction = {taskId: taskId },
            query = {$set: {
                typeName: req.query.typeName,
                typeStatemen: req.query.typeStatemen
            }}
        taskType.update(condiction, query, (err, result) => {
            if(err) {
                console.log(err)
                res.send('<script>alert("请选择你要修改的任务")</script>')
            }
            res.send("<a href='/'>修改成功，点击返回首页</a>")
        })
    })
}
module.exports = routes;