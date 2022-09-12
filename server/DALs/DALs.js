const axios = require('axios')

const usersData = () =>
{
    return axios.get('https://jsonplaceholder.typicode.com/users');
}

const moviesData =  () => 
{
    return axios.get('https://api.tvmaze.com/shows');
} 
module.exports= {usersData , moviesData} 