const express = require('express');
const UsersBL = require('../BLs/UsersBL');

const router = express.Router();


router.route('/addUser').
            post(  async function(req,resp){
                let addUser = await UsersBL.AddnewUser(req.body);
                return resp.json(addUser)
            })
router.route('/').
            get(  async function(req,resp){
                let getUsers = await UsersBL.getAllUsers();
                return resp.json(getUsers)
            })
router.route('/:id').
            delete(  async function(req,resp){
                 let id = req.params.id
                let getUsers = await UsersBL.deleteUser(id);
                return resp.json(getUsers)
            })

module.exports = router ;