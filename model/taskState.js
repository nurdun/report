
//获取用户数据
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
        
var taskStateConn = mongoose.connect('mongodb://127.0.0.1:27017/report',{useMongoClient: true});
var taskStateData = new mongoose.Schema({
    taskId: String,
    stateName: String,
    statement: String,
},{collection:"taskState"}
);

var taskState = taskStateConn.model('taskStateData', taskStateData);

module.exports = taskState;
