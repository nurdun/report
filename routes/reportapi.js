
var express = require('express');
var report = require('../model/reportdata')
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;
 //用户列表接口
// router.get('/', function(req, res) {
//     res.header('Access-Control-Allow-Origin', '*');
//     var reportBelongId = req.params;
//     report.findOne({reportBelongId:reportBelongId}, function (err, report) {
//         console.log(report);
//         if (req.query && req.query.callback) {
//         //console.log(params.query.callback);
//             res.jsonp({status: 200,report});
//         } else {
//             res.json({status: 200,report});
//         }
//     });
// });
 
// module.exports = router;


//日报数据接口

//用户全部日报
const routes = (app) => {
    app.get('/reports', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let reportBelongId = req.query.reportBelongId;
        report.find({reportBelongId:reportBelongId}, function (err, report) {
            console.log(report);
            if (req.query && req.query.callback) {
                //console.log(params.query.callback);
                res.jsonp({status: 200,report});
            } else {
                res.json({status: 200,report});
            }
        });
    });
    //日报详情
    app.get('/reportdetail', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let _id = req.query.report_id;
        report.findOne({_id:_id}, function (err, report) {
            console.log(report);
            if (req.query && req.query.callback) {
            //console.log(params.query.callback);
                res.jsonp({status: 200,report});
            } else {
                res.json({status: 200,report});
            }
        });
    });
    // 增加日报
    app.post('/createreport', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let newrReport = [{
            reportBelongId: req.body.reportBelongId,
            reportDetail:{
                task_id:req.body.task_id,
                helper:req.body.helper,
                spendTime:req.body.spendTime,
                Detail:req.body.Detail,
                doc:req.body.doc,
                createTime:req.body.createTime
            },
            reportAttrType:req.body.reportAttrType
        }]
        report.create(newrReport, (err) => {
            if(err) return console.log(err)
            res.send("<a href='/'>添加日报成功，点击返回首页</a>");
        })
    })
    // 删除日报
    app.get('/delreport', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let _id = req.query.report_id;
        report.remove({_id: _id}, (err, result) => {
            if(err) return console.log(err)
            console.log(result.result)
            res.send("<a href='/'>删除成功，点击返回首页</a>")
        })
    })
    // // 修改日报
    app.post('/updatereport', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        console.log(req.body)
        let _id  = req.body.task_id,
            condiction = {_id: _id },
            query = {$set: {
                reportBelongId: req.body.reportBelongId,
                reportDetail:{
                    task_id:req.body.task_id,
                    helper:req.body.helper,
                    spendTime:req.body.spendTime,
                    Detail:req.body.Detail,
                    doc:req.body.doc,
                    createTime:req.body.createTime
                },
                reportAttrType:req.body.reportAttrType
            }}
        report.update(condiction, query, (err, result) => {
            if(err) {
                console.log(err)
                res.send('<script>alert("请选择你要修改的任务")</script>')
            }
            res.send("<a href='/'>修改成功，点击返回首页</a>")
        })
    })
}
module.exports = routes;