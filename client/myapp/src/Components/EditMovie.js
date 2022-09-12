import React ,{useState}from 'react'
import {Grid, TextField, Paper,Button } from '@material-ui/core'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';


function EditMovie() {
    const params = useParams();
   
    const navigate = useNavigate();
    const movies = useSelector(state=>state.movies)
    const movieToEdit = movies.filter(movie=>  movie._id === params.id)
    const [editMovie,seteditMovie] = useState({
    Name: "",
    Image: "" ,
    Premiered:"",
    Rating:"",
    Language:"", 
    })
    const Edit = async (e) =>{
        e.preventDefault();
        await axios.put("http://localhost:4000/api/movies/" + params.id , editMovie)
        navigate("/movies")
    }
  return (
    <div>
        <Grid>
          <Paper elevation={20} style={{ width:"450px",padding:"20px 10px" ,margin:"20px auto" ,background:"#f9f9f9"}}>
            <Grid align='center'>

           
            
              <h2 style={{textAlign:"center", margin:"20px 0 10px 0"}}>Edit {movieToEdit[0].Name}</h2>
              </Grid>
              <form onSubmit={Edit}>
                      <TextField fullWidth label="Name" onChange={(e)=>seteditMovie({...editMovie,Name:e.target.value})} required/>
                      <TextField fullWidth label="Image" onChange={(e)=>seteditMovie({...editMovie,Image:e.target.value})}  />
                      <TextField fullWidth label="Premiered" onChange={(e)=>seteditMovie({...editMovie,Premiered:e.target.value})} required/>
                      <TextField fullWidth label="Rating" onChange={(e)=>seteditMovie({...editMovie,Rating:e.target.value})} required/>
                      <TextField fullWidth label="Language" onChange={(e)=>seteditMovie({...editMovie,Language:e.target.value})} required />
                      
                    <div>
                    <Button type='submit' variant='contained' color='primary' style={{margin:"10px 5px 0 0"}} >Edit Movie</Button>
                    <Button  variant='contained' color='primary' style={{margin:"10px 5px 0 0"}} onClick={()=>{navigate('/main/movies')}}>Cancel</Button>
                    </div>
                    
                </form>
          </Paper>
       </Grid>
    </div>
  )
}

export default EditMovie