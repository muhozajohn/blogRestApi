import comment from "../models/commentModule"
import blog from "../models/blogModule"
// import dotenv from "dotenv"

// dotenv.config();

export const commentPost = async (req,res)=>{
    const {id}= req.params;
    console.log(req.Users);
    try {
            const blogid = await blog.findById(id);
            if(!blogid){
                res.status(404).json({
                    statusbar: "Failed",
                    message: "Blog Id NotFound"
                });
            }

            const newComment = comment({
                username: req.Users.username,
                comment: req.body.comment
            });

            console.log(newComment);

            blogid.comment.push(newComment);
            await blogid.save();

            res.status(201).json({
                statusbar: "Success",
                message: "Comment Added Well",
                data:{
                    body:newComment
                }
            });
        
    } catch (error) {
        res.status(500).json({
            statusbar: "Failed",
            message: "Comment Not Created",
            error: error.message
        })
        
    }
}