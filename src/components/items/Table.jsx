import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Card from "./Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState,useEffect } from "react";
import Axios from "axios";
import UserTable from "../UserTable";
export default function BasicTable({ allProducts, setCount, search, profile }) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [filterPrice, setFilterPrice] = useState("");
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
  const handleChange = (event) => {
    setFilterPrice(event.target.value);
  };
  const handleOpen = (item) => {
    setOpen(true);
    setSelectedProduct(item);
  };
  // Assuming you have access to the `searchValue` and `allProducts` variables
  const filteredProducts = allProducts
  .filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )
  .filter((product) =>
    !selectedCategories || product?.category_id?._id === selectedCategories
  )
  .filter((product) => {
    if (!filterPrice) {
      return true; // If no price filter selected, show all products
    }
    const [minPrice, maxPrice] = filterPrice.split("-").map(Number);
    const productPrice = Number(product.price);
    return productPrice >= minPrice && productPrice <= maxPrice;
  });


  console.log(search);
  console.log(filteredProducts);
  const handleClose = () => setOpen(false);
  return (
    <>
      {profile?.role == "seller" ? (
        <>
          <TableContainer component={Paper}>
            <div
              style={{ display: "flex", minWidth: "100%", marginTop: "70px",gap: "10px"}}
            >
              <div style={{width:'100%'}}>
                <InputLabel id="demo-simple-select-label">
                  Filter by price
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterPrice}
                  onChange={handleChange}
                  // label="Filter by price"
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
              <div style={{width:'100%'}}>
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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl No</TableCell>
                  <TableCell>Product Image</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell colSpan={2} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      sx={{ backgroundColor: "#ff313142" }}
                      colSpan={8}
                      align="center"
                    >
                      <h6>No products found !</h6>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {filteredProducts.map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="right">
                          <img
                            style={{ width: "100px" }}
                            src={`http://localhost:5000/uploads/product/${row.image[0]}`}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ width: "150px" }}
                          component="th"
                          scope="row"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row?.category_id?.name}
                        </TableCell>

                        <TableCell align="right">
                          <textarea disabled rows="4" cols="50">
                            {row.description}
                          </textarea>
                        </TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">
                          <Link to={`view/${row?._id}`}>
                            <Button variant="outlined">View</Button>
                          </Link>
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            onClick={() => handleOpen(row)}
                            color="error"
                            variant="outlined"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Card
                setCount={setCount}
                allProducts={allProducts}
                handleClose={handleClose}
                selectedProduct={selectedProduct}
              />
            </Modal>
          </TableContainer>
        </>
      ) : profile?.role=="super"? (
        <>
          <TableContainer component={Paper}>
            <div
              style={{ display: "flex", minWidth: "100%", marginTop: "70px",gap: "10px"}}
            >
              <div style={{width:'100%'}}>
                <InputLabel id="demo-simple-select-label">
                  Filter by price
                </InputLabel>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filterPrice}
                  onChange={handleChange}
                  // label="Filter by price"
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
              <div style={{width:'100%'}}>
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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sl No</TableCell>
                  <TableCell>Product Image</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="right">Price</TableCell>
                  {profile?.role=="seller"?(
                    <TableCell align="right">Quantity</TableCell>
                  ):(
                    <TableCell align="right">Seller</TableCell>
                  )}
                  <TableCell colSpan={2} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      sx={{ backgroundColor: "#ff313142" }}
                      colSpan={8}
                      align="center"
                    >
                      <h6>No products found !</h6>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {filteredProducts.map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="right">
                          <img
                            style={{ width: "100px" }}
                            src={`http://localhost:5000/uploads/product/${row.image[0]}`}
                          />
                        </TableCell>
                        <TableCell
                          sx={{ width: "150px" }}
                          component="th"
                          scope="row"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row?.category_id?.name}
                        </TableCell>

                        <TableCell align="right">
                          <textarea disabled rows="4" cols="50">
                            {row.description}
                          </textarea>
                        </TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        {profile?.role=="seller"?(
                    <TableCell align="right">{row.quantity}</TableCell>
                  ):(
                    <TableCell align="right">{row?.seller_id?.name}</TableCell>
                  )}
                        {profile?.role=="seller" ?
                        (
                          <TableCell align="right">
                          <Link to={`view/${row?._id}`}>
                            <Button variant="outlined">View</Button>
                          </Link>
                        </TableCell>
                        ):(
                          <></>
                        )}
                        <TableCell align="left">
                          <Button
                            onClick={() => handleOpen(row)}
                            color="error"
                            variant="outlined"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Card
                setCount={setCount}
                allProducts={allProducts}
                handleClose={handleClose}
                selectedProduct={selectedProduct}
              />
            </Modal>
          </TableContainer>
        </>
      ) : (
        <>
          <UserTable search={search} />
        </>
      )}
    </>
  );
}
