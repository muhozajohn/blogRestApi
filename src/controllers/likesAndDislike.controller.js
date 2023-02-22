import blog from "../models/blogModule";

export const addlike = async (req,res)=>{
    try {
        const {id} = req.params;
        const blogID = await blog.findById(id);
        if(!blogID){
            return res.status(404).json({
                statusbar: "Failed",
                message:"Blog ID not found"
            });
            
        }

        // blogID.likes = Number(blogID.likes)+1;
        blogID.likes += 1;
        await blogID.save();

        res.status(200).json({
            statusbar: "Success",
            message: "Like added successfully",
            data:{
                body: blogID
            }
        })
        
    } catch (error) {
        res.status(500).json({
            statusbar: "Failed",
            message: "Failed to add like ",
            error: error.message + " check Likes Query"          
        });    
    }
}

// Removing Like

export const Dislike = async (req,res) =>{
    try {
        const {id} = req.params;
        const getblogId = await blog.findById(id);

        if(!getblogId){
            res.status(404).json({
                statusbar: "Failed",
                message:"Blog ID not found"
            });
        }

        getblogId.likes -= 1;
        await getblogId.save();

        res.status(200).json({
            statusbar: "Success",
            message: "Like removed successfully",
            data: {
                body: getblogId
            }
        });
        
    } catch (error) {
        res.status(500).json({
            statusbar: "Failed",
            message: "Failed to remove like ",
            error: error.message + " check DisLikes Query"        
        
    });
}
}


// Adding Dislike on blog

export const addDislike = async (req,res)=>{
    try {
        const {id} = req.params;
        const blogID = await blog.findById(id);
        if(!blogID){
            res.status(404).json({
                statusbar: "Failed",
                message: "Blog ID not found"
            });
        }

        blogID.dislikes += 1;
        await blogID.save();

        res.status(200).json({
            statusbar: "Success",
            message: "Dislike added successfully",
            data:{
                body: blogID
            }

        });
  
    } catch (error) {
        res.status(500).json({
            statusbar: "Failed",
            message: "Failed to add dislike ",
            error: error.message + " check DisLikes Query"          
        });

        
    }



}


// reDislike

export const reDislike = async (req,res)=>{
    try {
        const {id} = req.params;
        const getBID = await blog.findById(id);
            if(!getBID){
                res.status(404).json({
                    statusbar: "Failed",
                    message: "Blog ID not found"
                });
            }

            getBID.dislikes -= 1;
            await getBID.save();
            res.status(200).json({
                statusbar: "Success",
                message: "Dislike removed successfully",
                data: {
                    body: getBID
                    
                }

            });
    
    } catch (error) {
        res.status(500).json({
            statusbar: "Failed",
            message: "Failed to remove dislike ",
            error: error.message + " check DisLikes Query"        
        });


        
    }
}

