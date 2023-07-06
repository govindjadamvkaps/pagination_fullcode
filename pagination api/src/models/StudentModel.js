import mongoose, { mongo } from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email:{type:String,required:true, unique:true},
    age:{type:Number, required:true},
    gender:{type:String, required:true},
    class:{type:String, required:true},
    marks:{type:Number, required:true}
},{
    timestamps:true
})

const StudenModel = new mongoose.model('Student', studentSchema)

export default StudenModel