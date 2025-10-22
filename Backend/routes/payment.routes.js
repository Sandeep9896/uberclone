import express from 'express';
import * as authMiddleware from '../middleware/auth.middleware.js';
import {body} from 'express-validator'
import * as paymentController from '../controller/payment.controller.js';

const router = express.Router();


router.post("/orders",paymentController.createOrder);
router.post("/verify", paymentController.verify);

export default router;
