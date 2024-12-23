

import { Schema, model } from "mongoose";

export const ComponentSchema = new Schema({
    name : {    
        type : String,
        trim : true,
    },

    data : [{
        path : {
            type : String
        },
        value : {
            type : Schema.Types.Mixed //Allow any type of value
        }
    }]
});

const ComponentModel = model("Components",ComponentSchema);

export default ComponentModel;