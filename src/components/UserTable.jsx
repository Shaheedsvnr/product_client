import React, { useState, useEffect } from "react";
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
import Axios from "axios";
import { Link } from "react-router-dom";
function ProductList({ search }) {
  const [filterPrice, setFilterPrice] = useState("");
  const [products, setProducts] = useState([]);
  console.log(search);
  useEffect(() => {
    Axios.get("http://localhost:5000/api/product/userViewProducts")
      .then((res) => {
        console.log("res", res.data);
        const allProducts = res.data;
        setProducts(allProducts);
        // setAllProducts(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState();
  useEffect(() => {
    Axios.get("http://localhost:5000/api/catagory/view")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCategory = (event) => {
    setSelectedCategories(event.target.value);
  };
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (product) =>
        !selectedCategories || product.category_id._id === selectedCategories
    )
    .filter((product) => {
      if (!filterPrice) {
        return true; // If no price filter selected, show all products
      }
      const [minPrice, maxPrice] = filterPrice.split("-").map(Number);
      const productPrice = Number(product.price);
      return productPrice >= minPrice && productPrice <= maxPrice;
    });

  //   if (filterPrice !== "All") {
  //     filteredProducts = filteredProducts?.filter(
  //       (product) => product?.price <= parseInt(filterPrice, 10)
  //     );
  //   }

  return (
    <Container maxWidth="xl">
      <div style={{ marginTop: "100px" }}>
        <div
          style={{
            display: "flex",
            minWidth: "100%",
            marginTop: "70px",
            gap: "10px",
          }}
        >
          <div style={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-label">
              Filter by price
            </InputLabel>
            <Select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              fullWidth
            //   label="Filter by Price"
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"100-1000"}>100-1000</MenuItem>
              <MenuItem value={"1000-2000"}>1000-2000</MenuItem>
              <MenuItem value={"10000-20000"}>10000-20000</MenuItem>
              <MenuItem value={"20000-30000"}>20000-30000</MenuItem>
              <MenuItem value={"30000-40000"}>30000-40000</MenuItem>
              <MenuItem value={"40000-50000"}>40000-50000</MenuItem>
              <MenuItem value={"50000-60000"}>50000-60000</MenuItem>
              <MenuItem value={"60000-70000"}>60000-70000</MenuItem>
            </Select>
          </div>
          <div style={{ width: "100%" }}>
            <InputLabel id="role-label">Filter by category</InputLabel>
            <Select
              fullWidth={true}
              labelId="role-label"
              id="role"
              name="Filter by category"
              value={selectedCategories}
              onChange={handleCategory}
            >
              <MenuItem value={""}>All</MenuItem>

              {categories.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      {filteredProducts?.length === 0 ? (
        <Card
          style={{
            marginTop: "20px",
            backgroundColor: "#ffbcbc",
            boxShadow: "5px 10px 15px #919191",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CardContent>
              <Typography variant="h6">No products found</Typography>
            </CardContent>
          </div>
        </Card>
      ) : (
        filteredProducts?.map((product, index) => {
          let price = product?.price * 1.101;
          const roundedPrice = Math.round(price);
          const formattedPrice = `₹${roundedPrice}`;
          return (
            <Card key={index} style={{ marginTop: "20px", padding: "20px" }}>
              <div style={{ display: "flex" }}>
                <Link
                  style={{
                    textDecoration: "none",
                    width: "100%",
                    maxWidth: "200px",
                  }}
                  to={`/viewProduct/${product?._id}`}
                >
                  <CardMedia
                    component="img"
                    alt={product.title}
                    src={`http://localhost:5000/uploads/product/${product.image[0]}`}
                    style={{ width: "100%", maxWidth: "200px" }}
                  />
                </Link>
                <CardContent>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/viewProduct/${product?._id}`}
                  >
                    <Typography
                      sx={{ textAlign: "start", margin: "10px" }}
                      variant="h5"
                      component="div"
                    >
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography
                    sx={{ textAlign: "start", margin: "10px" }}
                    variant="body2"
                    color="text.secondary"
                  >
                    {product.description}
                  </Typography>
                </CardContent>
                <div style={{ width: "100%" }}>
                  <Typography
                    variant="h4"
                    component="div"
                    style={{
                      fontWeight: "bold",
                      float: "right",
                      margin: "25px",
                    }}
                  >
                    ₹{product.price}
                    <span
                      style={{
                        fontSize: "20px",
                        margin: "10px",
                        textDecoration: "line-through",
                        fontWeight: "lighter",
                      }}
                    >
                      {formattedPrice}
                    </span>
                  </Typography>
                </div>
              </div>
            </Card>
          );
        })
      )}
    </Container>
  );
}

export default ProductList;
