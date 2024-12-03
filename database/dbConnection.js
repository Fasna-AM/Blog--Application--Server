const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{

    console.log("Mongodb Atlas connection successfull with blogServer");
    

}).catch(err=>{
    console.log("Mongodb connection faile");
    console.log(err);
    
    

})