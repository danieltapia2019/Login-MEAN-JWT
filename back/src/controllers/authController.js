import config from '../config'
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authController={}
authController.signUp = async (req,res) =>{
    const{username,email,password} = req.body;
    
    const newUser = new User({
        username,
        email,
        password: await User.encryptPass(password) //encriptar pass
    })
    const savedUser = await newUser.save()
    const token = jwt.sign({
        id: savedUser._id,
        username: savedUser.username,
        email:savedUser.email},config.SECRET,{
        expiresIn:60
    })
    
    res.status(200).json({message: "created",token})

}

authController.signIn = async (req,res) =>{
    const {username,password} = req.body
    //buscamos por email o username en una sola query
    const userFound = await User.findOne({$or:[{email:username},{username:username}]})
    //existe
    if(userFound){
        const match = await User.comparePass(password,userFound.password)
        //Contraseña correcta
        if(match){
            const token = jwt.sign({
                id: userFound._id,
                username: userFound.username,
                email:userFound.email},config.SECRET,{
                expiresIn:60
            })
            return res.status(200).json({message:"Usuario logueado",token})
        }
        //Contraseña incorrecta
        else{
            return res.status(400).json({message:"Contraseña incorrecta"})
        }
    //No existe
    }else{
        return res.status(400).json({message: "Usuario no existente"})
    }
}

module.exports = authController