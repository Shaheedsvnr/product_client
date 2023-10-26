import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Axios from "axios";
import ProductImages from "./items/ProductImages";
import ProductSingleImage from "./items/ProductSingleImage";
import RemainingProducts from "./items/RemainingProducts";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function RowAndColumnSpacing() {
  let param = useParams();
  let productId = param.id;
  const [single, setSingle] = useState();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/product/view/${productId}`)
      .then((res) => {
        const singleProduct = res.data.product;
        setSingle(singleProduct);
      })
      .catch((err) => {
        alert(err);
      });
  }, [productId]);

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "70px",
        // backgroundColor: "red",
        padding: "5px",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={2}>
          <ProductImages single={single} setIndex={setIndex} index={index} />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <Item>
            <ProductSingleImage single={single} index={index} />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <Item>
            <RemainingProducts single={single?._id}/>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
