import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express()
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials:true
}))

app.use(express.json({ limit: "16kb" }))//can only receive these amount of json data
app.use(express.urlencoded({extended:true,limit:"16kb"}))//configuration for the url as the url generally converts space and other special sybols to %20 or any other things
app.use(express.static("public"))//used to store static files(like image, video) in public

app.use(cookieParser()); // To parse(it means converting it into a usable format like an object) cookies sent by the client (browser) so they can be accessed on the server via req.cookies

export { app };
