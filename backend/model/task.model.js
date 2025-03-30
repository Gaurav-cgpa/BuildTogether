
import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true,
    },
    task:{
        type:String,
        required:true,
    },
    contributor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:["pending","complete"],
        default:"pending",
    },
    assignDate:{
        type:Date,
        default: Date.now,
    },
    deadline:{
        type:Date,
    },
    comments:{
        type:String,
    }
},{timestamps:true});

const Task=mongoose.model("Task",taskSchema);

export default Task;