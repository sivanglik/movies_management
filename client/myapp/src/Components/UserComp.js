import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardHeader, Grid, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useDispatch} from 'react-redux'
import axios from 'axios'
function UserComp({username,sessiontimeout,permissions,id}) {
  
  const cardstyle ={height: 240}
  const dispatch = useDispatch();

    

   const DeleteUser =  async (id) =>{
       await axios.delete("http://localhost:4000/api/users/" + id)
       dispatch({type:"DELETE_USER" , payload : id})
   }
  return (
      <Grid item xs={12} md={6} lg={4}>

            <Card elevation={3} style={cardstyle}>
                    <CardHeader action={
                        <IconButton >
                            <DeleteOutlineIcon onClick={()=>DeleteUser(id)} />
                        </IconButton>
                    }
                        title={username}
                        
                        subheader={username == 'admin' ? "admin" : "user" }
                    />
                    <CardContent>
                        
                            <Typography variant="body1" >
                                    Session Time Out : {sessiontimeout} <br/>
                                    Permissions :{permissions.length !=0 ? 
                                    permissions + " " : "There are NO permissions"}
                            </Typography> 
                        
                        
                    </CardContent>
             </Card>
             </Grid>
    
  )
}

export default UserComp