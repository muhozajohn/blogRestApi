import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    username:{
        type: String,
        require:true
    },
    comment: {
        type: String,
        required: true
    }

});

const comment = mongoose.model("comment", commentSchema);
export default comment;

