import React, { useState } from 'react'
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const paperStyle = { padding: 20, width: 300, margin: "0 auto" ,height:"40vh",margin:'40px auto' }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 30 }
    const navigate = useNavigate();
    const[Error,setError] = useState("")
    const dispatch = useDispatch();

    const [inputValue,setinputValue] = useState({
        Username :"",
        Password : "",
    })

    const HandleInput = (e) =>{
            setinputValue({...inputValue,[e.target.name] : e.target.value})
    }
    
    const checkUser = async (e) =>{
        
        e.preventDefault();

        let resp = await axios.post("http://localhost:5000/auth/signup",inputValue)
        let token = resp.data.token;
        if(token){
            localStorage.setItem("userAuth",JSON.stringify({user:resp.data.user , token:token}))
           
            dispatch({type:"LOGIN" , payload : token})

           navigate("/main")
        }
        else{
            setError(resp.data.msg)
            console.log(Error)
        }

    }
    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                      
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form onSubmit={checkUser}>
                    <TextField fullWidth label='Username' name='Username' onChange={HandleInput} autoComplete='off' />
                    <TextField fullWidth  label='Password' name='Password' onChange={HandleInput} autoComplete='off'/>
                    
                    {/*<FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="I accept the terms and conditions."
    />*/}
                    <Button type='submit' variant='contained' color='primary' style={marginTop}  fullWidth>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;