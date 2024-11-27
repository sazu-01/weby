
import { Schema, model } from "mongoose";

const WebsiteSchema = new Schema({
    
    websiteName : {
        type : String,
    },

    professionalTitle : {
        type : String,
    },

    templateId : {
        type : String,
        required : true
    },

    userId : {
        type : String,
        required : true,
    },

    
},{timestamps:true})

export const WebsiteModel = model("Websites",WebsiteSchema);

export default WebsiteModel;