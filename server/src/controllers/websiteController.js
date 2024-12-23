

import { SuccessResponse } from "../helpers/response.js";
import WebsiteModel from "../models/websiteModel.js";
import ComponentModel from "../models/componentModel.js";


export const postWebsite = async (req, res, next) => {
  try {
    const { templateId, pages } = req.body;
    const userId = req.user._id;
    
    // Check if a website already exists
    const existingWebsite = await WebsiteModel.findOne({ userId, templateId });
    if (existingWebsite) {
      return SuccessResponse(res, {
        statusCode: 200,
        message: "Website already exists",
        payload: existingWebsite,
      });
    }
  
    // Process each page and its components
    const processedPages = await Promise.all(
      pages.map(async (page) => {
        const processedComponents = await Promise.all(
          page.components.map(async (componentName) => {
            // Find the original component
            const originalComponent = await ComponentModel.findOne({ name: componentName });
            
            if (!originalComponent) {
              throw new Error(`Component ${componentName} not found`);
            }
            
            // Return a copy of the component's data
            return {
              name: originalComponent.name,
              data: originalComponent.data.map(item => ({
                path: item.path,
                value: item.value
              }))
            };
          })
        );

        return {
          name: page.name,
          components: processedComponents
        };
      })
    );
    
    // Create new website with pages and their components
    const newWebsite = new WebsiteModel({
      pages: processedPages,
      templateId,
      userId,
    });
    
    await newWebsite.save();
    
    return SuccessResponse(res, {
      statusCode: 200,
      message: "Successfully created website",
      payload: newWebsite,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleWebsite = async (req, res, next) => {
  try {
    const { templateId } = req.query;

    const userId = req.user._id;
    
    const singleWebsite = await WebsiteModel.find({ templateId, userId }).sort({
      createdAt: -1,
    });


    return SuccessResponse(res, {
      statusCode: 200,
      message: "get data successful",
      payload: { singleWebsite },
    });
  } catch (error) {
    next(error);
  }
};

export const getWebsites = async (req, res, next) => {
  try {
    const websites = await WebsiteModel.find({})
        
    
    return SuccessResponse(res, {
      statusCode: 200,
      message: "all websites",
      payload: { websites },
    });
  } catch (error) {
    console.log(error);
    
    next(error);
  }
};

export const updateWebsite = async (req, res, next) => {
  try {
    
    return SuccessResponse(res, {
      statusCode: 200,
      message: "Website data updated successfully",
      payload: "update website successfull",
    });
  } catch (error) {
    next(error);
  }
};


export const deleteWebsite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    const deletedWebsite = await WebsiteModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deletedWebsite) {
      return SuccessResponse(res, {
        statusCode: 404,
        message: "websiteName not found or unauthorized",
      });
    }

    return SuccessResponse(res, {
      statusCode: 200,
      message: "delete websiteName successfully",
      payload: { deletedWebsite },
    });
  } catch (error) {
    next(error);
  }
};


