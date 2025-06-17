import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon } from "./CustomIcons";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async(event) => {
    event.preventDefault(); // Prevent default form submission
  
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
  
    let hasError = false;
  
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

    if (!agreeToTerms) {
      alert("You must agree to the terms & conditions.");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Needed for session cookies
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store JWT token
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Invalid email or password. Please sign up first.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
    }
    setLoading(false);
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

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: '100%', sm: '40%' },
        mb: { xs: 4, sm: 0 },
      }}>
        <img
          src="/fixmyapp logo.png"
          alt="FixMy Ride Logo"
          style={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '300px',
            objectFit: 'contain',
          }}
        />
      </Box>

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
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5, color: '#333' }}>
          Welcome Back!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Get Sign In to your account
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Sign In With...
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

        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel htmlFor="email" sx={{ mb: 0.5, color: 'text.primary', fontWeight: 'bold' }}>Email Address</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="Enter Email Address"
            autoComplete="email"
            required
            fullWidth
            variant="outlined"
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                '& fieldset': { borderColor: 'grey.200', transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out' },
                '&:hover fieldset': {
                  borderColor: '#f7bd00',
                  boxShadow: '0px 0px 8px rgba(247, 189, 0, 0.4)',
                },
                '&.Mui-focused fieldset': { borderColor: '#f7bd00', borderWidth: '2px', boxShadow: '0px 0px 8px rgba(247, 189, 0, 0.4)' },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'text.secondary',
                opacity: 1,
              },
            }}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="password" sx={{ mb: 0.5, color: 'text.primary', fontWeight: 'bold' }}>Password</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            required
            fullWidth
            variant="outlined"
            size="medium"
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
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                '& fieldset': { borderColor: 'grey.200', transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out' },
                '&:hover fieldset': {
                  borderColor: '#f7bd00',
                  boxShadow: '0px 0px 8px rgba(247, 189, 0, 0.4)',
                },
                '&.Mui-focused fieldset': { borderColor: '#f7bd00', borderWidth: '2px', boxShadow: '0px 0px 8px rgba(247, 189, 0, 0.4)' },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'text.secondary',
                opacity: 1,
              },
            }}
          />
        </FormControl>

        <Box sx={{ textAlign: 'right', mt: -1 }}>
          <Link href="#" variant="body2" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Forgot Password?
          </Link>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            py: 1.5,
            backgroundColor: '#f7bd00',
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#e0a900',
            },
          }}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>

        <Typography variant="body2" sx={{ textAlign: "center", mt: 2, color: 'text.secondary' }}>
          Don't have an account?{" "}
          <Link href="/signup" variant="body2" sx={{ textDecoration: 'none', color: '#f7bd00', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }}>
            Create account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
