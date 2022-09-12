import React, { useRef,useEffect, useState } from 'react'
import axios from 'axios'
import {useSelector , useDispatch} from 'react-redux'
import MovieComp from './MovieComp';
import { useNavigate } from 'react-router-dom';
import './Movies.css'
import { Button, Container, Grid ,TextField } from '@mui/material';
import Stack from '@mui/material/Stack';

function AllMovies() {

  const [addmoviePermission,setaddmoviePermission] = useState(false)
  const movies = useSelector(state=>state.movies);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterMovies , setfilterMovies] = useState();
  const [isFiltered, setisFiltered] =useState(false)
   
   
 const moviesFilter = (val) =>{
  
      const filter = movies.filter( movie => movie.Name.toLowerCase().includes(val.toLowerCase()))
      setfilterMovies(filter)
    
      setisFiltered(true)
   
 }
    useEffect(()=>{
      setaddmoviePermission(
        JSON.parse(localStorage.getItem("userAuth")).user[0].Permissions.some(
          item => item == 'Create Movies' 
        )
      )
    },[])
    useEffect(()=>{
             let isLoading = true;

          const getAllMovis = async ()=>{
            
                let resp = await axios.get("http://localhost:4000/api/movies/")
                
                if (isLoading){
                dispatch({type:"ADD_ALL_MOVIES" , payload: resp.data})
                }       
          }
          
          getAllMovis();
          
          return () =>{
            isLoading = false;
          }
       
       
      
    },[])
  return (
    <Container maxWidth="xl" >
     
    <Stack direction="row" justifyContent="space-between" style={{margin:"20px 0 20px 0"}}>
      {
        addmoviePermission && 
         <Button variant='contained' color='primary' style={{margin:"10px 5px 0 0"}} onClick={()=>navigate("/main/movies/addmovie")}>Add Movie</Button>
      } 
          <TextField id="outlined-basic" label="Search..." variant="outlined" autoComplete='off' 
              onChange={(e)=>moviesFilter(e.target.value)} />
    </Stack>
  
    <Grid container spacing={2} >
      {
        isFiltered  ? filterMovies.map((item ,key) => {
          return <MovieComp key={key} id={item._id} genres={item.Genres} premiered={item.Premiered} image={item.Image} 
          rating={item.Rating} name={item.Name} language={item.Language}/>
        })
      
      : movies.map((item ,key) => {
        return <MovieComp key={key} id={item._id} genres={item.Genres} premiered={item.Premiered} image={item.Image}
        rating={item.Rating}  name={item.Name} language={item.Language}/>
      })
      }
     
    </Grid>
    
  
      
    
    
    
      
    </Container>
  )
}

export default AllMovies