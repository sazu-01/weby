
import { SuccessResponse,  ErrorResponse } from "../helpers/response.js";

import ComponentModel from "../models/componentModel.js";


export const CreateComponents = async (req, res, next) => {
    try {
        const { name, data } = req.body;
        
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                message: "Invalid data format. Expected an array of data items."
            });
        }

        const createComponents = new ComponentModel({
            name,
            data: data.map((dataItem) => ({
                path: dataItem.path,
                value: dataItem.value,
            }))
        });

        await createComponents.save();
        
        return SuccessResponse(res, {
            message: "post components",
            payload: {
                createComponents
            }
        });
    } catch (error) {
        next(error);
    }
}


export const GetComponents = async (req, res, next) => {
    try {
        
        const components = await ComponentModel.find({});
        
        return SuccessResponse(res, {
          message : "return all components",
          payload : {
            components
          }
        })

    } catch (error) {
        next(error)
    }
}


export const UpdateComponents = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { name } = req.body;

        let updateField = {name, data};
        let options = {new : true};
        let filter = id;

        const updateComponent = await ComponentModel.findByIdAndUpdate({
            filter,
            updateField,
            options
        });

        if(!updateComponent){
            return ErrorResponse(res,{
                message : "component is not found or has got error"
            })
        }

        return SuccessResponse(res, {
            message : "update component successfully",
             payload : {
                updateComponent
             }
        })
    } catch (error) {
        next(error)
    }
}


export const DeleteComponent = async (req, res, next) => {
    try {
        const { name, data } = req.body;
        const {id} = req.params;

        const deleteCompnoent = await ComponentModel.findByIdAndDelete(
            id,
            name,
            data
        );

        if(!deleteCompnoent) ErrorResponse(res,{
            message : "components cant be delete",
        })

        return SuccessResponse(res,{
            message : "delte successfull",
            payload : {
               deleteCompnoent
            }
        })
    } catch (error) {
      next(error);  
    }
}