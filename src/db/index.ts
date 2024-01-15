import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose
    .connect("mongodb://localhost:27017/note-app")
    .then(() => {
        console.log("Conected to DB!")
    }).catch((err) => {
        console.log("DB connection failed: ", err)
    })