const pool=require('../../config/database');

module.exports ={

    create:(data,callback) =>{
        pool.query(
            'insert into user_table (name,password) values(?,?)',
            [data.name,
            data.password],
            (err, result) =>{
                if(err){
                    return callback(err);
                }
                else{
                    return callback(null, result);
                }
            }
        );
    },


    getUser:callback=>{
        pool.query(
            'select * from user_table',
            [],
            (err, result) =>{
                if(err){
                    return callback(err);
                }
                return callback(null,result);
            }
        );
    },

    getUserById:(id,callback)=>{

        pool.query(
            'select * from user_table where user_id=?',
            [id],
            (err, result) =>{
                if(err){
                    return callback(err);
                }
                return callback(null,result);
            }
        );
    },

    updateUser:(data, callback)=>{

        pool.query(
            'update user_table set name=? , password=? where user_id=?',
            [data.name,data.password,data.id],
            (err, result) =>{
                if(err){
                    return callback(err);
                }
                return callback(null,result);
            }
        );
    },

    deleteUser:(id, callback)=>{

        pool.query(
            'delete from user_table where user_id=?',
            [id],
            (err, result) =>{
                if(err){
                    return callback(err);
                }
                return callback(null,result);
            }
        );
    },

    getuserbyname:(name,callback)=>{
        pool.query(
            'select * from user_table where name=?',
            [name],
            (err, result) =>{
                
                if(err){
                    return callback(err);
                }
                return callback(null,result);
            }
        );
    }

};