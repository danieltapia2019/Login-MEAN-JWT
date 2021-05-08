const mongoose = require ( 'mongoose')

mongoose.connect("mongodb://localhost/mean-login",{
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true
})
.then(()=> console.log("Db is connected")) 
.catch((err) => console.log("Error",err))