const User = require('../models/User')

const signOperations={}

signOperations.checkExistingUser = async (req,res,next) =>{
    //checkear username existente
    const userFound = await User.findOne({username: req.body.username})
    if(userFound) return res.status(400).json({message: "El nombre de usuario ya esta en uso."})
    //checkear email existente
    const email = await User.findOne({email: req.body.email})
    if(email) return res.status(400).json({message: "Este correo ya se encuentra en uso."})

    //continua con la creacion del user
    next()

}

module.exports= signOperations