import mongoose from "mongoose";

const userSchema=mongoose.Schema({
   
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    username:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    about: {
        type: String,
        default: "",
    },
    skills: [String],
    experience: 
        {
            type:String,
        },
    education:
        {
            type:String,
        },
    projects:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project",
        }
    ],
    task:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task",
        }
    ],
    linkedin:{
        type: String,
        trim: true,
    },
    github:{
        type: String,
        trim: true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    verificationToken: String,
	verificationTokenExpiresAt: Date,
},{timestamps:true});

const User=mongoose.model("User",userSchema);

export default User;