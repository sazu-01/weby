
//packages
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new Schema(
  {
    FullName: {
      type: String,
      required : true,
    },

    Email: {
      type: String,
      unique: true,
      required : true,
      validate: {
        validator: function (value) {
          // Regular expression for validating an email address with proper domain
          return /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|protonmail\.com)$/.test(value);
        },
        message: "Please enter a valid email address from a recognized domain (e.g., gmail.com, yahoo.com)",
      },
    },

    PhoneNumber: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function(value) {
          // Validates Bangladeshi phone numbers
          // Format: 01[3-9]xxxxxxxx
          return /^01[3-9]\d{8}$/.test(value);
        },
        message: "Please enter a valid Bangladesh phone number starting with '01' "
      }
    },

    AlterPhoneNumber: {
      type: String,
      validate: {
        validator: function(value) {
          // Validates Bangladeshi phone numbers
          // Format: 01[3-9]xxxxxxxx
          return /^01[3-9]\d{8}$/.test(value);
        },
        message: "Please enter a valid Bangladeshi phone number starting with '01' followed by 9 digits"
      }
    },

    Password: {
      type: String,
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(12)),
      required : true,
    },

    Image : {
      type : String,
    },

    AboutMe : {
      type : String,
    },

    Designation : {
      type : String,
    },

    CV : {
     type : String,
    },
    
    LinkedIn: {
      type: String,
    },

    Twitter: {
      type: String,
    },
    
    Facebook: {
      type: String,
    },

    Youtube : {
      type : String,
    },

    Dribble : {
      type : String,
    },

    Instagram: {
      type : String,
    },

    Behance: {
      type: String,
    },

    IsAdmin: {
      type: Boolean,
      default: false,
    },

    IsBanned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("Users", userSchema);

export default User;