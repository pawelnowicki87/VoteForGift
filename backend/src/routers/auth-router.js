import express from 'express';
import { authController } from '../controllers/auth-controller.js';

export const authRouter = new express.Router();

authRouter.post('/register', authController.register)
authRouter.get('/activation/:activationToken', authController.activate)
authRouter.post('/login', authController.login)
authRouter.get('/refresh', authController.refresh)