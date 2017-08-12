
//获取用户数据
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
        
var conn = mongoose.connect('mongodb://127.0.0.1:27017/report',{useMongoClient: true});
var User = new mongoose.Schema({
    name: String,
    paw: String,
    tocken: Number
});

var userdata = conn.model('User', User);

module.exports = userdata;

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