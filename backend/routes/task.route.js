import express from 'express';
import { protectRoute } from '../middleware/verify.auth.js';
import { AssignTask, checkTask, getMyTask, submitTask, UpdateTask } from '../controller/task.controller.js';

const router=express.Router();  

router.post("/AssignTask/:projectId/:contributorId",protectRoute,AssignTask);

router.put("/UpdateTask/:taskId",protectRoute,UpdateTask); 

router.put("/submitTask/:taskId",protectRoute,submitTask);

router.get("/getTask",protectRoute,getMyTask);

router.post("/checkTask/:taskId",protectRoute,checkTask);

export default router;