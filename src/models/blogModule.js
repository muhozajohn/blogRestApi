import mongoose  from "mongoose";

const blogSchema = new mongoose.Schema({
    image:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    author:{
        type: Array,
    },
    content: {
        type: String,
        required: true
    },
    likes:{
        type:Number,
        default: 0        
    },
    dislikes:{
        type:Number,
        default: 0
    
    },
    comment: {
        type: Array,
       
    }
});

const blog = mongoose.model("blogs",blogSchema);

export default blog