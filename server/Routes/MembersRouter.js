const express = require('express');
const MembersBL = require('../BLs/MembersBL')

const router = express.Router();


router.route('/addMember').
            post(  async function(req,resp){
                let addMember = await MembersBL.addMember(req.body);
                return resp.json(addMember)
            })
router.route('/').
            get(  async function(req,resp){
                let getMembers = await MembersBL.getAllMembers();
                return resp.json(getMembers)
            })

router.route('/:id').
            put(  async function(req,resp){
                let member = await MembersBL.updateMemberById(req.params.id , req.body);
                return resp.json(member)
            })
router.route('/:id').
            delete(  async function(req,resp){   
                let member = await MembersBL.deleteMemberById(req.params.id);
                return resp.json(member)
            })
module.exports = router ;