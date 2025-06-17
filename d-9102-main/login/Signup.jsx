import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { GoogleIcon } from "./CustomIcons"; // Google Login icon
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
    const navigate = useNavigate();
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword((show) => !show);
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");
    
      let hasError = false;
    
      if (!name) {
        setNameError(true);
        setNameErrorMessage("Name is required");
        hasError = true;
      } else {
        setNameError(false);
        setNameErrorMessage("");
      }
    
      if (!email) {
        setEmailError(true);
        setEmailErrorMessage("Email is required");
        hasError = true;
      } else {
        setEmailError(false);
        setEmailErrorMessage("");
      }
    
      if (!password) {
        setPasswordError(true);
        setPasswordErrorMessage("Password is required");
        hasError = true;
      } else {
        setPasswordError(false);
        setPasswordErrorMessage("");
      }
    
      if (hasError) return;
    
      try {
        const response = await fetch("http://localhost:8000/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
    
        const data = await response.json();
        console.log("📥 Server response:", data);
    
        if (response.ok) {
          navigate("/onboarding");
        } else {
          alert(data.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("❌ Signup error:", error);
        alert("Server error. Please try again later.");
      }
    };

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#f7f6f2',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
      padding: { xs: 2, md: 4 },
      boxSizing: 'border-box',
      flexDirection: { xs: 'column', sm: 'row' },
      justifyContent: 'space-around',
    }}>
      <CssBaseline />

      {/* Logo Image - Identical to Login.jsx */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: '100%', sm: '40%' },
        mb: { xs: 4, sm: 0 },
      }}>
        <img
          src="/fixmyapp logo.png" // Path to your logo in the public folder
          alt="FixMy Ride Logo"
          style={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '300px', // Limit height of the logo
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Signup Form - Now a Box, identical to Login.jsx form box */}
      <Box sx={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
        padding: { xs: 3, sm: 4, md: 5 },
        maxWidth: { xs: '100%', sm: 400, md: 450 },
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        ml: { xs: 0, sm: 'auto' },
        mr: { xs: 0, sm: '5%' },
        textAlign: 'left',
        zIndex: 1,
      }}>
        {/* 🏁 App Name "FixMyRide" - Matched to Login Heading style */}
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5, color: '#333' }}>
          FixMyRide
        </Typography>

        {/* 🔑 Sign-up Heading - Matched to Login Sub-heading style */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Create your account
        </Typography>

        {/* "Sign Up With..." Text - Matched to Login "Sign In With..." style */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Sign Up With...
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button
            variant="outlined"
            sx={{
              flex: 1,
              py: 1.5,
              borderColor: 'grey.300',
              color: 'text.primary',
              textTransform: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                borderColor: '#f7bd00',
                backgroundColor: '#fdf0c2',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              },
            }}
            onClick={() => window.location.href = "http://localhost:8000/auth/google"}
            startIcon={<GoogleIcon />}
          >
            Google
          </Button>
          <Button
            variant="outlined"
            sx={{
              flex: 1,
              py: 1.5,
              borderColor: 'grey.300',
              color: 'text.primary',
              textTransform: 'none',
              borderRadius: '8px',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                borderColor: '#f7bd00',
                backgroundColor: '#fdf0c2',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
              },
            }}
            startIcon={<img src="https://img.icons8.com/ios-filled/20/000000/facebook-new.png" alt="Facebook Icon" />}
          >
            Facebook
          </Button>
        </Box>

        <Divider sx={{ my: 1, color: 'text.secondary', '&::before, &::after': { borderColor: 'grey.300' } }}>Or</Divider>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* 🏷️ Full Name Field - Matched to Login TextField style */}
          <FormControl>
            <FormLabel htmlFor="name" sx={{ mb: 0.5, color: 'text.primary', fontWeight: 'bold' }}>Full Name</FormLabel>
            <TextField
              id="name"
              name="name"
              placeholder="Username"
              required
              fullWidth
              variant="outlined"
              error={nameError}
              helperText={nameErrorMessage}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: 'grey.200', transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out' },
                  '&:hover fieldset': {
                    borderColor: '#f7bd00',
                    boxShadow: '0px 0px 8px rgba(247, 189, 0, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#f7bd00',
                    borderWidth: '2px',
                    boxShadow: '0px 0px 8px rgba(247, 189, 0, 0.4)',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'text.secondary',
                  opacity: 1,
                },
              }}
            />
          </FormControl>

          {/* ✉️ Email Field - Matched to Login TextField style */}
          <FormControl>
            <FormLabel htmlFor="email" sx={{ mb: 0.5, color: 'text.primary', fontWeight: 'bold' }}>Email Address</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="Enter Email Address"
              required
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: 'grey.200', transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out' },
                  '&:hover fieldset': {
                    borderColor: '#f7bd00',
                    boxShadow: '0px 0px 8px rgba(247, 189, 0, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#f7bd00',
                    borderWidth: '2px',
                    boxShadow: '0px 0px 8px rgba(247, 189, 0, 0.4)',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'text.secondary',
                  opacity: 1,
                },
              }}
            />
          </FormControl>

          {/* 🔒 Password Field - Matched to Login TextField style with eye icon */}
          <FormControl>
            <FormLabel htmlFor="password" sx={{ mb: 0.5, color: 'text.primary', fontWeight: 'bold' }}>Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              required
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: 'grey.200', transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out' },
                  '&:hover fieldset': {
                    borderColor: '#f7bd00',
                    boxShadow: '0px 0px 8px rgba(247, 189, 0, 0.4)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#f7bd00',
                    borderWidth: '2px',
                    boxShadow: '0px 0px 8px rgba(247, 189, 0, 0.4)',
                  },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'text.secondary',
                  opacity: 1,
                },
              }}
              InputProps={{
                endAdornment: (
                  <img
                    src={showPassword ? "https://img.icons8.com/ios-glyphs/30/000000/invisible.png" : "https://img.icons8.com/ios-filled/20/000000/visible--v1.png"}
                    alt="Toggle visibility"
                    style={{ cursor: 'pointer' }}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  />
                ),
              }}
            />
          </FormControl>

          {/* ✅ Terms & Conditions - Adjusted text color to match login page's text secondary */}
          <FormControlLabel
            control={
              <Checkbox
                value="agree"
                sx={{
                  color: 'grey.500',
                  '&.Mui-checked': {
                    color: '#f7bd00',
                  },
                }}
              />
            }
            label={
              <Typography variant="body2" color="text.secondary">
                I agree to{" "}
                <Link href="#" variant="body2" sx={{ textDecoration: 'none', color: '#f7bd00', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}>
                  terms & conditions
                </Link>
              </Typography>
            }
            sx={{ mb: 2 }}
          />

          {/* 🔘 Sign-up Button - Matched to Login submit button style */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              backgroundColor: '#f7bd00', // Yellow color
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#e0a900', // Darker yellow on hover
                boxShadow: '0px 4px 15px rgba(247, 189, 0, 0.4)', // Added shadow on hover
              },
            }}
          >
            Sign Up
          </Button>

          {/* Already have an account? - Matched to Login Link style */}
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2, color: 'text.secondary' }}>
            Already have an account?{" "}
            <Link href="/login" variant="body2" sx={{ textDecoration: 'none', color: '#f7bd00', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
