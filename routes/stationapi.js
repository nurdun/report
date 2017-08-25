
var express = require('express');
var station = require('../model/station')
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

//岗位数据接口
const routes = (app) => {
    app.get('/stations', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        station.find({}, function (err, result) {
            console.log(result);
            if (req.query && req.query.callback) {
                //console.log(params.query.callback);
                res.jsonp({status: 200,result});
            } else {
                res.json({status: 200,result});
            }
        });
    });

    app.get('/stationdetail', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let _id = req.query.station_id;
        station.find({_id:_id}, function (err, result) {
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
    app.post('/createstation', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let newStation = [{
            stationName: req.body.stationName,
            dept: req.body.dept,
            stationRank:req.body.stationRank,
            leader: req.body.leader,
            aboutstation: req.body.aboutstation,
            workdetail: req.body.workdetail,
            stationclaim: req.body.stationclaim,
            education: req.body.education,
            skill: req.body.skill,
            workspace: req.body.workspace,
            worktimefeature:req.body.worktimefeature
        }]
        station.create(newTask, (err) => {
            if(err) return console.log(err)
            res.send("<a href='/'>添加评估结果成功，点击返回首页</a>");
        })
    })
    // 删除
    app.get('/delstation', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let _id = req.query.station_id;
        station.remove({_id:_id}, (err, result) => {
            if(err) return console.log(err)
            console.log(result.result)
            res.send("<a href='/'>删除成功，点击返回首页</a>")
        })
    })
    // // 修改
    app.post('/updatestation', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        console.log(req.body)
        let _id = req.query.station_id,
            condiction = {_id:_id},
            query = {$set: {
                stationName: req.body.stationName,
                dept: req.body.dept,
                stationRank:req.body.stationRank,
                leader: req.body.leader,
                aboutstation: req.body.aboutstation,
                workdetail: req.body.workdetail,
                stationclaim: req.body.stationclaim,
                education: req.body.education,
                skill: req.body.skill,
                workspace: req.body.workspace,
                worktimefeature:req.body.worktimefeature
            }}
        station.update(condiction, query, (err, result) => {
            if(err) {
                console.log(err)
                res.send('<script>alert("请选择你要修改的任务评估")</script>')
            }
            res.send("<a href='/'>修改成功，点击返回首页</a>")
        })
    })
}
module.exports = routes;