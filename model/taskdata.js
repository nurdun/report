
//获取用户数据
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
        
var taskListConn = mongoose.connect('mongodb://127.0.0.1:27017/report',{useMongoClient: true});
var taskList = new mongoose.Schema({
    taskName: String,
    taskDetail: String,
    taskTime:{
        timeId:Number,
        createTime:Date,
        createPerson:String,
        lastUpdateTime:Date,
        updatePerson:String
    },
    taskTypeId:Number,
    parentTaskId:String,
    taskStateId:Number,
    taskleader:String,
    taskJoiner:Array,
    taskTarget:{
        targetTitle:String,
        targetDetail:String
    },
    taskResultTest:{
        testPoint:String,
        testTemplate:String,
        testPlanTime:Date
    }
},{collection:"taskData"}
);

var task = taskListConn.model('taskList', taskList);

module.exports = task;
