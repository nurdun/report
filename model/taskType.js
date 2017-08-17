
//获取用户数据
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
        
var taskTypeConn = mongoose.connect('mongodb://127.0.0.1:27017/report',{useMongoClient: true});
var taskTypeData = new mongoose.Schema({
    taskId: String,
    typeName: String,
    typeStatemen: String,
},{collection:"taskType"}
);

var taskType = taskTypeConn.model('taskTypeData', taskTypeData);

module.exports = taskType;
