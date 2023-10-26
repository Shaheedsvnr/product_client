import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Tooltip } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("Auth-token") === null) {
      navigate("/login");
    } else {
      setUser(JSON.parse(localStorage.getItem("Auth-token")));
    }
  }, []);
  const params = useParams();
  let productId = params.id;
  // const [allProducts, setAllProducts] = useState();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    price: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event, fieldName) => {
    const imageFile = event.target.files[0];
    setProduct({ ...product, [fieldName]: imageFile });
  };

  const [on, setOn] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState();
  useEffect(() => {
    Axios.get("http://localhost:5000/api/catagory/view")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  },[]);

  const handleCategory = (event) => {
    setSelectedCategories(event.target.value);
  };
  console.log(selectedCategories);
  useEffect(() => {
    Axios.get(`http://localhost:5000/api/product/view/${productId}`)
      .then((res) => {
        const singleProduct = res.data.product;
        setProduct(singleProduct);
        setSelectedCategories(singleProduct.category_id._id);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const handleOn = () => {
    setOn(false);
  };

  const goBack = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("name", product.name);
    for (let i = 1; i <= 4; i++) {
      data.append(`image`, product[`image${i}`]);
    }
    data.append("description", product.description);
    data.append("price", product.price);
    data.append("quantity", product.quantity);
    data.append("category", selectedCategories);

    try {
      const response = await Axios.put(
        `http://localhost:5000/api/product/update/${productId}`,
        data,
        { headers: { "auth-token": user } }
      );

      if (response.status === 200) {
        const responseData = response.data;
        await navigate("/");
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" fontFamily={"cursive"}>
              Product
            </Typography>
            <div style={{ display: "flex", width: "400px", gap: "10px" }}>
              {product.image && product.image[0] && (
                <img
                  src={`http://localhost:5000/uploads/product/${product.image[0]}`}
                  alt={`Product Image`}
                  width="30%"
                />
              )}
              {product.image && product.image[1] && (
                <img
                  src={`http://localhost:5000/uploads/product/${product.image[1]}`}
                  alt={`Product Image`}
                  width="30%"
                />
              )}
              {product.image && product.image[2] && (
                <img
                  src={`http://localhost:5000/uploads/product/${product.image[2]}`}
                  alt={`Product Image`}
                  width="30%"
                />
              )}
              {product.image && product.image[3] && (
                <img
                  src={`http://localhost:5000/uploads/product/${product.image[3]}`}
                  alt={`Product Image`}
                  width="30%"
                />
              )}
            </div>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  disabled={on}
                  required
                  onChange={handleChange}
                  fullWidth
                  value={product?.name}
                  label="Product Name"
                  autoFocus
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="role-label">Category</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="category"
                    value={selectedCategories}
                    onChange={handleCategory}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={on}
                  >
                    {categories.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={6} key={index}>
                  <Tooltip title={`Product Image ${index + 1}`} arrow>
                    <small>
                      {index === 0 ? (
                        <p>Front Image</p>
                      ) : index === 1 ? (
                        <p>Side Image</p>
                      ) : index === 2 ? (
                        <p>Back Image</p>
                      ) : (
                        <p>overall Image</p>
                      )}
                    </small>
                    <TextField
                      sx={{ padding: "1px" }}
                      autoComplete="given-name"
                      name={`image${index + 1}`}
                      required
                      disabled={on}
                      onChange={(e) => handleFileChange(e, `image${index + 1}`)}
                      fullWidth
                      type="file"
                    />
                  </Tooltip>
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="description"
                  disabled={on}
                  required
                  value={product?.description}
                  onChange={handleChange}
                  fullWidth
                  label="Product Description"
                  multiline
                  autoFocus
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={handleChange}
                  fullWidth
                  type="number"
                  value={product?.price}
                  label="Product price"
                  name="price"
                  disabled={on}
                  autoFocus
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={handleChange}
                  fullWidth
                  value={product?.quantity}
                  name="quantity"
                  disabled={on}
                  label="Quantity"
                  type="number"
                  autoFocus
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            {on === true ? (
              <>
                <Button
                  type="button"
                  color="secondary"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleOn}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  color="error"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 0, mb: 2 }}
                  onClick={goBack}
                >
                  Go back
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  color="success"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Update
                </Button>
                <Button
                  type="button"
                  color="error"
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 0, mb: 2 }}
                  onClick={() => setOn(true)}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
