const {create,getUser,getUserById,updateUser,deleteUser,getuserbyname} =require('./user.service'); 
const bcrypt = require('bcrypt');
const {sign}=require('jsonwebtoken');

module.exports ={

    createUser:(req,res) =>{
        const body=req.body;
        console.log(body);
        const salt = bcrypt.genSaltSync(10);
        body.password=bcrypt.hashSync(body.password, salt);
        create(body,(err,reeult)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                message:'user create successfully'
            })
        });
    },

    getUsers:(req,res) =>{
        getUser((err,result)=>{

            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"can't found users"
                });
            }
            return res.status(200).json({
                success:1,
                message:"users found",
                data:result
            })
        });
    },

    getUsersById:(req,res) =>{
        const id=req.params.id;
        getUserById(id,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"can't found user"
                });
            }
            return res.status(200).json({
                success:1,
                message:'record found',
                data:result
            })
        })
    },

    updateUser:(req,res) =>{

        const body=req.body;
        console.log(body);
        const salt = bcrypt.genSaltSync(10);
        body.password=bcrypt.hashSync(body.password, salt);
        updateUser(body,(err,reeult)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                message:'update record successfully'
            });
        });

    },
    deleteUser:(req,res) =>{
        const body=req.body;
        deleteUser(body.id,(err,reeult)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message:"record not found"
                });
            }
            return res.status(200).json({
                success:1,
                message:'delete record successfully'
            });
        });
    },

    login:(req,res) =>{

        const body=req.body;
        getuserbyname(body.name,(err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.status(500).json({
                    success:0,
                    message:"invalid name or password."
                });
            }
            console.log(results[0].password);
            const temp_boolean=bcrypt.compareSync(body.password,results[0].password);
            if(temp_boolean){
                results[0].password =undefined;
                const jsontoken=sign({result:results[0]},"adminkey",{
                    expiresIn:"1h"
                });
                return res.status(200).json({
                    success:1,
                    message:"login successfully",
                    token:jsontoken
                })
            }
            else{
                return res.status(500).json({
                    success:0,
                    message:"invalid name or password."
                });
            }
        });

    }


};