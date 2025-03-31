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
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon } from "./CustomIcons"; // Only Google Login used
import { useNavigate } from "react-router-dom";
// 🚀 Glassmorphic Card Styling with Hover Effects
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: { maxWidth: "450px" },
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  borderRadius: "12px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
  },
}));

// 🚀 Background with Dark Mode Support
const SignInContainer = styled(Stack)(() => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "radial-gradient(circle at 50% 0%, rgba(100, 255, 218, 0.05), transparent 70%) !important",
  backgroundSize: "cover",
 
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  "&.dark-mode": {
    backgroundColor: "rgba(100, 255, 218, 0.05)",
    color: "white",
  },
}));

export default function LoginForm() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
    <SignInContainer  className="bg-white-500">
      <CssBaseline />
      <Card variant="outlined">
        {/* 🏁 App Name "FixMyRide" */}
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", textAlign: "center", color: "#00ff99" }}>
          🚗 FixMyRide
        </Typography>

        {/* 🔑 Sign-in Heading */}
        <Typography component="h1" variant="h4" sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)", color: "#00ff99", textAlign: "center" }}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* ✉️ Email Field */}
          <FormControl>
            <FormLabel htmlFor="email" sx={{ color: "white" }}>Email</FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              required
              fullWidth
              variant="outlined"
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)" },
                "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0px 4px 15px rgba(100, 255, 218, 0.3)",
                    },
                    "&.Mui-focused": {
                        transform: "scale(1.05)",
                        border: "2px solid #00ccff",
                        boxShadow: "0px 6px 20px rgba(0, 204, 255, 0.5)",
                    },
                },
              }}
            />
          </FormControl>

          {/* 🔒 Password Field */}
          <FormControl>
            <FormLabel htmlFor="password" sx={{ color: "white" }}>Password</FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              sx={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": { boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.3)" },
                "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0px 4px 15px rgba(100, 255, 218, 0.3)",
                    },
                    "&.Mui-focused": {
                        transform: "scale(1.05)",
                        border: "2px solid #00ccff",
                        boxShadow: "0px 6px 20px rgba(0, 204, 255, 0.5)",
                    },
                },
              }}
            />
          </FormControl>

          {/* ✅ Remember Me & Forgot Password */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Link href="#" variant="body2" sx={{ color: "#00ff99", "&:hover": { textDecoration: "underline" } }}>
              Forgot your password?
            </Link>
          </Box>

          {/* 🔘 Sign-in Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              background: "#00ff99",
              color: "#0A1F2F",
              fontWeight: "bold",
              "&:hover": { background: "#00ccff" },
              transition: "all 0.3s ease-in-out",
              cursor: "pointer",
              
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          {/* 🔽 Divider */}
          <Divider sx={{ background: "rgba(255, 255, 255, 0.2)" }}>or</Divider>

          {/* 🌍 Social Login Buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button fullWidth variant="outlined" onClick={() => window.location.href = "http://localhost:5000/auth/google"} startIcon={<GoogleIcon />}>
              Sign in with Google
            </Button>
          </Box>

          {/* 🔹 Sign-up Link (Centered) */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            do you have a account?
            <Link href="/signup" variant="body2" sx={{ color: "#00ff99", "&:hover": { textDecoration: "underline" } }}>
              &nbsp; Sign up
            </Link>
          </Box>
        </Box>
      </Card>
    </SignInContainer>
  );
}
