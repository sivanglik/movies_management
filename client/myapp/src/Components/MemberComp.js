import React ,{useState,useEffect} from 'react'
import Card from '@mui/material/Card';
import {useNavigate} from 'react-router-dom'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader, Grid, IconButton, List, Stack } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import EditIcon from '@mui/icons-material/Edit';
import WatchedMovieComp from './WatchedMovieComp';
import axios from 'axios';

function MemberComp({id, name, email, city}) {
        
        const navigate = useNavigate();
        const cardstyle = {display:"flex",alignItems:"center"
        ,flexDirection:"column",textAlign:"center" ,maxHeight:"500px"}
        const [watchedMovie,setwatchedMovie] = useState({
                idMember : id,
                movieName:"",
                memberName: name,
                Date: Date.now(),
        })
        
        const [editPermission,seteditPermission] =useState(false)
        const [deletePermission,setdeletePermission] =useState(false)
        const movies = useSelector(state=>state.movies)
        const watchedMovies = useSelector(state=>state.watchedMovies)
        const dispatch = useDispatch();
        const HandleChange = (event) =>{
                setwatchedMovie({...watchedMovie,movieName:event.target.value})
                dispatch({type:"ADD_WATCHED_MOVIE" , payload:watchedMovie})
                
        }

        const deleteMember =  async (id) =>{
                dispatch({type:"DELETE_MEMBER" , payload : id})
                await axios.delete("http://localhost:4000/api/members/" + id)
                
            }
        useEffect(() => {
                setdeletePermission(
                    JSON.parse(localStorage.getItem("userAuth")).user[0].Permissions.some(
                      item => item == 'Create Subscriptions' || item == 'Delete Subscriptions'
                    )
                  )

                  seteditPermission(
                        JSON.parse(localStorage.getItem("userAuth")).user[0].Permissions.some(
                          item => item == 'Update Subscriptions'
                        )
                      )
            }, [])
  return (
    <Grid item xs={7} md={5} lg={4} sm={6} style={{margin:"0 auto" }} >
                
            <Card elevation={10}  style={cardstyle}>
                   <Stack direction="row"  justifyContent="space-between" >
                    {
                        deletePermission &&  <IconButton onClick={()=>deleteMember(id)} >
                                                <DeleteOutlineIcon />  
                                             </IconButton>

                    }
                    {
                          editPermission &&    <IconButton onClick={()=>navigate(`/main/Subscriptions/${id}`)}>
                                                <EditIcon />     
                                              </IconButton>
                    }
                                
                    
                   </Stack>                   
               
                    <CardHeader  title={name}/>
                    <CardContent>
                    
                            <Typography paragraph  >
                                Email : {email}<br/>
                                City : {city}      
                            </Typography> 
                            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                                <InputLabel id="demo-select-small">Subscribe</InputLabel>
                                <Select  onChange={HandleChange} value={movies}
                                labelId="demo-select-small"
                                id="demo-select-small"
                                
                                 >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        {
                                        movies.map(movie =>
                                                 <MenuItem value={movie.Name} >{movie.Name}</MenuItem>)
                                        }
                                        
                                </Select>
                                </FormControl>
                                 <List>

                                        <Typography>Movies Subscribed :</Typography>
                                        {
                                                
                                                watchedMovies.map(item=>{
                                                        if(item.idMember === id){
                                                                return <WatchedMovieComp  movieName={item.movieName} date={item.Date}/>
                                                        }
                                                                
                                                })
                                        }
                  
                                </List>
                              
                    </CardContent>
                                        
                                        
             </Card>
             </Grid>
  )
}

export default MemberComp