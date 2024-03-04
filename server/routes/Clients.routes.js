// import { Router } from 'express';
import express from 'express';
import * as controller from '../controllers/clients.controller.js';
import basicHeaderMiddleware from '../middlewares/basicHeader.middleware.js';

// const router = Router();
const router = new express.Router();

router.get('/', basicHeaderMiddleware, controller.getClients);

export default router;

