import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

//We first store the upload file on server and then send it to the cloudinary. We send the url to the cloudinary where the file is stored and cloudianry take that file from server and then we need to remove the file from server.

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {

  try {
    
    if (!localFilePath) return null;
    // console.log("Uploading to Cloudinary:", localFilePath);

    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    //console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    return null;
  }
};

export { uploadOnCloudinary };