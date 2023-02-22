import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// controllers
import userRouter from "./routes/userRoute";
import blogsRouter from './routes/blogRoute';
import commentRouter from './routes/commentRoute';
import likesRouter from './routes/likesAndDislike';


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogsRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/likes", likesRouter);



app.get("/", (req,res)=>{
    res.status(200).json({
        message: "Welcome to the Saints API's"
    })
})

export default app;