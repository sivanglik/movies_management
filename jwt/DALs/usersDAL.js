const axios = require('axios')

const getUsers = async () =>{

    let resp = await axios.get("http://localhost:4000/api/users/")
    return resp.data;
}


module.exports ={getUsers}