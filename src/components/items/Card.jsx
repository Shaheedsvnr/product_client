import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
export default function MediaCard({allProducts,selectedProduct,handleClose,setCount}) {

    const Delete = async(item) => {
      let token = JSON.parse(localStorage.getItem("Auth-token"))
        console.log(item);
        Axios
      .delete(`http://localhost:5000/api/product/delete/${selectedProduct._id}`,{headers:{"auth-token":token}})
      .then((res) => {
        console.log('res', res.data);
        setCount((prev)=>!prev);
      })
      .catch((err) => {
        alert(err);
      });
      await handleClose();
        // const newProducts=allProducts.filter((i)=>i.id!=selectedProduct.id)
        // console.log(newProducts);
        // localStorage.setItem('Product',JSON.stringify(newProducts))
    }
  return (
    <Card sx={style}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Attempt to delete!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Are you sure, want to delete {selectedProduct.name}
        </Typography>
      </CardContent>
      <CardActions sx={{float:'right'}}>
        <Button size="small" color="error" onClick={handleClose}>Cancel</Button>
        <Button size="small" onClick={()=>Delete(selectedProduct)}>Yes, Delete</Button>
      </CardActions>
    </Card>
  );
}
