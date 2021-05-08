const express = require ('express')
const cors = require('cors')
const morgan = require('morgan')
const pkg = require('../package.json')
const app = express()

app.set('pkg',pkg)
app.set('port', process.env.PORT || 4000)
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req,res) =>{
    res.json({
        autor: app.get('pkg').author,
        nombre: app.get('pkg').name,
        descripcion: app.get('pkg').description,
        version: app.get('pkg').version
    })
})
app.use('/api/v1',require('./routes/user.routes'))
app.use('/api/v1/auth',require('./routes/auth.routes'))
module.exports = app;