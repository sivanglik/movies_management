import {  Grid } from '@mui/material';
import React ,{useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import axios from 'axios'
import UserComp from './UserComp';
import {Button} from'@mui/material'
import { Container } from '@mui/system';

function UserManagement() {

    const btnstyle = {margin:20}
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)

    useEffect(() => {
      
      const fetchData = async () =>{
        try{
          let resp = await axios.get("http://localhost:4000/api/users/")
          dispatch({type:"ADD_ALL_USERS" , payload: resp.data})
          console.log(users)
        }
        catch(err){
          console.log(err)
        }
      }

      fetchData();
      
    }, [])
  return (
    <Container maxWidth="xl">
      
        <Button variant='contained' color='primary' style={{margin:"20px 0px 20px 0"}}  onClick={()=>navigate('/main/UserManagement/adduser')}>Add User</Button>
         
            <Grid container spacing={3}>
              {
                users.map(user =>{
                  return <UserComp username={user.Username} password={user.Password} id={user._id}
                        sessiontimeout = {user.SessionTimeOut} permissions={user.Permissions} />
                })
              }
            </Grid>
                
    </Container> 
  )
}

export default UserManagement