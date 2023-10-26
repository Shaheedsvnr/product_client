import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import "./css/otp.css"; // You can create a CSS file for styling
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";
import Axios from "axios";

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
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]); // Initialize with 6 empty strings

  // Function to update OTP when a digit is entered
  const handleOtpChange = (index, value) => {
    // Make a copy of the current OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  

  const getConcatenatedOtp = (e) => {
    e.preventDefault();
    let updatedOtp = otp.join(""); // Concatenate the array elements
    console.log(updatedOtp);
    const otpValue = Cookies.get("otp");
    console.log(otpValue);
    const storedHashedOTP = otpValue; // Replace 'Cookies' with the correct library for your cookies
    // User's input OTP
    const userInputOTP = updatedOtp; // Replace with the user's input
    // Compare the stored hashed OTP with the user's input OTP
    bcrypt.compare(userInputOTP, storedHashedOTP, (err, isMatch) => {
      if (err) {
        // Handle the error
        console.error("Error comparing hashes:", err);
      } else if (isMatch) {
        // The user input matches the stored OTP
        console.log("OTP is valid");
        alert("OTP verification successful");
        Cookies.set('verified', true, { expires: 1 / 288 }); // 1/288 represents 5 minutes
        navigate("/change-password");
      } else {
        // The user input does not match the stored OTP
        console.log("OTP is invalid");
        alert("invalid OTP");
      }
    });
  };

  const clearOtp = () => {
    const newOtp = ["", "", "", "", "", ""]; // Initialize with 6 empty strings
    setOtp(newOtp);

    // Set focus to the first input field
    if (inputRefs[0] && inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        // message={message}
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
              my: 23,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="container" style={{ backgroundColor: "#d0d0d033" }}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <h4>Enter OTP Code</h4>
              <form>
                <div className="input-field">
                  {inputRefs.map((inputRef, index) => (
                    <input
                      required
                      key={index}
                      type="number"
                      autoFocus={index === 0}
                      ref={inputRef}
                      value={otp[index]} // Bind value to the OTP state
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d+$/.test(value) && value.length <= 1) {
                          handleOtpChange(index, value);
                          if (
                            value.length === 1 &&
                            index < inputRefs.length - 1
                          ) {
                            inputRefs[index + 1].current.focus();
                          }
                        }
                      }}
                      maxLength="1"
                    />
                  ))}
                </div>
                <Button
                  // type="submit"
                  fullWidth
                  variant="contained"
                  onClick={getConcatenatedOtp}
                  sx={{ mt: 3, mb: 0 }}
                >
                  Verify
                </Button>
                <Button fullWidth onClick={clearOtp}>
                  Clear All
                </Button>
                <Link fullWidth to={"/forgot-password"}>
                  <Button
                    //   type="submit"
                    fullWidth
                    color="error"
                    variant="text"
                    sx={{ mt: 1, mb: 2 }}
                  >
                    Go back
                  </Button>
                </Link>
              </form>
            </div>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
