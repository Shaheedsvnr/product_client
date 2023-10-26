import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import {
    Container,
    Card,
    CardContent,
    CardMedia,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
  } from "@mui/material";
  import { Link } from "react-router-dom";
export default function RemainingProducts({ single }) {
  const [remainingProducts, setRemainingProducts] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:5000/api/product/userViewProducts")
      .then((res) => {
        console.log("res", res.data);
        const allProducts = res.data;
        let remaining = allProducts.filter((item) => item?._id != single);
        setRemainingProducts(remaining);
      })
      .catch((err) => {
        alert(err);
      });
  }, [single]);
  console.log(remainingProducts);
  return <div>
    {remainingProducts.length == 0 ? <>
        <Card style={{ marginTop: "20px",backgroundColor:'#ffbcbc',boxShadow:'5px 10px 15px #919191' }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CardContent>
              <Typography variant="h6">No products found</Typography>
            </CardContent>
          </div>
        </Card>
    </> : (
    remainingProducts?.map((product, index) => (
          <Card key={index} style={{padding:'20px' }}>
            <div style={{ display: "flex" }}>
            <Link style={{textDecoration:'none',width: "100%", maxWidth: "200px"}} to={`/viewProduct/${product?._id}`}>
              <CardMedia
                component="img"
                alt={product.name}
                src={`http://localhost:5000/uploads/product/${product.image[0]}`}
                style={{ width: "100%", maxWidth: "200px" }}
              />
              </Link>
              <CardContent>
                <Link style={{textDecoration:'none'}} to={`/viewProduct/${product?._id}`}>
                <Typography sx={{textAlign:'start',margin:'10px'}} variant="h5" component="div">
                  {product.name}
                </Typography>
                </Link>
                <Typography sx={{textAlign:'start',margin:'10px'}} variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>
              {/* <div style={{ width: "100%" }}>
                <Typography
                  variant="h4"
                  component="div"
                  style={{ fontWeight: "bold", float: "right", margin: "25px" }}
                >
                  ₹{product.price}
              <span style={{fontSize:'20px', margin:'10px',textDecoration:'line-through',fontWeight:'lighter'}}>₹{product?.price*1.101}</span>

                </Typography>
              </div> */}

            </div>
          </Card>
        ))
      )}
    </div>;
}
