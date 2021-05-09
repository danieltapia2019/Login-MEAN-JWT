import {Schema,model} from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username:{
        type: String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps: true,
    versionKey: false
})

//Encriptar contraseña
userSchema.statics.encryptPass =  async (password) =>{
    const salt = await  bcrypt.genSalt() //aplicar algoritmo
    return  await bcrypt.hash(password,salt)

}
//Comparar contraseña encriptada
userSchema.statics.comparePass = async (pass,hash) =>{
   return await bcrypt.compare(pass, hash)
}
module.exports = model('User',userSchema)