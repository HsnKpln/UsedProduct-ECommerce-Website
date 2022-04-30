import React from 'react'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'

function ProductCard(item) {
  return (
    <Grid item
    sx={{
      width: '20%'
    }}
  >
    <Paper elevation={3} style={{ height: '36.3vh' , marginBottom: '30px' }} >
      <Box
        sx={{
          paddingX: 1.25,
          paddingTop:1.25
        }}
      >
        <img 
          src={`https://bootcamp.akbolat.net${item.item.image.formats.thumbnail.url}`}
          alt=''
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingX:1.25
        }}
      >
       <Box
         sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
       >
         <Box>
         <Typography
          sx={{
            font: "normal normal bold 15px/22px Nunito",
            color: "#4B9CE2",
            opacity: 1
          }}
        >
          {item.item.brand}
        </Typography>
         </Box>
         <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              sx={{
                font: " normal normal bold 13px/22px Nunito",
                color: "#3E3E3E",
                opacity: 1
              }}
            >Renk:</Typography>
            <Typography
              sx={{
                font: " normal normal  13px/22px Nunito",
                color: "#3E3E3E",
                opacity: 1
              }}
            >{item.item.color}</Typography>
          </Box>
       </Box>
       <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
          }}
          >
             <Typography
             sx={{
              font: " normal normal bold 18px/22px Nunito",
              color: "#3E3E3E",
              opacity: 1,
              paddingY:0.5
            }}
             >{item.item.price} TL</Typography>
        </Box>
      </Box>
    </Paper>
  </Grid>
  )
}

export default ProductCard