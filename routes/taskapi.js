
var express = require('express');
var task = require('../model/taskdata')
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;

// router.get('/', function(req, res) {
//     res.header('Access-Control-Allow-Origin', '*');
//     task.findOne({_id:'5991667d776a6f27f4ba579c'}, function (err, task) {
//         console.log(task);
//         if (req.query && req.query.callback) {
//         //console.log(params.query.callback);
//             res.jsonp({status: 200,task});
//         } else {
//             res.json({status: 200,task});
//         }
//     });
// });
 
// module.exports = router;
 //任务列表接口
 //全部任务接口
const routes = (app) => {
    app.get('/tasks', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        task.find({}, function (err, task) {
            console.log(task);
            if (req.query && req.query.callback) {
                //console.log(params.query.callback);
                res.jsonp({status: 200,task});
            } else {
                res.json({status: 200,task});
            }
        });
    });
    //任务详情接口
    app.get('/taskdetail', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let _id = req.query.task_id;
        task.findOne({_id:_id}, function (err, task) {
            console.log(task);
            if (req.query && req.query.callback) {
            //console.log(params.query.callback);
                res.jsonp({status: 200,task});
            } else {
                res.json({status: 200,task});
            }
        });
    });
    // 增加任务
    // app.get('/createtask', (req, res, next) => {
    //     res.render('create', {})
    // })
    app.post('/createtask', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let newTask = [{
            taskName: req.body.taskName,
            taskDetail: req.body.taskDetail,
            taskTime:{
                timeId:req.body.timeId,
                createTime:req.body.createTime,
                createPerson:req.body.createPerson,
                lastUpdateTime:req.body.lastUpdateTime,
                updatePerson:req.body.updatePerson,
            },
            taskTypeId:req.body.taskTypeId,
            parentTaskId:req.body.parentTaskId,
            taskStateId:req.body.taskStateId,
            taskleader:req.body.taskleader,
            taskJoiner:req.body.taskJoiner,
            taskTarget:{
                targetTitle:req.body.targetTitle,
                targetDetail:req.body.targetDetail,
            },
            taskResultTest:{
                testPoint:req.body.testPoint,
                testTemplate:req.body.testTemplate, 
                testPlanTime:req.body.testPlanTime,
            }

        }]
        task.create(newTask, (err) => {
            if(err) return console.log(err)
            res.send("<a href='/'>添加任务成功，点击返回首页</a>");
        })
    })
    // 删除任务
    app.get('/deltask', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let _id = req.query.task_id;
        task.remove({_id: _id}, (err, result) => {
            if(err) return console.log(err)
            console.log(result.result)
            res.send("<a href='/'>删除成功，点击返回首页</a>")
        })
    })
    // // 修改任务
    app.post('/updatetask', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        console.log(req.body)
        let _id  = req.body.task_id,
            condiction = {_id: _id },
            query = {$set: {
                taskName: req.body.taskName,
                taskDetail: req.body.taskDetail,
                taskTime:{
                    timeId:req.body.timeId,
                    createTime:req.body.createTime,
                    createPerson:req.body.createPerson,
                    lastUpdateTime:req.body.lastUpdateTime,
                    updatePerson:req.body.updatePerson,
                },
                taskTypeId:req.body.taskTypeId,
                parentTaskId:req.body.parentTaskId,
                taskStateId:req.body.taskStateId,
                taskleader:req.body.taskleader,
                taskJoiner:req.body.taskJoiner,
                taskTarget:{
                    targetTitle:req.body.targetTitle,
                    targetDetail:req.body.targetDetail,
                },
                taskResultTest:{
                    testPoint:req.body.testPoint,
                    testTemplate:req.body.testTemplate, 
                    testPlanTime:req.body.testPlanTime,
                }
    
            }}
        task.update(condiction, query, (err, result) => {
            if(err) {
                console.log(err)
                res.send('<script>alert("请选择你要修改的任务")</script>')
            }
            res.send("<a href='/'>修改成功，点击返回首页</a>")
        })
    })
}
module.exports = routes;