
//获取用户数据
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
        
var stationConn = mongoose.connect('mongodb://127.0.0.1:27017/report',{useMongoClient: true});
var stationData = new mongoose.Schema({
    stationName: String,
    dept: String,
    stationRank:String,
    leader: String,
    aboutstation: String,
    workdetail: String,
    stationclaim: String,
    education: String,
    skill: String,
    workspace: String,
    worktimefeature:String
},{collection:"station"});

var station = stationConn.model('stationData', stationData);

module.exports = station;
