import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Movies.css'
import axios from 'axios'
import {Grid, TextField, Paper,Button } from '@material-ui/core'
function AddMovie() {
    const navigate = useNavigate();
    const [addmovie , setaddmovie] = useState({
        Name:"",
        Image:"",
        Premiered:"",
        Rating:"",
        Language:"",
    });
    const HandleInput = (e) =>{
            setaddmovie({...addmovie,[e.target.name] : e.target.value})
    }
    const HandleSubmit =  async (e) =>{
        e.preventDefault();
        console.log(addmovie)
       await axios.post("http://localhost:4000/api/movies/", addmovie)
       navigate('/main/movies')
}
  return (
       
        <Grid>
          <Paper elevation={20} style={{ width:"450px",padding:"20px 10px" ,margin:"20px auto" ,background:"#f9f9f9"}}>
            <Grid align='center'>

           
            
              <h2 style={{textAlign:"center", margin:"20px 0 10px 0"}}>Add Movie</h2>
              </Grid>
              <form onSubmit={HandleSubmit} >
                      <TextField fullWidth name="Name" label="Name" onChange={HandleInput} required/>
                      <TextField fullWidth name="Image" label="Image" onChange={HandleInput}  />
                      <TextField fullWidth name="Premiered" label="Premiered" onChange={HandleInput} required/>
                      <TextField fullWidth name="Rating" label="Rating" onChange={HandleInput} required/>
                      <TextField fullWidth name="Language" label="Language" onChange={HandleInput} required />
                      
                    <div>
                    <Button type='submit' variant='contained' color='primary' style={{margin:"10px 5px 0 0"}} >Add Movie</Button>
                    <Button  variant='contained' color='primary' style={{margin:"10px 5px 0 0"}} onClick={()=>{navigate('/main/movies')}}>Cancel</Button>
                    </div>
                    
                </form>
          </Paper>
       </Grid>
            
        
    
  )
}

export default AddMovie