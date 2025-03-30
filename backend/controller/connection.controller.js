import Connection from "../model/connection.model.js";
import Project from "../model/project.model.js";
import User from "../model/user.model.js";

export const sendConnectionRequest = async (req, res) => {
    try {
        const { projectId } = req.body;
        const sender = req.userId;

        if (!sender || !(await User.findById(sender))) {
            return res.status(404).json({ message: "Sender not found" });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const receiver = project.admin;
        if (!receiver || !(await User.findById(receiver))) {
            return res.status(404).json({ message: "Receiver not found" });
        }

        const newConnection = new Connection({
            sender,
            project: projectId,
            receiver,
            status: "pending",
        });

        await newConnection.save();
        return res.status(200).json({ message: "Connection request sent" });

    } catch (error) {
        console.error("Error in sendConnectionRequest:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const acceptConnectionRequest = async (req, res) => {
    try {
        const { connectionId } = req.body;
        const connection = await Connection.findById(connectionId);

        if (!connection) {
            return res.status(404).json({ message: "Connection not found" });
        }

        const sender=await User.findById(connection.sender);

        if(!sender||!(await User.findById(sender))){
            return res.status(404).json({ message: "Sender not found" });
        }

        const project=await Project.findById(connection.project);

        if(!project||!(await Project.findById(project))){
            return res.status(404).json({ message: "Project not found" });
        }

        const receiver=await User.findById(connection.receiver);

        if(!receiver||!(await User.findById(receiver))){
            return res.status(404).json({ message: "Receiver not found" });
        }   

        if(receiver._id.toString()!==req.userId){
            return res.status(401).json({ message: "Unauthorized to accept request" });
        }
        
        if(project.admin.toString()!==req.userId){
            return res.status(401).json({ message: "Unauthorized to accept request" });
        }
        
        project.members.push(sender._id);
        connection.status="accepted";

        await connection.save();

        return res.status(200).json({ message: "Connection request accepted" });

    } catch (error) {
        console.error("Error in acceptConnectionRequest:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const rejectConnectionRequest = async (req, res) => {
    try {
        const { connectionId } = req.body;
        const connection = await Connection.findById(connectionId);

        if (!connection) {
            return res.status(404).json({ message: "Connection not found" });
        }

        const sender=await User.findById(connection.sender);

        if(!sender||!(await User.findById(sender))){
            return res.status(404).json({ message: "Sender not found" });
        }

        const project=await Project.findById(connection.project);

        if(!project||!(await Project.findById(project))){
            return res.status(404).json({ message: "Project not found" });
        }

        const receiver=await User.findById(connection.receiver);

        if(!receiver||!(await User.findById(receiver))){
            return res.status(404).json({ message: "Receiver not found" });
        }   

        if(receiver._id.toString()!==req.userId){
            return res.status(401).json({ message: "Unauthorized to accept request" });
        }
        
        if(project.admin.toString()!==req.userId){
            return res.status(401).json({ message: "Unauthorized to accept request" });
        }

        connection.status="rejected";

        await connection.save();

        return res.status(200).json({ message: "Connection request rejected" });

    } catch (error) {
        console.error("Error in reject ConnectionRequest:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMyProjectRequests = async (req, res) => {
    try {
        const {projectId}=req.params;

        const project=await Project.findById(projectId);
        if(!project){
            return res.status(404).json({ message: "Project not found" });
        }

        const user=req.userId;
        if(!user||!(await User.findById(user)))
        {
            return res.status(500).json({ message: "user not found" });  
        }

        if(project.admin.toString()!==req.userId)
        {
            return res.status(500).json({ message: "You are not admin of the project" });  
        }

        const getRequest=await Connection.find({project:projectId,status:"pending"}).populate("sender");
        if(!getRequest){
            return res.status(404).json({ message: "No pending requests found" });
        }

        return res.status(200).json(getRequest);
    } catch (error) {
        console.error("Error in getMyProjectRequests:", error);
        return res.status(500).json({ message: "Internal Server Error" }); 
    }
};

