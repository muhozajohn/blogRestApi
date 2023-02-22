import {signup,login,getAllUser,getUserById,deleteUser,updateUser} from "../controllers/userController"
import express from "express";
import Authorization from "../middleware/auth"
import fileUpload from "../helper/multer"


const userRouter = express.Router();
userRouter.post("/signup",fileUpload.single("image"), signup);
userRouter.post("/login",fileUpload.single("image"), login);
userRouter.get("/getAll", getAllUser);
userRouter.get("/:id", getUserById);
userRouter.delete("/delete/:id", deleteUser);
userRouter.put("/update/:id", updateUser);






export default userRouter;