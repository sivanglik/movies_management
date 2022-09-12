const MembersModel = require('../models/MembersModel')
const DALs = require('../DALs/DALs')

const getAllMembers = () =>{
    let members = []
    return new Promise ((resolve,reject) =>{
        
        MembersModel.find({}, async function(err,data){
            if(err)
                reject(err)
            
            else{
                if(data.length == 0)
                {
                    let resp = await DALs.usersData();
                     resp.data.slice(0,10).map( member =>{
                        let obj = {}
                        obj.Name = member.name,
                        obj.Email = member.email,
                        obj.City = member.address.city,
                        members.push(obj)
                    })
                    let response  = await MembersModel.insertMany(members)
                    resolve(response)
                }
            }
            resolve(data)
        })

    })
}

const addMember = (obj) =>{

    return new Promise ((resolve,reject)=>{
        
        let member = new MembersModel({
            Name:obj.Name,
            Email:obj.Email,
            City:obj.City,
        })

        member.save( function(err){
            if(err) reject(err)

            else
                resolve(member)
            
        })
    })
}

const updateMemberById = (MemberId , obj) =>{

    return new Promise((reject,resolve)=>{
        MembersModel.findByIdAndUpdate(MemberId ,obj , function(err){
            if(err)
                reject(err)
            
        })
    })

}
const deleteMemberById = async (MemberID) =>{

    return new Promise((reject,resolve)=>{
        MembersModel.findByIdAndDelete(MemberID , async function(err){
            if(err)
                reject(err)
            
        })
    })

}
module.exports = {getAllMembers,addMember,updateMemberById,deleteMemberById}