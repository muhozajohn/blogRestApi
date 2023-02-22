import mongoose from "mongoose";

 const usersModel = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: false,
        default: "user"
    }
},{
    timestamps: true
});

const Users = mongoose.model("users", usersModel);
export default Users;