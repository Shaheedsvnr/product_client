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
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function validateEmail(email) {
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailPattern.test(email);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [signInProfile, setSignInProfile] = useState(null);
  const [signIn, setSignIn] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleInput = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  const handleProfile = (e) => {
    setSignInProfile(e.target.files[0]);
  };

  const isEmailUnique = async (email) => {
    try {
      const response = await Axios.get(
        `http://localhost:5000/api/admin/check-email?email=${email}`
      );      
      return response.data.isUnique;
    } catch (error) {
      console.error("Error checking email uniqueness:", error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = {};

    if (!signIn.name) {
      formErrors.name = "Name is required.";
    }

    if (!signIn.email) {
      formErrors.email = "Email is required.";
    } else if (!validateEmail(signIn.email)) {
      formErrors.email = "Invalid email address.";
    } else {
      const isUnique = await isEmailUnique(signIn.email);
      if (!isUnique) {
        formErrors.email = "Email is already taken.";
      }
    }

    if (!signIn.phone) {
      formErrors.phone = "Phone number is required.";
    } else if (!validatePhone(signIn.phone)) {
      formErrors.phone = "Phone number should contain 10 digits.";
    }

    if (!signIn.password) {
      formErrors.password = "Password is required.";
    }

    setErrors(formErrors);

    if (Object.values(formErrors).every((error) => error === "")) {
      // No validation errors, proceed with form submission
      const Data = new FormData();
      Data.append("name", signIn.name);
      Data.append("phone", signIn.phone);
      Data.append("email", signIn.email);
      Data.append("password", signIn.password);
      Data.append("role", signIn.role);
      Data.append("profile", signInProfile);
      Axios.post("http://localhost:5000/api/admin/register", Data)
        .then((result) => {
          console.log(result.data);
        })
        .catch((err) => {
          console.log(err);
        });

      await navigate("/login");
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={handleInput}
                autoFocus
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                margin="normal"
                required
                type="number"
                fullWidth
                id="phone"
                label="Phone number"
                name="phone"
                autoComplete="phone"
                onChange={handleInput}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                margin="normal"
                required
                type="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInput}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="profile"
                type="file"
                id="profile"
                autoComplete="current-profile"
                onChange={handleProfile}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInput}
                error={!!errors.password}
                helperText={errors.password}
              />
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={signIn.role}
                  onChange={handleInput}
                >
                  <MenuItem value="seller">Seller</MenuItem>
                  <MenuItem value="buyer">Buyer</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container sx={{ justifyContent: "center", display: "flex" }}>
                <Grid item>
                  <Link to={"/login"} variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
