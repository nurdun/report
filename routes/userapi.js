
var express = require('express');
var userdata = require('../model/user')
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;
 //用户列表接口
// router.get('/', function(req, res) {
//     res.header('Access-Control-Allow-Origin', '*');
//     var name = req.params;
//     userdata.findOne({name:name}, function (err, user) {
//         console.log(user);
//         if (req.query && req.query.callback) {
//         //console.log(params.query.callback);
//             res.jsonp({status: 200,user});
//         } else {
//             res.json({status: 200,user});
//         }
//     });
// });

const routes = (app) => {
    app.get('/users', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        userdata.find({}, function (err, user) {
            console.log(user);
            if (req.query && req.query.callback) {
                //console.log(params.query.callback);
                res.jsonp({status: 200,user});
            } else {
                res.json({status: 200,user});
            }
        });
    });

    app.get('/login', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        let name = req.query.name,paw = req.query.paw;
        userdata.findOne({name:name,paw:paw}, function (err, user) {
            if(err) return console.log(err)
            console.log(user);
            if (req.query && req.query.callback) {
            //console.log(params.query.callback);
                res.jsonp({status: 200,user});
            } else {
                res.json({status: 200,user});
            }
        });
    });
    // 增加用户信息
    // app.get('/create', (req, res, next) => {
    //     res.render('create', {})
    // })
    app.post('/createuser', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let newUser = [{
            name: req.body.name,
            paw: req.body.paw,
            station:req.body.station,
            meta:req.body.meta
        }]
        userdata.create(newUser, (err) => {
            if(err) return console.log(err)
            res.send("<a href='/'>添加用户成功，点击返回首页</a>");
        })
    })
    // 删除用户信息
    // app.get('/del', (req, res, next) => {
    //     let response = res
    //     userdata.find({}, (err, result, res) => {
    //         if(err) return console.log(err)
    //         response.render('del', { result })
    //     })
    // })
    app.get('/deluser', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        let _id = req.params
        userdata.remove({_id: _id}, (err, result) => {
            if(err) return console.log(err)
            console.log(result.result)
            res.send("<a href='/'>删除成功，点击返回首页</a>")
        })
    })
    // 修改用户信息
    // app.get('/update', (req, res, next) => {
    //     let response = res
    //     userdata.find({}, (err, result, res) => {
    //         if(err) return console.log(err)
    //         response.render('update', { result })
    //     })
    // })
    app.post('/updateuser', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        console.log(req.body)
        let _id  = req.body.user_id,
            condiction = {_id: _id},
            query = {$set: {
                name: req.body.name,
                paw: req.body.paw,
                station:req.body.station,
                meta:req.body.meta
            }}
        userdata.update(condiction, query, (err, result) => {
            if(err) {
                console.log(err)
                res.send('<script>alert("请勾选待修改的用户")</script>')
            }
            res.send("<a href='/'>修改成功，点击返回首页</a>")
        })
    })
    // 查找用户
    // app.get('/reach', (req, res, next) => {
    //     let result = null
    //     res.render('reach', { result })
    // })
    // app.post('/reach', (req, res, next) => {
    //     console.log(req.body)
    //     let response = res
    //     let reachType = req.body.reach_type,
    //         keyWord = req.body.keyword
    //     if (reachType == 0) {
    //         classModel.find({name: keyWord}, (err, result) => {
    //             if(err) return console.log(err)
    //             response.render('reach', { result })
    //         })
    //     } else {
    //         classModel.find({studentId: keyWord}, (err, result) => {
    //             if(err) return console.log(err)
    //             response.render('reach', { result })
    //         })
    //     }
    // })
}
module.exports = routes;