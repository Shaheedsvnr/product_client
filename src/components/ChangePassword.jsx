import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Axios from "axios";
import Cookies from "js-cookie";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide({ setIsAlive }) {
  const navigate = useNavigate();
  const [changePassword, setChnagePassword] = useState();
  // const [open,setOpen]=useState(false)
  const [message, setMessage] = useState("");
  const handleInput = (e) => {
    setChnagePassword({ ...changePassword, [e.target.name]: e.target.value });
  };
  const [user, setUser] = React.useState();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useEffect(()=>{
    if(Cookies.get("verified")==true){
        navigate('/forgot-password')
    }
    setUser(JSON.parse(localStorage.getItem("user")))
  })
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(changePassword);
    if(changePassword.npassword==changePassword.repassword) {
        await Axios.put(`http://localhost:5000/api/admin/changePassword/${user}`,changePassword)
        .then(async(res)=>{
            if(res.data.success==true){
            console.log('-----------------------------------------');
            console.log("Password changed successfull");
            console.log(res.data);
            console.log('-----------------------------------------');
            navigate('/login')
            }else{
              console.log(res.data);
            }
        }
        )
        .catch((err)=>{
          console.error("Error", err)
        })
    }
    else {
        console.log("Password does not match");
    }    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        color="error"
        sx={{ color: "red" }}
      />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create new password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="New Password"
                name="npassword"
                autoComplete="password"
                onChange={handleInput}
                autoFocus
                type="text"
              />
              <TextField
                margin="normal"
                required
                fullWidth

                label="Re Password"
                name="repassword"
                autoComplete="repassword"
                onChange={handleInput}
                type="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
              <Link fullWidth to={'/otp-enter'}>
                <Button
                  type="submit"
                  fullWidth
                  color="error"
                  variant="text"
                  sx={{ mt: 0, mb: 2 }}
                >
                  Go back
                </Button>
              </Link>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
