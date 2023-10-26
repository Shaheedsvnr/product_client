import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {
    Typography,
    Button,
    Grid,
    Paper
  } from '@mui/material';

export default function ProductSingleImage({single,index}) {
  return (
    <div>
      <Box display="flex" justifyContent={'center'} flexWrap="wrap">
          <Card
            sx={{
              width: "450px",
              height: "515px",
              marginRight: "10px",
              marginBottom: "2px",
              padding: "15px"
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              image={`http://localhost:5000/uploads/product/${single?.image[index]}`}
              alt="Product Image"
            />
          </Card>
          {/* <Grid item xs={12} md={4}> */}
          {/* <Paper elevation={3} sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}> */}
            <Typography variant="h4">{single?.name}</Typography>
            
            <Typography sx={{width:'400px'}} variant="body1">{single?.description}</Typography>
            <Box sx={{display:'block'}} mt={2}>
            <Typography variant="h5">₹{single?.price}</Typography>

            <Typography variant="body2">
              <span style={{textDecoration:'line-through'}}>₹{single?.price*1.03}</span>
              <span style={{ color: 'green', marginLeft: '8px',textDecoration:'none' }}>3% off</span>
            </Typography>
            </Box>
          {/* </Paper> */}
        {/* </Grid> */}
      </Box>
    </div>
  );
}
