const mongoose =require('mongoose')
const Schema =mongoose.Schema;
const _schema = new Schema({
    name:{type:String, required:true},
    age:{type:String, required:true},
    address:{type:String, required:true},
})
module.exports = mongoose.model('name_of_collection in database',_schema);