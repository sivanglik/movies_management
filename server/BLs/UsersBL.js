const UsersSchema = require('../models/UsersModel')

const getAllUsers = () =>{

    return new  Promise ((resolve,reject) =>{
        
        UsersSchema.find({}, function(err,data){
            if(err) reject(err)
            else
                resolve(data)
        })
    })
}
const AddnewUser = async (obj) =>{
    return new Promise ((resolve,reject) =>{

        let newUser = new UsersSchema({
            Username : obj.Username,
            Password : obj.Password,
            SessionTimeOut : obj.SessionTimeOut,
            Permissions : obj.Permissions,
        })
        
            newUser.save( function(err){
                if(err) reject(err)

                else
                    resolve(newUser)
                
            })
        
            
        
    })
    
}
const deleteUser = (id) =>{
    
    return new Promise ((resolve,reject)=>{

        UsersSchema.findByIdAndDelete(id, async function(err){
            if(err)
                reject(err)

                else    
                    resolve("user Deleted")
        })
    })
}

module.exports = {AddnewUser ,getAllUsers ,deleteUser}