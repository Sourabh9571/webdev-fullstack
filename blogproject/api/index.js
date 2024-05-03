import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js';
import uploadRouter from './routes/upload.js';
import commentsRouter from './routes/comments.js'

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(cookieParser());

// Routers
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/comments", commentsRouter);


app.listen(8888, () => {
    console.log('Server is running');
});
