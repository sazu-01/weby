
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
    },

    PhoneNumber: {
      type: String,
    },

    Password: {
      type: String,
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(12)),
    },

    AlterPhoneNumber: {
      type: String,
    },

    Image : {
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

    LoginMethod : {
      type : String,
      enum : ["", "google"],
      required : true
    }
  },
  { timestamps: true }
);

const User = model("Users", userSchema);

export default User;