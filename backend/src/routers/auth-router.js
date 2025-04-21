import express from 'express';
import { authController } from '../controllers/auth-controller.js';

export const authRouter = new express.Router();

authRouter.get('/register', authController.register)