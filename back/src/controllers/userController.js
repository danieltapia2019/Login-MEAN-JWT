const jwt = require('jsonwebtoken')
const userCtrl={}

const Users = require('../models/User')

userCtrl.getAll = async (req, res) => {
    const users = await Users.find()
    res.json(users)
}
userCtrl.signUp = async (req,res) => {
    const {email,password} = req.body
    const newUser = new Users({email,password})
    await newUser.save();
    const token = jwt.sign({_id:newUser._id},'clave')

    res.status(200).json({token: token})
}
userCtrl.signIn = async (req,res) =>{
    const { email,password} = req.body
    const user = await Users.findOne({email})
    if(user){
        if(user.password !== password){
            return res.status(401).json({message: "Contraseña incorrecta"})
        }
        const token = jwt.sign({_id: user._id},'clave')
        res.status(200).json({token: token})

    }
    else{
        return res.status(401).json({message: "El correo no existe"})
    }
}

module.exports = userCtrl