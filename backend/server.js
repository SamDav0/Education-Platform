require("dotenv").config()

const cookieParser = require('cookie-parser');
const express =require("express")
const app=express()
const mongoose=require("mongoose")
const authRoute=require("./routes/authRoute")
const studentRoute=require("./routes/studentRoute")

app.use(express.json());
app.use(cookieParser())
mongoose.connect(process.env.MONGO_URI)// promise
.then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log("Listening for requests on port "+process.env.PORT)
})
})
.catch((error)=>{console.log(error)})

app.use("/api/auth",authRoute)
app.use("/api/student",studentRoute)