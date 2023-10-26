import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from '@mui/material/InputLabel';
import { useState,useEffect } from 'react';
import Axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
export default function MediaCard({setSuccess,setOpen,setMessage,setIsAlive,setSelectedCategory,selectedCategory,handleCloseEditModal}) {
    const [newCategory,setNewCategory]=useState()
    useEffect(()=>{
        setNewCategory(selectedCategory);
    },[])
    const editCategory = (e) => {
        setNewCategory({...newCategory,[e.target.name]:e.target.value});
    }
    const Update = async() => {
      let token = JSON.parse(localStorage.getItem("Auth-token"))
        console.log(newCategory);
        Axios
      .put(`http://localhost:5000/api/catagory/update/${selectedCategory._id}`,newCategory,{headers:{"auth-token":token}})
      .then((res) => {
        console.log('res', res.data);
        setOpen(true)
        setMessage(res.data.message)
        setSuccess(res.data.success)
        setIsAlive((prev)=>!prev);
      })
      .catch((err) => {
        alert(err);
      });
      await handleCloseEditModal();
        // const newProducts=allProducts.filter((i)=>i.id!=selectedProduct.id)
        // console.log(newProducts);
        // localStorage.setItem('Product',JSON.stringify(newProducts))
    }
  return (
    <Card sx={style}>
      {/* <Box sx={{ width: "100%", marginTop: "10px" }}> */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            {/* <Item> */}
          <InputLabel htmlFor="outlined-adornment-password">Category name</InputLabel>

            <TextField
              InputLabelProps={{ shrink: true }}
              onChange={editCategory}
              fullWidth
              autoFocus
              value={newCategory?.name}
              name="name"
              id="fullWidth"
            />
            {/* </Item> */}
          </Grid>
          
        </Grid>
        <CardActions sx={{float:'right'}}>
        <Button size="small" color="error" onClick={handleCloseEditModal}>Cancel</Button>
        <Button size="small" onClick={Update}>Update</Button>
      </CardActions>
      {/* </Box> */}
      
    </Card>
  );
}
