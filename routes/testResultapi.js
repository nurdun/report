
var express = require('express');
var result = require('../model/testResult')
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;

// router.get('/', function(req, res) {
//     res.header('Access-Control-Allow-Origin', '*');
//     var userId = req.params;
//     result.findOne({userId:userId}, function (err, result) {
//         console.log(result);
//         if (req.query && req.query.callback) {
//         //console.log(params.query.callback);
//             res.jsonp({status: 200,result});
//         } else {
//             res.json({status: 200,result});
//         }
//     });
// });
 
// module.exports = router;

//任务结果评估数据接口
const routes = (app) => {
    app.get('/result', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let userId = req.query.userId,taskId = req.query.taskId;
        result.find({userId:userId,taskId:taskId}, function (err, result) {
            console.log(result);
            if (req.query && req.query.callback) {
                //console.log(params.query.callback);
                res.jsonp({status: 200,result});
            } else {
                res.json({status: 200,result});
            }
        });
    });

    // 增加
    app.post('/createresult', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let newResult = [{
            userId: req.body.userId,
            taskId: req.body.taskId,
            testLeader:req.body.testLeader,
            testTime:req.body.testTime,
            testcomment:req.body.testcomment,
            testScore:req.body.testScore,
            testAttr:req.body.testAttr
        }]
        result.create(newTask, (err) => {
            if(err) return console.log(err)
            res.send("<a href='/'>添加评估结果成功，点击返回首页</a>");
        })
    })
    // 删除
    app.get('/delresult', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let userId = req.query.userId,taskId = req.query.taskId;
        result.remove({userId:userId,taskId:taskId}, (err, result) => {
            if(err) return console.log(err)
            console.log(result.result)
            res.send("<a href='/'>删除成功，点击返回首页</a>")
        })
    })
    // // 修改
    app.post('/updatetask', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        console.log(req.body)
        let userId = req.body.userId,taskId = req.body.taskId,
            condiction = {userId: userId,taskId:taskId},
            query = {$set: {
                userId: req.body.userId,
                taskId: req.body.taskId,
                testLeader:req.body.testLeader,
                testTime:req.body.testTime,
                testcomment:req.body.testcomment,
                testScore:req.body.testScore,
                testAttr:req.body.testAttr
            }}
        result.update(condiction, query, (err, result) => {
            if(err) {
                console.log(err)
                res.send('<script>alert("请选择你要修改的任务评估")</script>')
            }
            res.send("<a href='/'>修改成功，点击返回首页</a>")
        })
    })
}
module.exports = routes;