const jwt = require('jsonwebtoken')

const jwtMiddleware = (req,res,next)=>{
    console.log('Inside jwtMiddleware');
    const token = req.headers["authorization"].split(" ")[1]
    if(token){
        try{
            const jwtResponse = jwt.verify(token,process.env.JWTPASSWORD)
            req.authorId =jwtResponse.authorId
            next()

        }catch(err){
            res.status(401).json(err)
        }

    }else{
        res.status(404).json("Autherisation failed.....Token Missed!!!")
    }
    
}

module.exports = jwtMiddleware