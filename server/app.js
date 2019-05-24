const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const NODE_ENV = process.env.NODE_ENV || 'development'
mongoose = require('mongoose')
//port = 27017
//dbName = HacktivOverflow
connection = process.env.CONNECTION || 'mongodb://localhost:27017/HacktivOverflow'
mongoose.connect( `${connection}`, {useNewUrlParser: true})

.catch((err)=>{
    console.log(err)
})

const index=require('./routers/index.js')
const cors= require('cors')
require('dotenv').config()



app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', index)


app.listen(port, ()=>console.log(`listening to port :${port}`))