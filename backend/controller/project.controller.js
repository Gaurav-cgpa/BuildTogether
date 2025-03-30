import Project from "../model/project.model.js";
import User from "../model/user.model.js";

export const createProject = async (req, res) => {
    try {
        const {title, description, techStack} = req.body;

        if(!title || !description || !techStack){
            return res.status(400).json({msg: "All fields are required"});
        }

        const newProject=new Project({
            admin:req.user._id,
            title,
            description,
            techStack,
        });

        await newProject.save();
        res.json({msg: "Project created successfully"});
    } catch (error) {
        console.log("Error in creating project and project controller: ", error);
        return res.status(500).json({msg: "Internal server error"});
    }
};

export const seeProjectDetail = async (req, res) => {
    try {
        const {ProjectId} = req.params;

        const project=await Project.findById(ProjectId).select('title,admin, techStack,description');

        if(!project){
            return res.status(404).json({msg: "Project not found"});
        }   

        return res.status(200).json(project);

    } catch (error) {
        console.log("Error in seeing project detail and project controller: ", error);
        return res.status(500).json({msg: "Internal server error"});
    }
};

export const removeMemberFromProject = async (req, res) => {
    try {
        const {ProjectId,memberId} = req.params;

        const project=await Project.findById(ProjectId);
        if(!project){
            return res.status(404).json({msg: "Project not found"});
        }

        const user=await User.findById(memberId);
        if(!user){
            return res.status(404).json({msg: "Member not found"});
        }

        if(!project.members.includes(memberId)){
            return res.status(400).json({msg: "User is not part of the project"});
        }

        if(project.admin.toString()!==req.user._id){
            return res.status(400).json({msg: "Only admin can remove members"});
        }

        project.members=project.members.filter(member=>member!=memberId);

        await project.save();

        return res.status(200).json({msg: "Member removed successfully"});
    } catch (error) {
        console.log("Error in removing member from project and project controller: ", error);
        return res.status(500).json({msg: "Internal server error"});
    }
};

export const updateProject = async (req, res) => {
    try {
        const {ProjectId} = req.params;
        const {title,description,techStack}=req.body;

        const project=await Project.findById(ProjectId);
        if(!project)
        {
            return res.status(404).json({msg: "Project not found"});
        }

        if(project.admin.toString()!==req.user._id){
            return res.status(400).json({msg: "Only admin can update project"});
        }

        if(title){
            project.title=title;
        }
        
        if(description){
            project.description=description;
        }

        if(techStack){
            project.techStack=techStack;
        }

        await project.save();   

        return res.status(201).json({message: "Project updated successfully"});
    } catch (error) {
        console.log("Error in updating project and project controller: ", error);
        return res.status(500).json({msg: "Internal server error"});
    }
};

export const deleteProject = async (req, res) => {
    try {
        const {ProjectId} = req.params;
        const project=await Project.findById(ProjectId);

        if(!project)
        {
            return res.status(404).json({msg: "Project not found"});
        }

        if(project.admin.toString()!==req.user._id){
            return res.status(400).json({msg: "Only admin can delete project"});
        }

        await project.remove();

        return res.status(200).json({msg: "Project deleted successfully"});

    } catch (error) {
        console.log("Error in deleting project and project controller: ", error);
        return res.status(500).json({msg: "Internal server error"});
    }
};

export const seeAllMembersOfProject = async (req, res) => {
    try {
        const {ProjectId} = req.params;

        const project=await Project.findById(ProjectId);
        if(!project)
        {
            return res.status(404).json({msg: "Project not found"});
        }   

        const members=await User.find({_id:{$in:project.members}}).select('name email');
        if(!members){
            return res.status(404).json({msg: "Members not found"});
        }

        return res.status(200).json(members);
    } catch (error) {
        console.log("Error in seeing all members of project and project controller: ", error);
        return res.status(500).json({msg: "Internal server error"});
    }
};

export const seeAllProject = async (req, res) => {
    try {
        const projects=await Project.find({}).select('title description techStack admin');
        if(!projects){
            return res.status(404).json({msg: "Projects not found"});
        }

        return res.status(200).json(projects);
    } catch (error) {
        console.log("Error in seeing all projects and project controller: ", error);
        return res.status(500).json({msg: "Internal server error"});
    }
};

export const filterProject = async (req, res) => {
    try {
        const {techStack}=req.body;

        if (!techStack || !Array.isArray(techStack) || techStack.length === 0) {
            return res.status(400).json({ msg: "Invalid tech stack input" });
        }

        const projects = await Project.find({
            techStack: { $in: techStack }
        }).select('title description techStack admin');

        if (!projects.length) {
            return res.status(404).json({ msg: "Projects not found" });
        }

        return res.status(200).json(projects);
    } catch (error) {
        console.log("Error in filtering project and project controller: ", error);
        return res.status(500).json({msg: "Internal server error"});
    }
};

export const seeMyAllProjects = async (req, res) => {
    try {
        const project=await Project.find({admin:req.user._id}).select('title techstack description admin');
        if(!project){
            return res.status(404).json({msg: "Projects not found"});
        }

        return res.status(200).json(project);   
    } catch (error) {
        console.log("Error in seeing my all projects and project controller: ", error);
        return res.status(500).json({msg: "Internal server error"});
    }
};