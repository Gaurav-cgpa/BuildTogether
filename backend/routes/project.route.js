import express from 'express';
import { createProject, deleteProject, filterProject, removeMemberFromProject, seeAllMembersOfProject, seeAllProject, seeMyAllProjects, seeProjectDetail, updateProject } from '../controller/project.controller.js';
import { protectRoute } from '../middleware/verify.auth.js';

const router=express.Router();

router.post("/createProject",protectRoute,createProject);

router.get("/seeProjectDetail/:projectId",protectRoute,seeProjectDetail);

router.put("/removeMemberFromProject/:projectId/:memberId",protectRoute,removeMemberFromProject);

router.put("/updateProject/:projectId",protectRoute,updateProject);

router.delete("/deleteProject/:projectId",protectRoute,deleteProject);

router.get("/seeAllProjects",protectRoute,seeAllProject);

router.get("/seeAllMembers/:projectId",protectRoute,seeAllMembersOfProject);

router.get("/filterProjects",protectRoute,filterProject);

router.get("/seeMyAllProjects",protectRoute,seeMyAllProjects);

export default router;