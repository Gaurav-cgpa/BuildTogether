import mongoose  from "mongoose";

const ProjectSchema=new mongoose.Schema({
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    techStack:[
        {
            type:String,
        }
    ],
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
    }],
},{timestamps:true});

const Project=mongoose.model("Project",ProjectSchema);

export default Project;