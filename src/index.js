import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";


dotenv.config({
  path:'./env'
})

connectDB()//connectDB is wrapped by try catch so it will definetely return a promise.
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log('mongo db connection failed in index.js',err);
})