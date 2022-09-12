import React, { useState } from 'react'
import './Users.css'
import {Grid, TextField, Paper, Avatar,Button } from '@material-ui/core'
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function UserManagement() {
  const navigate = useNavigate();
  const [newUser,setnewUser] = useState({
    Username : "",
    Password : "",
    SessionTimeOut : "",
    Permissions : [],
  });

  const HandleChange = (e) =>{
    if(newUser.Permissions.includes(e)){
      let index = newUser.Permissions.indexOf(e)
      newUser.Permissions.splice(index,1)
    }
    else
      newUser.Permissions.push(e)

    console.log(newUser)
  }
  const AddUserToDB = async (e) =>{
      e.preventDefault();
      await axios.post("http://localhost:4000/api/users/addUser", newUser)
      navigate('/main/UserManagement')
  }
  return (
       <Grid>
          <Paper elevation={20} style={{ width:"450px",padding:"20px 10px" ,margin:"20px auto" ,background:"#f9f9f9"}}>
            <Grid align='center'>

           
            <Avatar style={{margin:"auto"}}/>
              <h2 style={{textAlign:"center", margin:"20px 0 10px 0"}}>Add User</h2>
              </Grid>
              <form onSubmit={AddUserToDB}>
                      <TextField fullWidth label="Username" onChange={(e)=>setnewUser({...newUser,Username:e.target.value})} required/>
                      <TextField fullWidth label="Password" onChange={(e)=>setnewUser({...newUser,Password:e.target.value})} required />
                      <TextField fullWidth label="Session Time Out" onChange={(e)=>setnewUser({...newUser,SessionTimeOut:e.target.value})} required/>
                      <FormControl component="fieldset">
                            <FormLabel component="legend" >Permissions:</FormLabel>
                            <FormGroup aria-label="position" >
                            <FormControlLabel value="View Subscriptions" control={<Checkbox />} label="View Subscriptions" labelPlacement="end" onChange={(e)=>HandleChange(e.target.value)} />
                            <FormControlLabel value="Create Subscriptions" control={<Checkbox />} label="Create Subscriptions" labelPlacement="end" onChange={(e)=>HandleChange(e.target.value)}/>
                            <FormControlLabel value="Delete Subscriptions" control={<Checkbox />} label="Delete Subscriptions" labelPlacement="end" onChange={(e)=>HandleChange(e.target.value)}/>
                            <FormControlLabel value="Update Subscriptions" control={<Checkbox />} label="Update Subscriptions" labelPlacement="end" onChange={(e)=>HandleChange(e.target.value)}/>
                            <FormControlLabel value="View Movies" control={<Checkbox />} label="View Movies" labelPlacement="end" onChange={(e)=>HandleChange(e.target.value)}/>
                            <FormControlLabel value="Create Movies" control={<Checkbox />} label="Create Movies" labelPlacement="end" onChange={(e)=>HandleChange(e.target.value)}/>
                            <FormControlLabel value="Delete Movies" control={<Checkbox />} label="Delete Movies" labelPlacement="end" onChange={(e)=>HandleChange(e.target.value)}/>
                            <FormControlLabel value="Update Movies" control={<Checkbox />} label="Update Movies" labelPlacement="end" onChange={(e)=>HandleChange(e.target.value)}/>
                            </FormGroup>
                      </FormControl>
                    <div>
                    <Button type='submit' variant='contained' color='primary' style={{marginRight:"5px"}}>Add User</Button>
                    <Button  variant='contained' color='primary' onClick={()=>{navigate('/main/UserManagement')}}>Cancel</Button>
                    </div>
                    
                </form>
          </Paper>
       </Grid>
     
  )
}

export default UserManagement

                  


                 