const express = require('express');
const router = express.Router();
const Users  = require('../DALs/usersDAL')
const jwt = require('jsonwebtoken')
const {check ,validationResult} = require('express-validator')
const axios = require('axios')

router.route('/signup').
            post( async function(req,resp){
               const {Username,Password} = req.body;
                  console.log(req.body)
                  // validate user input
               const errors = validationResult(req)
               console.log(errors)
               if(!errors.isEmpty())
                  resp.status(400).json({
                     errors : errors.array(),
                  })

                        //get ALL Users
                     let users = await Users.getUsers();
                      //Check if user Exists
                      let user = users.filter( item => item.Username == Username
                        && item.Password == Password)
                           

                      if(user)
                       {
                        let accessToken =  await jwt.sign({},"mysecret",
                        {expiresIn:7200})

                        resp.json({token:accessToken ,user:user, auth:true})
                        
                       }
                       else{
                        resp.json({auth:false, msg:"User Does not Exist"})
                        
                       }
                       
                        
                     
            })
router.route('/signin').
            post( [
               check("password","Password length must be 5 chars at least").isLength({min:5}),
            ], async function(req,resp){
               
            const {username,password} = req.body;

               //Get ALL Users From API server
             let users = await Users.getUsers();
             let user = users.find( item => item.Username == username 
               && item.Password == password);

             if(!user){
               
               let accessToken = jwt.sign({id : user._id},"mysecret",
               {expiresIn:user.SessionTimeOut})
               resp.json({
                  auth:true , token:accessToken
               })
             }
             else{
               
               resp.json({
                  auth:false, msg:"User Already Exist"
               })
             }
                
                
            })
module.exports = router ;