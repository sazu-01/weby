
import { Schema, model } from "mongoose";

const WebsiteSchema = new Schema({

    templateId : {
        type : String,
        required : true
    },

    userId : {
        type : String,
        required : true,
    },
    
    pages : [{
      name : {
        type : String,
        required : true,
      },
      components: [{
        name: {
            type : String
        },
        data: [{
          path: {
            type : String,
          },
          value: {
            type : Schema.Types.Mixed,
          },
        _id : false
        }],
        _id : false
      }]
    }],

    
},{timestamps:true})

const WebsiteModel = model("Websites",WebsiteSchema);

export default WebsiteModel;