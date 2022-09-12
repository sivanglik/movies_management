import React,{useState} from 'react'
import {Grid, TextField, Paper, Avatar,Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import axios from 'axios'
function AddMember() {
    const navigate = useNavigate();
    const [newMember,setnewMember] = useState({
        Name : "",
        Email : "",
        City : "",
      });

      const AddMemberToDB = async (e) =>{
            e.preventDefault();
            await axios.post("http://localhost:4000/api/members/addMember", newMember)
            navigate('/Members')
      }
  return (
    <div>
        <Grid>
          <Paper elevation={20} style={{ width:"450px",padding:"20px 10px" ,margin:"20px auto" ,background:"#f9f9f9"}}>
            <Grid align='center'>

           
            <PermIdentityIcon fontSize='large' style={{margin:"auto"}}/>
              <h2 style={{textAlign:"center", margin:"20px 0 10px 0"}}>Add Member</h2>
              </Grid>
              <form onSubmit={AddMemberToDB}>
                      <TextField fullWidth label="Name" onChange={(e)=>setnewMember({...newMember,Name:e.target.value})} required/>
                      <TextField fullWidth label="Email" onChange={(e)=>setnewMember({...newMember,Email:e.target.value})} required />
                      <TextField fullWidth label="City" onChange={(e)=>setnewMember({...newMember,City:e.target.value})} required/>
                      
                    <div>
                    <Button type='submit' variant='contained' color='primary' style={{margin:"10px 5px 0 0"}}>Add Member</Button>
                    <Button  variant='contained' color='primary' style={{margin:"10px 5px 0 0"}} onClick={()=>{navigate('/main/Subscriptions')}}>Cancel</Button>
                    </div>
                    
                </form>
          </Paper>
       </Grid>
    </div>
  )
}

export default AddMember