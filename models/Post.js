const mongoose =require('mongoose')
const Schema =mongoose.Schema;
const slug =require('mongoose-slug-generator');

const PostSchema =new Schema({
    title:{type:String,required:true ,unique:true},
    desc:{type:String,required:false },
    content:{type:String,required:true },
    slug:{type :String,slug:'title',unique:true},

    photo:{type:String,required:false },
    username:{type:String,required:true},
    categories:{type:Array,required:false},


},{timestamps:true})
mongoose.plugin(slug);

module.exports = mongoose.model('Post',PostSchema) ;