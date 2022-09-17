const axios = require('axios')

const getUsers = async () =>{

    let resp = await axios.get("http://localhost:4000/api/users/")
    return resp.data;
}

const addUser = async (obj) =>{
    await axios.post("http://localhost:4000/api/users/addUser", obj)
}
module.exports ={getUsers,addUser}