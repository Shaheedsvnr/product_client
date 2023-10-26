import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Button from "@mui/material/Button";
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
import Card from "./items/Card";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import EditCard from "./items/EditCard";
import InsertCard from "./items/InsertCard";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function Sellers({ search }) {
  console.log(search);

  const [categories, setCategories] = useState([]);
  const [isAlive, setIsAlive] = useState(true);
  const [open, setOpen] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openInsertModal, setOpenInsertModal] = useState(false);
  const [message, setMessage] = useState("");
  const [token, seToken] = useState();
  const [filterStatus, setFilterStatus] = useState("");
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("Auth-token"));
    seToken(token);
    Axios.get("http://localhost:5000/api/catagory/view")
      .then((response) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  }, [isAlive]);
  console.log(categories);
  //   console.log(token);
  const filteredCategories = categories
    ?.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter((product) => !filterStatus || product?.status == filterStatus);
  const handleChange = (event) => {
    setFilterStatus(event.target.value);
  };
  //   const handleChangeRole = (event) => {
  //     setFilterRole(event.target.value);
  //   };
  const handleClick = () => {
    return setOpen(true);
  };
  const handleOpenInsertModal = () => {
    return setOpenInsertModal(true);
  };
  const handleCloseInsertModal = () => {
    return setOpenInsertModal(false);
  };
  const handleOpenEditModal = (id) => {
    setOpenEditModal(true);
    console.log(id);
    setSelectedCategory(id);
  };
  console.log(selectedCategory);
  const handleCloseEditModal = () => {
    return setOpenEditModal(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  console.log(filteredCategories);
  console.log(categories);
  const Block = (e, id) => {
    console.log(id);
    Axios.put(
      `http://localhost:5000/api/catagory/block/${id}`,
      {},
      { headers: { "auth-token": token } }
    )
      .then(async (res) => {
        console.log(res.data);
        setIsAlive((prev) => !prev);
        setMessage(res.data.message);
        setSuccess(res.data.success);
        await handleClick();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div
        style={{
            display: "flex",
          minWidth: "100%",
          //   marginTop: "70px",
          gap: "10px",
        }}
      >
        <div style={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">
            Filter by Status
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterStatus}
            onChange={handleChange}
            // label="Filter by price"
          >
            <MenuItem value={""}>All</MenuItem>
            <MenuItem value={"Active"}>Active</MenuItem>
            <MenuItem value={"Inactive"}>Inactive</MenuItem>
          </Select>
        </div>
        <div style={{padding:'30px'}}>
          <Button fullWidth
            onClick={handleOpenInsertModal}
            variant="text"
            color="success"
          >
            Add
          </Button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell colSpan={1} align="left">
                Category
              </TableCell>
              <TableCell align="right">Status</TableCell>
              {/* <TableCell align="right">Quantity</TableCell> */}
              <TableCell colSpan={2} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "#ff313142" }}
                  colSpan={8}
                  align="center"
                >
                  <h6>No categories found !</h6>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {filteredCategories.map((row, index) => (
                  <TableRow
                    key={row._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell
                      sx={{ width: "150px" }}
                      component="th"
                      scope="row"
                    >
                      {edit == true ? (
                        <>
                          <TextField
                            InputLabelProps={{ shrink: true }}
                            //   onChange={handlePasswordChange}
                            fullWidth
                            value={row?.name}
                            autoFocus
                            name="name"
                            id="fullWidth"
                          />
                        </>
                      ) : (
                        row?.name
                      )}
                    </TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="center">
                      {row.status == "Inactive" ? (
                        <Button
                          onClick={(e) => Block(e, row._id)}
                          variant="outlined"
                        >
                          UnBlock
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => Block(e, row._id)}
                          color="error"
                          variant="outlined"
                        >
                          Block
                        </Button>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => handleOpenEditModal(row)}
                        variant="outlined"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={success == true ? "success" : "warning"}
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </Stack>
        <Modal
          open={openEditModal}
          onClose={handleCloseEditModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <EditCard
            setSuccess={setSuccess}
            setMessage={setMessage}
            setOpen={setOpen}
            setIsAlive={setIsAlive}
            handleCloseEditModal={handleCloseEditModal}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Modal>
        <Modal
          open={openInsertModal}
          onClose={handleCloseInsertModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <InsertCard
            setSuccess={setSuccess}
            setMessage={setMessage}
            setOpen={setOpen}
            setIsAlive={setIsAlive}
            handleCloseInsertModal={handleCloseInsertModal}
            // selectedCategory={selectedCategory}
            // setSelectedCategory={setSelectedCategory}
          />
        </Modal>
      </TableContainer>
    </div>
  );
}
