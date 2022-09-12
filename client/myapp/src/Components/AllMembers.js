import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector ,useDispatch} from 'react-redux'
import MemberComp from './MemberComp'
import {useNavigate} from 'react-router-dom'
import {  Button, Container, Grid } from '@mui/material';
function AllMembers() {

    const [createPermision,setcreatePermision] = useState(false)
    const members = useSelector(state => state.members)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        setcreatePermision(
          JSON.parse(localStorage.getItem("userAuth")).user[0].Permissions.some(
            item => item == 'Create Subscriptions' 
          )
        )
    },[])
    
    useEffect(()=>{
     let isLoading = true;

      const fetchData = async () =>{
        
        let resp = await axios.get("http://localhost:4000/api/members/")
        if(isLoading){
            dispatch({type:"ADD_ALL_MEMBERS" , payload : resp.data})
        }
      }
      
      fetchData();

      return () =>{
        isLoading = false;
      }
    },[])
  return (
        
         <Container maxWidth="xl">
           {
              createPermision &&  <Button onClick={()=>{navigate('/main/Subscriptions/AddMember')}} variant='contained' style={{margin:"20px 0 20px 0"}}>Add Member</Button>
           } 
              <Grid container spacing={2} style={{marginTop:"10px"}}   >
                {
                  members.map(member=>{
                    return <MemberComp key={member._id} id={member._id} name={member.Name}
                      email={member.Email} city={member.City}/>
                  })
                }
                </Grid>
           
                </Container>
  )
}

export default AllMembers