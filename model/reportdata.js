
//获取用户数据
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
        
var reportListConn = mongoose.connect('mongodb://127.0.0.1:27017/report',{useMongoClient: true});
var reportList = new mongoose.Schema({
    reportBelongId: Number,
    reportDetail: {
        task_id:String,
        helper:String,
        spendTime:String,
        Detail:String,
        doc:Boolean
    }
},{collection:"report"}
);

var report = reportListConn.model('reportList', reportList);

module.exports = report;
