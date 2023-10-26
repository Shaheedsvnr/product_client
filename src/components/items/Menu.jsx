import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import OutputIcon from "@mui/icons-material/Output";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Await, useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ProfileContents from "../ProfileContents";
import Axios from "axios";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import UpdatePassword from "../UpdatePassword";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
export default function AccountMenu({ setIsAlive,token,profile }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  console.log(profile);
  const nav = useNavigate();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [openProfileModal, setOpenProfileModal] = React.useState(false);
  const [openAccountSettingModal, setOpenAccountSettingModal] = React.useState(false);
  const [openLogout, setOpenLogout] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState();
  const [newUserProfile, setNewUserProfile] = useState();
  const [newUserPassword, setNewUserPassword] = useState();
  const [disabled, setDisabled] = useState(true);
  const [count, setCount] = useState(0);
  const [showPassword, setShowPassword] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleOpenProfileModal = () => {
    setOpenProfileModal(true);
    setAnchorEl(null);
  };
  const handleCloseProfileModal = () => {
    setOpenProfileModal(false);
    setDisabled(true);
  };

  // const [token, seToken]=useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = (event) => {
    setAnchorEl(null);
  };
  const handleClose = async () => {
    setIsAlive((prev) => prev + 1);
    // setIsAlive((prev)=>!prev)
    await localStorage.clear();
    await setAnchorEl(null);
    await nav("/login");
  };
  const handleAccountOpen = () => {
    setOpenAccountSettingModal(true)
    setAnchorEl(null);
  }
  const handleAccountClose = () => {
    setOpenAccountSettingModal(false)
    setAnchorEl(null);

  }
  const handleLogoutOpen = () => {
    setOpenLogout(true)
    setAnchorEl(null);
  }
  const handleLogoutClose = () => {
    setOpenLogout(false)
    setAnchorEl(null);

  }
  const handleAlertClose = () =>{
    setOpenAlert(false)
  }
  let id=profile?._id;
