import React from 'react'
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
export default function UpdatePassword({showPassword,setShowPassword, setNewUserPassword,newUserPassword,setAlertMessage,alertMessage}) {
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
      const handlePasswordChange = (event) => {
        const newPassword = { ...newUserPassword, [event.target.name]: event.target.value };
        setNewUserPassword(newPassword);
      
        // Check if the passwords do not match and set the alert message
        if (newPassword.repassword !== newPassword.npassword) {
          setAlertMessage("Passwords do not match");
        } else {
          // Clear the alert message if passwords match
          setAlertMessage("");
        }
      }
      

  return (
    <div>
      <Box sx={{ width: "100%", marginTop: "10px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            {/* <Item> */}
          <InputLabel htmlFor="outlined-adornment-password">Enter your new Password</InputLabel>

            <TextField
              InputLabelProps={{ shrink: true }}
              onChange={handlePasswordChange}
              fullWidth
              autoFocus
              name="npassword"
              id="fullWidth"
            />
            {/* </Item> */}
          </Grid>
          <Grid item xs={12}>
            {/* <Item> */}
            {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined"> */}
          <InputLabel htmlFor="outlined-adornment-password">Re-enter your Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            onChange={handlePasswordChange}
            name="repassword"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }

          />
          {alertMessage ? <p style={{color:'red',fontSize:'15px',fontWeight:'bolder'}}>{alertMessage}</p> : ''}
        {/* </FormControl> */}
            {/* </Item> */}
          </Grid>
          
        </Grid>
      </Box>
    </div>
  )
}
