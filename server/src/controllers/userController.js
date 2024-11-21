

//model
import User from "../models/userModel.js";

//helper
import { SuccessResponse, ErrorResponse } from "../helpers/response.js";


export const CreateUser = async (req, res, next) => {
    try {
        const { Email, PhoneNumber } = req.body;
        
        const existUser = await User.findOne({$or : [{Email}, {PhoneNumber}]});
        
        //check if already exist user with email & phoneNumber
        if(existUser) {
            return ErrorResponse(res, {
                statusCode : 422,
                message :"This email or phone number is already registered"
            })
        }

        //create a token with the user data
        const userInfo = {...req.body};

        await User.create(userInfo);
        
        return SuccessResponse(res, {
            statusCode : 200,
            message : "registration complete successfull",
        })
    
    } catch (error) {
        next(error);
    }
};



export const GetAllUser = async (req, res, next) => {
    try {
        const allUser = await User.find({});

        return SuccessResponse(res, {
            statusCode : 200,
            message : "return all the user",
            payload : {
                allUser
            }
        })
    } catch (error) {
        next(error);
    }
}


export const GetSingleUser = async (req, res, next) => {
    try {
       const { id } = req.params;
       const singleUserById = await User.findById({_id : id});

       return SuccessResponse(res, {
        statusCode : 200,
        message : "retuen a user",
        payload : { singleUserById }
       })
    } catch (error) {
        next(error)
    }
}


export const UpdateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        // Find user and update
        const updatedUser = await User.findByIdAndUpdate(
            id,{ $set: updateData },
            { 
                new: true, // Return the updated document
                runValidators: true // Run model validators
            }
        );

        if (!updatedUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        return SuccessResponse(res, {
            statusCode: 200,
            message: "User updated successfully",
            payload: { user: updatedUser }
        });
    } catch (error) {
        next(error);
    }
};

export const DeleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find user and delete
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        return SuccessResponse(res, {
            statusCode: 200,
            message: "User deleted successfully",
            payload: { user: deletedUser }
        });
    } catch (error) {
        next(error);
    }
};
