
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
    parentTaskId:Number,
    taskStateId:Number,
    taskleader:String,
    taskJoiner:Array,
    taskPoint:String
},{collection:"taskData"}
);

var task = taskListConn.model('taskList', taskList);

module.exports = task;

// userdata.findOne({name:"nurdun"}, function (err, user) {
//     console.log(user);
// });

// var mongoose = require('mongoose');

// //申明一个mongoons对象
// var UsersSchema = new mongoose.Schema({
//     name: String,
//     paw: String,
//     tocken:Number,
//     meta: { 
//         createAt: {
//             type: Date,
//             default: Date.now()
//         },
//         updateAt: {
//             type: Date,
//             default: Date.now()
//         }
//     }
// })

// //每次执行都会调用,时间更新操作
// UsersData.pre('save', function(next) {
//     if(this.isNew) {
//         this.meta.createAt = this.meta.updateAt = Date.now();
//     }else {
//         this.meta.updateAt = Date.now();
//     }

//     next();
// })

// //查询的静态方法
// UsersData.statics = {
//     fetch: function(cb) { //查询所有数据
//         return this
//           .find()
//           .sort('meta.updateAt') //排序
//           .exec(cb) //回调
//     },
//     findById: function(id, cb) { //根据id查询单条数据
//         return this
//           .findOne({_id: id})          
//           .exec(cb)
//     }
// }

// //暴露出去的方法
// module.exports = UsersData