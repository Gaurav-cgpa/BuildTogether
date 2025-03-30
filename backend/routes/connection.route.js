
import express from 'express';
import { protectRoute } from '../middleware/verify.auth.js';
import { acceptConnectionRequest, getMyProjectRequests, rejectConnectionRequest, sendConnectionRequest } from '../controller/connection.controller.js';

const router=express.Router();

router.post("/sendConnectionRequest/:projectId",protectRoute,sendConnectionRequest);

router.post("/acceptConnectionRequest/:connectionId",protectRoute,acceptConnectionRequest);

router.post("/rejectConnectionRequest/:connectionId",protectRoute,rejectConnectionRequest);

router.post("/getMyProjectRequests/:projectId",protectRoute,getMyProjectRequests);

export default router;