const {verify}=require('jsonwebtoken');

module.exports={
    checkToken:(req,res,next) => {
        token=req.get('authorization');
        if(token){
            token=token.slice(7);
            verify(token,"adminkey",(err,decode)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: 'invalid token'
                    });
                }
                else{
                    next();
                }
            });
        }
        else{
            res.json({
                success: 0,
                message: 'access denie unauthorized user'
            });
        }
    }
}