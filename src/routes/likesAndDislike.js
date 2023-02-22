import express  from "express";
import {addlike,Dislike,addDislike,reDislike} from "../controllers/likesAndDislike.controller"
const likesRouter = express.Router();


// routes
likesRouter.post("/likepost/:id", addlike);
likesRouter.get("/removelike/:id", Dislike);
likesRouter.post("/addDislike/:id", addDislike);
likesRouter.get("/reDislike/:id", reDislike);



export default likesRouter;