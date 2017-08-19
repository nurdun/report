
//获取考核结果数据
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
        
var resultConn = mongoose.connect('mongodb://127.0.0.1:27017/report',{useMongoClient: true});
var testResult = new mongoose.Schema({
    userId: String,
    taskId:String,
    testLeader:String,
    testTime:Date,
    testcomment:String,
    testScore:String,
    testAttr:String
},{collection:"testResult"}
);

var result = resultConn.model('testResult', testResult);

module.exports = result;
