import React, { useState,useEffect } from 'react'
import './Movies.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import { IconButton ,Card, Grid, Typography } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import axios from 'axios'
function MovieComp({image ,name, premiered,rating,language ,id}) {

  const navigate = useNavigate();
  const dispacth= useDispatch();
  const movieData = {}
  const movieName = {color: "#010b26",fontWeight: 600,fontSize: "18px"}
  const movieCardStyle = {maxHeight: 560,maxWidth: 300 }
  const [deletePermission,setdeletePermission] = useState(false);
  const [editPermission,seteditPermission] = useState(false)
 useEffect(() => {
     
  
  setdeletePermission(
    JSON.parse(localStorage.getItem("userAuth")).user[0].Permissions.some(
      item => item == 'Create Movies' || item == 'Delete Movies'
    )
  )

  seteditPermission(
    JSON.parse(localStorage.getItem("userAuth")).user[0].Permissions.some(
      item => item == 'Update Movies'
    )
  )
       
    
  return () => {

  };
 }, [])
 const deleteMovie = async (id) =>{
    console.log(id)
    dispacth({type:"DELETE_MOVIE" , payload:id})
    await axios.delete("http://localhost:4000/api/movies/" + id )
    

 }
  return (    

          <Grid item  xs={7} md={4} lg={3} sm={5} xl={2}  >

        <Card elevation={10} style={movieCardStyle}>
        <CardMedia component="img" width="100%" image={image}/>
          <List style={{margin:"0 5px 0 5px"}}>
          <Stack  direction="row" justifyContent="space-between" alignItems="center">
            <Typography  style={movieName}> {name}</Typography>
            <div className="ratings"><span>{rating}</span>/10</div>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" style={{marginTop:5}}>
          <div className="middle-title"><span>Premiered</span></div>
          <div className="middle-title"><span>Language</span></div>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" style={{marginTop:5}}>
          <Typography>{premiered}</Typography>
          <Typography>{language}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
              {
                editPermission &&  
                    <IconButton onClick={()=>navigate(`/main/movies/editmovie/${id}`)}>
                      <EditIcon />     
                    </IconButton>
              }
            
            
              {
                deletePermission && 
                  <IconButton onClick={()=>deleteMovie(id)}>
                      <DeleteIcon/>
                    </IconButton>
              }     
          </Stack>
            
        </List>
   
      </Card>
      </Grid>
    
  )
}

export default MovieComp