import express from "express"
import fileUpload from "../helper/multer";
import {commentPost} from "../controllers/commentController";
import Authorization from "../middleware/auth";
const commentRouter = express.Router();


// routes
commentRouter.post("/commentPost/:id",Authorization,fileUpload.single("image"),commentPost);




export default commentRouter;