const mongoose =require('mongoose')
const Schema =mongoose.Schema;


const UserSchema =new Schema({
    username :{type: String, required: true,unique :true},
    isAdmin :{type: Boolean, default: false},
    email:{type: String, required: true},
    password:{type: String, required: true},
    profilePicture:{type: String,default:"https://bafybeidxreedxpm7strmpek2nvfh7gbatj6c2mkeku4ppswxamsf5gd3rq.ipfs.dweb.link/ape.png"}

},{timestamps:true})

module.exports = mongoose.model('User',UserSchema) ;