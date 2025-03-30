import Project from "../model/project.model.js";
import Task from "../model/task.model.js";
import User from "../model/user.model.js";


export const AssignTask = async (req, res) => {
    try {
        const {projectId,contributorId}=req.params;
        const {task,status,assignDate,deadline,comments}=req.body;

        const project=await Project.findById(projectId);
        if(!project){
            return res.status(404).json({message:"Project not found"});
        }
        
        const contributor=await User.findById(contributorId);
        if(!contributor){
            return res.status(404).json({message:"Contributor not found"});
        }

        if(project.admin.toString()!==req.userId){
            return res.status(401).json({message:"You are not authorized to assign task"});
        }


        if(!project.members.includes(contributorId))
        {
            return res.status(404).json({message:"Contributor not a member of the project"});
        }

        const newTask=new Task({
            project:projectId,
            task,
            contributor:contributorId,
            status,
            assignDate,
            deadline,
            comments,
        });

        await newTask.save();
        return res.status(201).json({message:"Task assigned successfully"});

    } catch (error) {
        console.log("Error in AssignTask: ",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const UpdateTask = async (req, res) => {
    try {
        const {taskId}=req.params;
        const {status,assignDate,deadline,comments}=req.body;

        const task=await Task.findById(taskId);
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }   

        const project=await Project.findById(task.project);
        if(!project){
            return res.status(404).json({message:"Project not found"});
        }

        if(project.admin.toString()!==req.userId){
            return res.status(401).json({message:"You are not authorized to update task"});
        }

        await Task.findByIdAndUpdate(taskId,{status,assignDate,deadline,comments});

        return res.status(200).json({message:"Task updated successfully"});
    } catch (error) {
        console.log("Error in UpdateTask: ",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const submitTask = async (req, res) => {
    try {
        const {taskId}=req.params;
        
        const task=await Task.findById(taskId);
        if(!task){
            return res.status(404).json({message:"Task not found"});
        }  
        
        const project=await Project.findById(task.project);
        if(!project){
            return res.status(404).json({message:"Project not found"});
        }

        if(task.contributor.toString()!==req.userId){
            return res.status(401).json({message:"You are not authorized to submit task"});
        }

        if(!project.members.includes(req.userId))
        {
            return res.status(404).json({message:"Contributor not a member of the project"});
        }
        
        project.status="complete";

        await project.save();
        await task.updateOne({status:"complete"});

        return res.status(200).json({message:"Task submitted successfully"});

    } catch (error) {
        console.log("Error in taskDone: ",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const getMyTask = async(req,res)=>{
    try {
        const userId=req.userId;

        const task=await Task.find({contributor:userId}).populate("project");
        if(!task){
            return res.status(404).json({message:"No task found"});
        }

        if(task.contributor.toString()!==req.userId){
            return res.status(401).json({message:"You are not authorized to view task"});
        }

        const project=await Project.findById(task.project);
        if(!project)
        {
            return res.status(404).json({message:"Project not found"});
        }

        if(!project.members.includes(req.userId))
        {
            return res.status(404).json({message:"Contributor not a member of the project"});
        }

        if(task.status==="complete")
        {
            return res.status(200).json({message:"Task already completed"});
        }

        return res.status(200).json({task});
    } catch (error) {
        console.log("Error in getMyTask: ",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
};

export const checkTask = async (req, res) => {
    try {
        const {taskId}=req.params;
        const {status,assignDate,deadline,comments}=req.body;
        const task=await Task.findById(taskId);

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        const project=await Project.findById(task.project);
        if(!project){
            return res.status(404).json({message:"Project not found"});
        }   

        if(project.admin.toString()!==req.userId){
            return res.status(401).json({message:"You are not authorized to check task"});
        }

        const contributor=await User.findById(task.contributor);
        if(!contributor){
            return res.status(404).json({message:"Contributor not found"});
        }   

        await task.findByIdAndUpdate(taskId,{status,assignDate,deadline,comments});

        return res.status(200).json({message:"Task checked successfully"});
        
    } catch (error) {
        console.log("Error in checkTask: ",error.message);
        return res.status(500).json({message:"Internal server error"});
    }
};