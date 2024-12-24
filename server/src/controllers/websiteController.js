

import { ErrorResponse, SuccessResponse } from "../helpers/response.js";
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
    const { id } = req.params;
    
    const singleWebsite = await WebsiteModel.findById({ _id : id  });

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
    const { websiteId, pages } = req.body;
    const userId = req.user._id;

    const website = await WebsiteModel.findOne({ _id: websiteId, userId });
    if (!website) {
      throw new Error('Website not found or unauthorized');
    }

    // Create a map of pages to update
    const updatedPagesMap = new Map(pages.map(page => [page._id.toString(), page]));

    // Update only specified pages while preserving others
    const updatedPages = website.pages.map(existingPage => {
      const pageToUpdate = updatedPagesMap.get(existingPage._id.toString());
      
      if (!pageToUpdate) {
        return existingPage; // Keep unchanged pages as is
      }

      // Create component updates map
      const updatedComponentsMap = new Map(
        pageToUpdate.components?.map(comp => [comp.name, comp]) || []
      );

      return {
        _id: existingPage._id,
        name: pageToUpdate.name || existingPage.name,
        components: existingPage.components.map(existingComponent => {
          const componentUpdate = updatedComponentsMap.get(existingComponent.name);
          
          if (!componentUpdate) {
            return existingComponent; // Keep unchanged components as is
          }

          // Create data updates map
          const updatedDataMap = new Map(
            componentUpdate.data?.map(item => [item.path, item]) || []
          );

          return {
            name: existingComponent.name,
            data: existingComponent.data.map(existingData => {
              const dataUpdate = updatedDataMap.get(existingData.path);
              return dataUpdate || existingData; // Update only specified data
            })
          };
        })
      };
    });

    const updatedWebsite = await WebsiteModel.findByIdAndUpdate(
      websiteId,
      { $set: { pages: updatedPages } },
      { new: true }
    );

    return SuccessResponse(res, {
      statusCode: 200,
      message: "Website updated successfully",
      payload: updatedWebsite
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


