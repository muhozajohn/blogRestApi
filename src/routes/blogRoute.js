import express from "express"
import fileUpload from "../helper/multer";
import Authorization from "../middleware/auth";
import {blogPost,getAllBlog,updateBlog,deleteBlog,getById} from "../controllers/blogController";
const blogsRouter = express.Router();


// routes
blogsRouter.post("/blogPost",Authorization, fileUpload.single("image"),blogPost);
blogsRouter.get("/getAll",getAllBlog);
blogsRouter.get("/:id",getById);
blogsRouter.put("/update/:id", fileUpload.single("image"),updateBlog);
blogsRouter.delete("/delete/:id",deleteBlog);








export default blogsRouter;

