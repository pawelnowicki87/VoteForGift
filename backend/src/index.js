import 'dotenv/config';
import express from 'express';
import { authRouter } from './routers/auth-router.js';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(authRouter);

app.get('/', (req, res) => {
    res.send("Hello from index.js")
});

app.listen(PORT);