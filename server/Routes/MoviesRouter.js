const express = require('express');
const MoviesBL = require('../BLs/MoviesBL');

const router = express.Router();

router.route('/').
            get(  async function(req,resp){
                let movies =  await MoviesBL.getMoviesFromWS();
                return  resp.json(movies)
            })

router.route('/:id').
            get(  async function(req,resp){
                
                let movie =   await MoviesBL.getMovieById(req.params.id);
                return resp.json(movie)
            })
router.route('/:id').
            delete(  async function(req,resp){
                
                let movie = await MoviesBL.deleteMovieById(req.params.id);
                return resp.json(movie)
            })
router.route('/:id').
            put(  async function(req,resp){
                console.log(req.body ,req.params.id)
                let movie = await MoviesBL.updateMovieById(req.params.id , req.body);
                
                return resp.json(movie)
            })
router.route('/').
            post(  async function(req,resp){
                console.log(req.body)
                await MoviesBL.addNewMovie(req.body);
                return resp.json("newMovie")
            })

module.exports = router ;