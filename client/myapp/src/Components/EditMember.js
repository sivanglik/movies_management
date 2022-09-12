import React ,{useState}from 'react'
import {Grid, TextField, Paper,Button } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


function EditMember() {
    const params = useParams();
    const navigate = useNavigate();
    const members = useSelector(state=>state.members)
    const memberToEdit = members.filter(member=>  member._id === params.id)
    const [editMember,seteditMember] = useState({
      Name:"",
      Email:"",
      City:"",

})
    const Edit = async (e) =>{
        e.preventDefault();
        await axios.put("http://localhost:4000/api/members/" + params.id , editMember)
        navigate('/main/Subscriptions')
    }
  return (
    <div>
        <Grid>
          <Paper elevation={20} style={{ width:"450px",padding:"20px 10px" ,margin:"20px auto" ,background:"#f9f9f9"}}>
            <Grid align='center'>

           
            
              <h2 style={{textAlign:"center", margin:"20px 0 10px 0"}}>Edit {memberToEdit[0].Name}</h2>
              </Grid>
              <form onSubmit={Edit}>
                      <TextField fullWidth label="Name" onChange={(e)=>seteditMember({...editMember,Name:e.target.value})} required/>
                      <TextField fullWidth label="Email" onChange={(e)=>seteditMember({...editMember,Email:e.target.value})} required />
                      <TextField fullWidth label="City" onChange={(e)=>seteditMember({...editMember,City:e.target.value})} required/>
                     
                      
                    <div>
                    <Button type='submit' variant='contained' color='primary' style={{margin:"10px 5px 0 0"}} >Edit Member</Button>
                    <Button  variant='contained' color='primary' style={{margin:"10px 5px 0 0"}} onClick={()=>{navigate('/main/Subscriptions')}}>Cancel</Button>
                    </div>
                    
                </form>
          </Paper>
       </Grid>
    </div>
  )
}

export default EditMember