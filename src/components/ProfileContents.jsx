import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Await, useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Axios from "axios";
export default function ProfileContents({
  user,
  setUser,
  disabled,
  setDisabled,
  handleCloseProfileModal,
  setCount,
  setNewUserProfile
}) {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [change, setChange] = useState(false);
  const handleProfileChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    // setUser(updatedUser);
  };
  useEffect(() =>{
    setNewUserProfile(updatedUser)
  },[updatedUser])
  console.log(updatedUser);

  const [token, seToken]=useState(null);
  useEffect(() => {
    seToken(JSON.parse(localStorage.getItem("Auth-token")))
}, []);
  const [profilepic, setProfilePic] = useState(null);
  const handleProfilePictureChange = (e) => {
    let Image = e.target.files[0];
    // console.log(Image);
    setProfilePic(Image);
  };

  const SubmitNewProfile = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (if it's in a form)

    try {
      const Data = new FormData();
      Data.append("profile", profilepic);
      let response
      {user?.role=="super"? 
        response = await Axios.put(
          `http://localhost:5000/api/super/profilePictureUpdate`,
          Data,{ headers: { "auth-token": token } }
        )
       : 
      response = await Axios.put(
        `http://localhost:5000/api/admin/profilePictureUpdate`,
        Data,{ headers: { "auth-token": token } }
      )}

      console.log(response.data);
      setCount((count)=>count+1);
      // setDisabled((prev) => !prev);
      await handleCloseProfileModal();
    } catch (error) {
      console.error(error);
      // Handle the error as needed (e.g., display an error message)
    }
  };

  const shapeStyles = { bgcolor: "primary.main", width: 150, height: 150 };
  const shapeCircleStyles = { borderRadius: "50%" };
  let backgroundImage;
  {user?.role=="super" ? backgroundImage=`url(http://localhost:5000/uploads/super/${user?.profile})` : backgroundImage=`url(http://localhost:5000/uploads/admin/${user?.profile})`}
  console.log(backgroundImage);
  const circle = (
    <>
      <Badge
        // color="default"
        overlap="circular"
        badgeContent={
          change === false ? (
            <Tooltip title="Change Profile Picture" arrow>
              <CameraAltIcon onClick={() => setChange(true)} color="primary" />
            </Tooltip>
          ) : (
            <>
              <Tooltip title="Submit Picture">
                <CheckCircleIcon color="success" onClick={SubmitNewProfile} />
              </Tooltip>
              <Tooltip title="Cancel">
                <CancelIcon onClick={() => setChange(false)} color="error" />
              </Tooltip>
            </>
          )
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Position the badge at the bottom right
      >
        <Avatar
          src={
            change
              ? undefined
              : user?.role=="super"?
              `http://localhost:5000/uploads/super/${user?.profile}`
              :
              `http://localhost:5000/uploads/admin/${user?.profile}`
          }
          sx={{ ...shapeStyles, ...shapeCircleStyles, position: "relative" }}
        >
          {change ? (
            <>
              <Tooltip title="Choose profile picture" arrow>
                <label
                  htmlFor="profile-input"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    position: "relative", // Use position only once
                    top: 0,
                    left: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "white",
                    backgroundImage: user?.role === "super" // Removed curly braces
                      ? `url(http://localhost:5000/uploads/super/${user?.profile})`
                      : `url(http://localhost:5000/uploads/admin/${user?.profile})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  
                >
                  <input
                    type="file"
                    id="profile-input"
                    name="profile"
                    onChange={handleProfilePictureChange}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      opacity: 0,
                      cursor: "pointer",
                    }}
                  />
                  Choose File
                  <div
                    style={{
                      content: '""',
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the transparency here
                      borderRadius: "50%",
                    }}
                  ></div>
                </label>
              </Tooltip>
            </>
          ) : null}
        </Avatar>
      </Badge>
    </>
  );
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={3} direction="column">
          {circle}
        </Stack>
      </div>
      <Box sx={{ width: "100%", marginTop: "10px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            {/* <Item> */}
            <TextField
              value={updatedUser?.name}
              disabled={disabled}
              InputLabelProps={{ shrink: true }}
              onChange={handleProfileChange}
              fullWidth
              label="Name"
              name="name"
              id="fullWidth"
            />
            {/* </Item> */}
          </Grid>
          <Grid item xs={12}>
            {/* <Item> */}
            <TextField
              value={updatedUser?.phone}
              disabled={disabled}
              InputLabelProps={{ shrink: true }}
              onChange={handleProfileChange}
              fullWidth
              name="phone"
              label="Phone Number"
              id="fullWidth"
            />
            {/* </Item> */}
          </Grid>
          <Grid item xs={12}>
            {/* <Item> */}
            <TextField
              value={updatedUser?.email}
              disabled={disabled}
              InputLabelProps={{ shrink: true }}
              onChange={handleProfileChange}
              fullWidth
              name="email"
              label="Email"
              id="fullWidth"
            />
            {/* </Item> */}
          </Grid>
          {/* <Grid item xs={12}>
            <Tooltip title="Profile Picture" arrow>
              <TextField
                disabled={disabled}
                // value={updatedUser?.email}
                InputLabelProps={{ shrink: true }}
                onChange={handleProfilePictureChange}
                fullWidth
                type="file"
                name="profile"
                // label="Name"
                id="fullWidth"
              />
            </Tooltip>
            {/* </Item> */}
          {/* </Grid> */}
          {/* <Grid item xs={12}> */}
            {/* <Item> */}
            {/* <TextField
              disabled={disabled}
              // value={updatedUser?.email}
              InputLabelProps={{ shrink: true }}
              onChange={handleProfileChange}
              fullWidth
              type="text"
              name="password"
              label="password"
              id="fullWidth"
            /> */}
            {/* </Item> */}
          {/* </Grid> */}
        </Grid>
      </Box>
    </div>
  );
}
