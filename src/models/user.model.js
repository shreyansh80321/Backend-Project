import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    index:true
  },
  avatar: {
    type: String,
    // required: true,//cloudinary url
  },
  coverImage: {
    type:String
  },
  watchHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Video"
    }
  ],
  password: {
    type: String,
    required:[true,'Password is required']
  },
  refreshToken: {
    type:String
  }
},
  {
    timestamps: true
  }
)


//We are hashing the password just before storing it and using the pre middleware
userSchema.pre("save", async function (next) {//use function not callback as call back does not provide us with .this
  if (!this.isModified("password")) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)//hasing the password and 10 is the number of rounds
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  console.log("enteredPassword:", password);
  console.log("storedPassword:", this.password);
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
      {
        _id: this._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
}

export const User=mongoose.model("User",userSchema)