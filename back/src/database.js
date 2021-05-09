import mongoose from "mongoose"

const URI = process.env.MONGO_DB_URI || "mongodb://localhost/mean-login"
mongoose.connect(URI,{
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true
})
.then(()=> console.log("Db is connected")) 
.catch((err) => console.log("Error",err))