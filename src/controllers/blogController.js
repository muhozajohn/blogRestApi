import cloudinary from "cloudinary"
import blog from "../models/blogModule"
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const blogPost = async (req,res)=>{
    try{
        console.log(req.file);
    const filesUp = await cloudinary.uploader.upload(req.file.path);
    const newBlog = new blog({
        image: filesUp.secure_url,
        title: req.body.title,
        author: req.Users.username,
        content: req.body.content,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        comment: req.body.comment,

    
    });

    await newBlog.save();
    res.status(200).json({
        statusbar: "success",
        message: "Blog Posted Successfully",
        data: {
            body: newBlog
        }

    })
    }catch(error){
        res.status(500).json({
            statusbar: "Failed",
            message: "Blog Failed to Create Blog",
            error: error.message + "Check your Query"
        });
    }

}

// getAllBlog
export const getAllBlog = async (req,res)=>{
    try {
        const getAll = await blog.find();
        res.status(200).json({ 
            statusbar: "success",
            message: "Successfully Blog Retrieved",
            data: {
                body: getAll
            }

          });

        
    } catch (error) {
        res.status(500).json({
            statusbar: "Failed",
            message:  "Failed to GetAll Blog",
            error: error.message + "Check your Query"
        })
        
    }
}

export const getById = async (req,res)=>{
    try {
        const GetID = await blog.findById(req.params.id);
        res.status(200).json({
            statusbar: "Success",
            message: "Single By ID Retrived Well",
            data: {
                body: GetID
            }
        })
        
    } catch (error) {
        res.status(500).json({
            statusbar: "failed",
            message: "Fail to Get Single By ID",
            error: error.message+ "Check your Queries"
        })
        
    }
}
// updateBlog
export const updateBlog = async (req,res)=>{
    // console.log(req.body);
    try {
        const {id} = req.params;
        const blogID = await blog.findById(id);
        if(!blogID){
            return res.status(404).json({
                statusbar: "Failed",
                message: "Blog ID Not Found",
            })
        }
        // console.log(blogID);        
        const filesUp = await cloudinary.uploader.upload(req.file.path);
        const update = await blog.findByIdAndUpdate(id, {
            image: filesUp.secure_url,
            title: req.body.title,
            content: req.body.content,
        
        },{new:true});

        res.status(200).json({
            statusbar: "success",
            message: "Blog Updated Successfully",
            data: {
                body: update
            }
        });


    } catch (error) {
        res.status(500).json({
            statusbar: "Failed",
            message:  "Failed to Update Blog",
            error: error.message + "Check your Update Query"

        });

        
    }
}

// deleteBlog

export const deleteBlog = async (req,res)=>{
    
    try {
        const {id} = req.params;
        const notFound = await blog.findById(id);
        if(!notFound){
            return res.status(404).json({
                statusbar: "Failed",
                message: "Blog ID You try to Delete Not Found",
            });
        }
        
        const deleteBlog = await blog.findByIdAndDelete(id);
        res.status(200).json({
            statusbar: "success",
            message: "Blog Deleted Successfully",
            data: {
                body: deleteBlog
            }
        });

    } catch (error) {
        res.status(500).json({
            statusbar: "Failed",
            message:  "Failed to Delete Blog",
            error: error.message + "Check your internet And Query"
        
    });
    }
}