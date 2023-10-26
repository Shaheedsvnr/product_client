import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Axios from "axios";
import {
  Tooltip,
  Button,
  Container,
  CssBaseline,
  Box,
  TextField,
  Grid,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

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
  }, []); // Specify an empty dependency array
// Representational State Transfer
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
   const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState("");
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
  const [imageErrors, setImageErrors] = useState({
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event, fieldName) => {
    const imageFile = event.target.files[0];

    // Check if an image file was selected
    if (!imageFile) {
      setImageErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Please select an image file for ${fieldName}.`,
      }));
      return;
    }

    // Update the product state with the selected image
    setProduct({ ...product, [fieldName]: imageFile });

    // Clear any previous error message for this field
    setImageErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: "",
    }));
  };
  const imageObject = {
    image1: product.image1,
    image2: product.image2,
    image3: product.image3,
    image4: product.image4,
  };
  console.log(product);
  const imageKeys = ['image1', 'image2', 'image3', 'image4'];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if all image fields are filled
    for (let i = 1; i <= 4; i++) {
      if (!product[`image${i}`]) {
        setImageErrors((prevErrors) => ({
          ...prevErrors,
          [`image${i}`]: `Please select an image file for Image ${i}.`,
        }));
        return;
      }
    }

    // Create a FormData object to send the product data
    const data = new FormData();
    data.append("name", product.name);
    for (let i = 1; i <= 4; i++) {
      data.append(`image`, product[`image${i}`]);
    }
    // imageKeys.forEach(key => {
    //   data.append('image', product[key]);
    // });
    
    data.append("description", product.description);
    data.append("category", selectedCategories);
    data.append("price", product.price);
    data.append("quantity", product.quantity);

    try {
      const response = await Axios.post(
        "http://localhost:5000/api/product/insert",data,{ headers: { "auth-token": user } }
      );
      
      if (response.status === 200) {
        // Product created successfully on the server
        await navigate("/");
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
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
            Product Insert
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  onChange={handleChange}
                  fullWidth
                  label="Product Name"
                  autoFocus
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
                  >
                    {categories.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="description"
                  required
                  onChange={handleChange}
                  fullWidth
                  label="Product Description"
                  multiline
                />
              </Grid>
              {Array.from({ length: 4 }).map((_, index) => (
                <Grid item xs={6} key={index}>
                  <Tooltip title={`Product Image ${index + 1}`} arrow>
                    <small>
                      {index == 0 ? (
                        <p>Front Image</p>
                      ) : index == 1 ? (
                        <p>Side Image</p>
                      ) : index == 2 ? (
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
                      onChange={(e) => handleFileChange(e, `image${index + 1}`)}
                      fullWidth
                      type="file"
                    />
                  </Tooltip>
                  {imageErrors && (
                    <p style={{ color: "red" }}>
                      {imageErrors[`image${index + 1}`]}
                    </p>
                  )}
                </Grid>
              ))}
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={handleChange}
                  fullWidth
                  type="number"
                  label="Product price"
                  name="price"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={handleChange}
                  fullWidth
                  name="quantity"
                  label="Quantity"
                  type="number"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Insert
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
