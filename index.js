
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/routes')
require('./database/dbConnection')

const blogServer = express()

blogServer.use(cors())
blogServer.use(express.json())
blogServer.use(router)
blogServer.use('/uploads',express.static('./uploads')) 

const PORT = 3000 || process.env.PORT

blogServer.listen(PORT,()=>{
    console.log(`blogserver listening to port ${PORT}`);
    
})
 
blogServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>blogServer listening to the port and waiting for requiest</h1>`)
})