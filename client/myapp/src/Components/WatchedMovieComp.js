import React, { useState,useEffect } from 'react'
import { Stack, Typography } from '@mui/material'

function WatchedMovieComp({movieName}) {
  
  return (
    <div>
        <Stack direction="row" alignItems="center" >
            
            <p >{movieName}</p> 
            
        </Stack>
    </div>
  )
}

export default WatchedMovieComp