//   useEffect(() => {
//     // seToken(JSON.parse(localStorage.getItem("Auth-token")))
//     const userData = JSON.parse(localStorage.getItem("User"));
//     id=userData._id;
//         console.log(userData._id);
// }, []);
// console.log(token);
  const handleProfileModal = async () => {
    nav("/profile");
  };
  // console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      
      {profile?.role=="super" ?
      Axios.get(`http://localhost:5000/api/super/ViewSingleSuperAdmin/${id}`)
      .then(async(response)=>{
        console.log(response.data);
        const singleAdmin = await response.data.superA;
        setUser(singleAdmin);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to fetch user data");
      })
      :
      Axios.get(`http://localhost:5000/api/admin/ViewSingleAdmin/${id}`)
      .then(async(response)=>{
        console.log(response.data);
        const singleAdmin = await response.data.admin;
        setUser(singleAdmin);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to fetch user data");
      })
    }
      // try {
      //   const userData = JSON.parse(localStorage.getItem("User"));
      //   let id=userData._id;
      //   console.log(userData._id);
      //   console.log(count);
      //   const response = await Axios.get(`http://localhost:5000/api/super/ViewSingleSuperAdmin/${id}`,{},{ headers: { "auth-token": token } });
      //   const singleAdmin = await response.data.superA;
      //   setUser(singleAdmin);
      // } catch (error) {
      //   console.error(error);
      //   alert("Failed to fetch user data");
      // }
    };
    fetchData();
  }, [count]);
  console.log(disabled);
  const updateProfile = async () => {
    console.log(newUserProfile);
    setUser(newUserProfile);
    const userData = {
      name: newUserProfile.name,
      phone: newUserProfile.phone,
      email: newUserProfile.email,
      password: newUserProfile.password,
    };
    console.log(userData);
    try {
      let response
      {
        profile?.role=="super"?
       response= await Axios.put(`http://localhost:5000/api/super/ProfileUpdate`, userData,{ headers: { "auth-token": token } })
       :
       response= await Axios.put(`http://localhost:5000/api/admin/ProfileUpdate`, userData,{ headers: { "auth-token": token } })
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    handleCloseProfileModal();
  };
  const handleUpdatePassword = async () => {
    console.log(newUserPassword);
    const userPassword = {
      npassword: newUserPassword?.npassword,
      repassword: newUserPassword?.repassword
    };
    console.log(userPassword);
    try {
      let response
      {
        profile?.role=="super"?
       response= await Axios.put(`http://localhost:5000/api/super/changePassword/${profile._id}`, userPassword)
       :
       response= await Axios.put(`http://localhost:5000/api/admin/changePassword/${profile._id}`, userPassword)
      }
      console.log(response.data);
      setMessage(response.data.message);
      setSuccess(response.data.success);
      setAlertMessage("")
      setOpenAlert(true)
    } catch (error) {
      console.error(error);
    }

    await handleAccountClose();
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography> */}
        <Typography sx={{ minWidth: 100, color: "white" }}>
          Hi, {user?.name}
        </Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {
              user?.profile==null?
            
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt={user?.name}
              // src={`http://localhost:5000/uploads/super/${user?.profile}`}
            />
            :
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt={user?.name}
              src={profile?.role=="super" ? `http://localhost:5000/uploads/super/${user?.profile}` : `http://localhost:5000/uploads/admin/${user?.profile}`}
            />
}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseMenu}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div>
          <div>
            <MenuItem
              onClick={handleOpenProfileModal}
              sx={{ textDecoration: "none",gap:'10px' }}
            >
              {/* <Link to={"/profile"} style={{ textDecoration: "none" }}> */}
              <Avatar
                alt="Remy Sharp"
                src={profile?.role=="super" ? `http://localhost:5000/uploads/super/${user?.profile}` : `http://localhost:5000/uploads/admin/${user?.profile}`}
                />{" "}
              Profile
              {/* </Link> */}
            </MenuItem>
            <MenuItem onClick={handleAccountOpen} sx={{ textDecoration: "none",gap:'10px' }}>
              {/* Assuming you have an OutputIcon component */}
              <div >
                <AdminPanelSettingsIcon sx={{ color: "#a36663",fontSize:'30px',margin:'2px' }} />
              </div>
              <div>
              Account Setting
              </div>
            </MenuItem>
            <MenuItem onClick={handleLogoutOpen} sx={{ textDecoration: "none",gap:'10px' }}>
              {/* Assuming you have an OutputIcon component */}
              <div >
                <OutputIcon sx={{ color: "#a36663",fontSize:'30px',margin:'2px' }} />
              </div>
              <div>
              Logout
              </div>
            </MenuItem>
          </div>
        </div>

        {/* <Divider /> */}
      </Menu>
      <BootstrapDialog
        onClose={handleCloseProfileModal}
        aria-labelledby="customized-dialog-title"
        open={openProfileModal}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Profile
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseProfileModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <ProfileContents
            handleCloseProfileModal={handleCloseProfileModal}
            setDisabled={setDisabled}
            user={user}
            setUser={setUser}
            disabled={disabled}
            setCount={setCount}
            nav={nav}
            setNewUserProfile={setNewUserProfile}
          />
        </DialogContent>
        <DialogActions>
          {disabled === true ? (
            <>
              <Button autoFocus color="error" onClick={handleCloseProfileModal}>
                Close
              </Button>
              <Button autoFocus onClick={() => setDisabled(false)}>
                Edit Profile
              </Button>
            </>
          ) : (
            <>
              <Button autoFocus color="error" onClick={() => setDisabled(true)}>
                Cancel
              </Button>
              <Button autoFocus color="success" onClick={updateProfile}>
                Save changes
              </Button>
            </>
          )}
        </DialogActions>
      </BootstrapDialog>
      <BootstrapDialog
        onClose={handleAccountClose}
        aria-labelledby="customized-dialog-title"
        open={openAccountSettingModal}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update Password
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleAccountClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <UpdatePassword setShowPassword={setShowPassword} showPassword={showPassword} alertMessage={alertMessage} setAlertMessage={setAlertMessage} newUserPassword={newUserPassword} setNewUserPassword={setNewUserPassword}/>
        </DialogContent>
        <DialogActions>
          
            <>
              <Button autoFocus color="error" onClick={handleAccountClose}>
                Close
              </Button>
              <Button autoFocus color="success" onClick={handleUpdatePassword}>
                Save changes
              </Button>
            </>

        </DialogActions>
      </BootstrapDialog>
      <BootstrapDialog
        onClose={handleLogoutClose}
        aria-labelledby="customized-dialog-title"
        open={openLogout}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Attempt to Logout
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleAccountClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <h4>Are you sure, want to logout ?</h4>
        </DialogContent>
        <DialogActions>
          
            <>
              <Button autoFocus color="primary" onClick={handleLogoutClose}>
                Cancel
              </Button>
              <Button autoFocus color="error" onClick={handleClose}>
                Yes, logout
              </Button>
            </>

        </DialogActions>
      </BootstrapDialog>
      {/* <Stack spacing={2} sx={{ width: "100%" }}> */}
          <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert
              onClose={handleAlertClose}
              severity={success === true ? 'success' : 'warning'}
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        {/* </Stack> */}
    </React.Fragment>
  );
}
