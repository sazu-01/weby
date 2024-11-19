
//packages
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new Schema(
  {
    FullName: {
      type: String,
    },

    Image : {
        type : String,
    },

    Email: {
      type: String,
      unique: true,
    },

    PhoneNumber: {
      type: String,
      unique: [true, "already have an account with this number"],
    },

    Designation : {
        type : String,
        required : true,
    },

    Password: {
      type: String,
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(12)),
    },

    CV : {
     type : String,
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