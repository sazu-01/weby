
import mongoose from "mongoose";
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
          slug : page.slug,
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
    const  userId  = req.user._id;
    
    const singleWebsite = await WebsiteModel.findOne({ templateId, userId }).sort({
      createdAt : -1,
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


export const updateComponentValue = async (req, res, next) => {
  try {
    const { dataId, newValue } = req.body;
    const userId = req.user._id;

        // Validate that dataId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(dataId)) {
          return res.status(400).json({
            success: false,
            message: "Invalid data ID format"
          });
        }

    // Update the specific data item using its _id
    const updatedWebsite = await WebsiteModel.findOneAndUpdate(
      {
        userId,
        "pages.components.data._id": dataId
      },
      {
        $set: {
          "pages.$[].components.$[].data.$[data].value": newValue
        }
      },
      {
        arrayFilters: [{ "data._id": dataId }],
        new: true
      }
    );

    if (!updatedWebsite) {
      return res.status(404).json({
        success: false,
        message: "Data item not found or unauthorized"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Component data updated successfully",
      payload: updatedWebsite
    });
  } catch (error) {
    next(error);
  }
};

export const addPage = async (req, res, next) => {
  try {
    const { websiteId, pageName, slug, components } = req.body;
    const userId = req.user._id;

    // Validate websiteId format
    if (!mongoose.Types.ObjectId.isValid(websiteId)) {
      return ErrorResponse(res,{
        statusCode: 400,
        success: false,
        message: "Invalid website ID format"
      });
    }

    // Find the website and verify ownership
    const website = await WebsiteModel.findOne({
      _id: websiteId,
      userId
    });

    if (!website) {
      return ErrorResponse(res,{
        statusCode: 404,
        success: false,
        message: "Website not found or unauthorized"
      });
    }

    // Check if page with same name or slug already exists
    const pageExists = website.pages.some(
      page => page.name === pageName || page.slug === slug
    );

    if (pageExists) {
      return ErrorResponse(res,{
        statusCode: 400,
        success: false,
        message: "Page with this name or slug already exists"
      });
    }
     
    // Process components and get their default data
    const processedComponents = await Promise.all(
      components.map(async (componentName) => {
        const originalComponent = await ComponentModel.findOne({ name: componentName });
        
        if (!originalComponent) {
          throw new Error(`Component ${componentName} not found`);
        }
        
        return {
          name: originalComponent.name,
          data: originalComponent.data.map(item => ({
            path: item.path,
            value: item.value
          }))
        };
      })
    );

    // Create new page object
    const newPage = {
      name: pageName,
      slug: slug,
      components: processedComponents
    };

    // Add the new page to the website
    website.pages.push(newPage);
    await website.save();

    return SuccessResponse(res,{
      statusCode: 200,
      message: "Page added successfully",
      payload: website
    });
  } catch (error) {
    next(error);
  }
};

export const deletePage = async (req, res, next) => {
  try {
    const { websiteId, pageId } = req.body;
    const userId = req.user._id;

    // Validate websiteId format
    if (!mongoose.Types.ObjectId.isValid(websiteId)) {
      return ErrorResponse(res, {
        statusCode: 400,
        success: false,
        message: "Invalid website ID format"
      });
    }

    // Validate pageId format
    if (!mongoose.Types.ObjectId.isValid(pageId)) {
      return ErrorResponse(res, {
        statusCode : 400,
        success: false,
        message: "Invalid page ID format"
      });
    }

    // Find the website and verify ownership
    const website = await WebsiteModel.findOne({
      _id: websiteId,
      userId
    });

    if (!website) {
      return ErrorResponse(res, {
        statusCode: 404,
        success: false,
        message: "Website not found or unauthorized"
      });
    }

    // Check if it's the only page
    if (website.pages.length === 1) {
      return ErrorResponse(res,{
        statusCode: 400,
        success: false,
        message: "Cannot delete the only page of the website"
      });
    }

    // Check if page exists
    const pageIndex = website.pages.findIndex(
      page => page._id.toString() === pageId
    );

    if (pageIndex === -1) {
      return ErrorResponse(res, {
        statusCode: 404,
        success: false,
        message: "Page not found"
      });
    }

    // Check if trying to delete home page
    if (website.pages[pageIndex].slug === "/") {
      return ErrorResponse(res,{
        statusCode: 400,
        success: false,
        message: "Cannot delete the home page"
      });
    }

    // Remove the page
    website.pages.splice(pageIndex, 1);
    await website.save();

    return SuccessResponse(res,{
      statusCode: 200,
      message: "Page deleted successfully",
      payload: website
    });
  } catch (error) {
    next(error);
  }
};

export const addComponentToPage = async (req, res, next) => {
  try {
    const { websiteId, pageId, componentName } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!websiteId || !pageId || !componentName) {
      return res.status(400).json({
        success: false,
        message: "websiteId, pageId and componentName are required"
      });
    }

    // Find website and verify ownership
    const website = await WebsiteModel.findOne({
      _id: websiteId,
      userId
    });

    if (!website) {
      return res.status(404).json({
        success: false,
        message: "Website not found or unauthorized"
      });
    }

    // Find the page
    const pageIndex = website.pages.findIndex(
      page => page._id.toString() === pageId
    );

    if (pageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Page not found"
      });
    }

    // Find the component template
    const componentTemplate = await ComponentModel.findOne({ name: componentName });
    if (!componentTemplate) {
      return res.status(404).json({
        success: false,
        message: "Component template not found"
      });
    }

    // Check if component already exists on the page
    const componentExists = website.pages[pageIndex].components.some(
      comp => comp.name === componentName
    );

    if (componentExists) {
      return res.status(400).json({
        success: false,
        message: "Component already exists on this page"
      });
    }

    // Create new component with default data
    const newComponent = {
      name: componentTemplate.name,
      data: componentTemplate.data.map(item => ({
        path: item.path,
        value: item.value
      }))
    };

    // Add component to the page
    website.pages[pageIndex].components.push(newComponent);
    await website.save();

    return res.status(200).json({
      success: true,
      message: "Component added successfully",
      payload: website
    });
  } catch (error) {
    next(error);
  }
};


export const removeComponentFromPage = async (req, res, next) => {
  try {
    const { websiteId, pageId, componentId } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!websiteId || !pageId || !componentId) {
      return res.status(400).json({
        success: false,
        message: "websiteId, pageId and componentId are required"
      });
    }

    // Find website and verify ownership
    const website = await WebsiteModel.findOne({
      _id: websiteId,
      userId
    });

    if (!website) {
      return res.status(404).json({
        success: false,
        message: "Website not found or unauthorized"
      });
    }

    // Find the page
    const pageIndex = website.pages.findIndex(
      page => page._id.toString() === pageId
    );

    if (pageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Page not found"
      });
    }

    // Find and remove the component
    const componentIndex = website.pages[pageIndex].components.findIndex(
      comp => comp._id.toString() === componentId
    );

    if (componentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Component not found on this page"
      });
    }

    // Remove the component
    website.pages[pageIndex].components.splice(componentIndex, 1);
    await website.save();

    return res.status(200).json({
      success: true,
      message: "Component removed successfully",
      payload: website
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


