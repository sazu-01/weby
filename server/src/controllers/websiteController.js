
import { SuccessResponse } from "../helpers/response.js";

import WebsiteModel from "../models/websiteModel.js";

export const postWebsite = async (req, res, next) => {
    try {
        const {websiteName, professionalTitle, templateId} = req.body;
        
        await WebsiteModel.create({websiteName, professionalTitle, templateId});

        return SuccessResponse(res,{
           statusCode : 200,
           message : "successfully post data",
        })
    } catch (error) {
        next(error)
    }
}


export const getSingleWebsite = async (req, res, next) => {
    try {
        const {templateId} = req.query;

        const data = await WebsiteModel.find({templateId}).sort({ createdAt: -1 }); 
        
        return SuccessResponse(res, {
            statusCode: 200,
            message: "get data successful",
            payload: { data }
        });
    } catch (error) {
        next(error);
    }
};


export const getWebsites = async (req, res, next) => {
    try {
        
        const websites = await WebsiteModel.find({});
        
        return SuccessResponse(res,{
            statusCode : 200,
            message : "all websites",
            payload : { websites }
        })
    } catch (error) {
        next(error);
    }
}



export const updateWebsite = async (req, res, next) => {
    try {
        const { id } = req.params;  
        const { websiteName, professionalTitle, templateId } = req.body;

        // Find and update the document
        const updatedData = await WebsiteModel.findByIdAndUpdate(
             {_id : id, templateId},
            { websiteName, professionalTitle, templateId },
            { new: true }  
        );

        // Check if document exists
        if (!updatedData) {
            return SuccessResponse(res, {
                statusCode: 404,
                message: "Document not found for the specified template" 
            });
        }

        return SuccessResponse(res, {
            statusCode: 200,
            message: "Website data updated successfully",
            payload: { updatedData }
        });

    } catch (error) {
        next(error);
    }
};


export const deleteWebsite = async (req, res, next) => {
    try {
        const {id} = req.params;
        const deleteData = await WebsiteModel.findByIdAndDelete({_id: id});

        return SuccessResponse(res,{
            statusCode : 200,
            message : "delete websiteName successfully",
            payload : { deleteData }
        })
    } catch (error) {
        next(error)
    }
}