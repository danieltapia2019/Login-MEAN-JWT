import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import pkg from "../package.json"

const app = express()

//settings
app.set('pkg',pkg)
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.get('/', (req,res) =>{
    res.json({
        autor: app.get('pkg').author,
        nombre: app.get('pkg').name,
        descripcion: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

app.use('/api/v1/auth',require('./routes/auth.routes'))

module.exports = app;