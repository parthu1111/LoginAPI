require('dotenv').config();
const express=require('express');
const app=express();
const userRouter=require('./API/user/user.router');

app.use(express.json());
app.get('/',(req, res) => {
    res.json({data:"server perfactly running"});
})
app.use('/api/user',userRouter);



app.listen(process.env.APP_PORT,(err)=>{
    if(err) throw err;
    console.log('listening server on port parth : '+process.env.APP_PORT);
})