import usersModel from '../models/userModule'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signup = async (req,res)=>{

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)

        const user = usersModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: process.env.EXP_TIME});
        const newUser = await user.save();
        res.status(200).json({
            message: "User Created Succesfuly",
            user: {
                body: newUser
            },
            token: token
        });
    }
    catch(error){
        res.status(200).json({
            message: "Failed To Create User",
            error: error.message
        })
    }


}

// login

export const login = async (req,res)=>{
    try{
            const userLogin = await usersModel.findOne({username: req.body.username});
            if(!userLogin){
                return res.status(404).json({
                    message: "User not found"
                })
            }
            
            const isMatch = await bcrypt.compare(req.body.password,userLogin.password)
            if(!isMatch){
                return res.status(404).json({
                    message: "Password inorect"
                })
            }
            const token = await jwt.sign({id: userLogin._id}, process.env.JWT_SECRET, {expiresIn: process.env.EXP_TIME})
            res.status(200).json({
                message: "logegin success",
                users:{
                    body:userLogin
                },
                token: token
            });

    }
    catch(error){
        res.status(500).json({
            message: "Fail to retrive ata",
            error: error.message
        })
    }
}
// Get All

export const getAllUser = async (req,res) =>{
    try {
        const getUser = await usersModel.find();
        if(!getUser){
            return res.status(404).json({
                message: "User not found"
            });
        }
        else{
        res.status(200).json({
            message: "User Retrieved Succesfuly",
            users: {
                body: getUser
            }
        });
    }
        
    } catch (error) {
        res.status(500).json({
            message: "Fail to retrive Data",
            error: error.message
        })
        
    }
}

// getByID
export const getUserById = async (req,res) =>{
    try {
        const getbyId = await usersModel.findById(req.params.id);
        if(!getbyId){
            return res.status(404).json({
                message: "User not found"
            });
        }   
        else{
            res.status(200).json({
                message: "User Retrieved Succesfuly",
                users: {
                    body: getbyId
                }
            });
        }


    } catch (error) {
        res.status(500).json({
            message: "Fail to retrive Single Data",
            error: error.message
        })
        
    }
}


// Delete
export const deleteUser = async (req,res) =>{
    try {
        const deleteUser = await usersModel.findByIdAndDelete(req.params.id);
        if(!deleteUser){
            return res.status(404).json({
                message: "User not found"
            });
        }
        else{
            res.status(200).json({
                message: "User Deleted Succesfuly",
                users: {
                    body: deleteUser
                }
            });
        }

    } catch (error) {
        res.status(500).json({
            message: "Fail to Delete Single Data",
            error: error.message
        })
        
    }
}

// update
export const updateUser = async (req,res) =>{
    try{
    const update = await usersModel.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
    if(!update){
        return res.status(404).json({
            message: "The Id is not found"
        });
    }
    else{
        res.status(200).json({
            message: "User Updated Succesfuly",
            users: {
                body: update
            }
        });
    }
}
    catch(error){
        res.status(500).json({
            message: "Fail to Update Single Data",
            error: error.message
        })
    }


}