import jwt from "jsonwebtoken";
import Users from "../models/userModule"

const Authorization = async (req,res, next)=>{
    let token;
    try {
        if( req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
            token = req.headers.authorization.split(" ")[1];
            
        }

        if(!token){
            res.status(401).json({
                status: "Failed",
                message: "You not Logged in Plz try Again"
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const logedUser = await Users.findById(decoded.id);

        if(!logedUser){
            res.status(403).json({
                status:"Failed",
                message:"Token has Expired Please login Again"
            });

        }

        if(logedUser.role !== "user"){
            res.status(404).json({
                status: "Failed",
                message: "Only Admin  Allowed to Do This Action"
            });
        }
        else{
            req.Users = logedUser;
            next();
        }

        
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            error: error.message +  " or Please login again" + "token has expired please login again maybe",
        });
    }
}

export default Authorization;