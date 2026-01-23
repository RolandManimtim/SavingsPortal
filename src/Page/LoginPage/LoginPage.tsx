import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  Alert,
} from "@mui/material";
import { PiggyBank, Landmark, PhilippinePeso } from "lucide-react";
import { motion } from "framer-motion";
import { loginUser } from "./Login";
import LoadingScreen from "../../Component/Loading";

const MoneyLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
setLoading(true)
    try {
      const result = await loginUser(email, password);
       console.log("log in success", result);
      if (result.email !== undefined) {
        console.log("log in success")
        // save user info to local storage or context
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("userName", result.name);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
    finally{
        setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #d0f0c0 0%, #f5f5f5 100%)",
        px: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
        {loading && <LoadingScreen message="Logging in..." />}
      <Box
        sx={{
          position: "absolute",
          top: "-50px",
          left: "-50px",
          fontSize: "200px",
          color: "rgba(102, 187, 106, 0.08)",
          pointerEvents: "none",
          transform: "rotate(-20deg)",
        }}
      >
        💰💵🪙
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: 400, zIndex: 1 }}
      >
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4, position: "relative" }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: "transparent", color: "black" }}>
                <PiggyBank size={28} />
              </Avatar>
              <Avatar sx={{ bgcolor: "transparent", color: "black" }}>
                <PhilippinePeso size={28} />
              </Avatar>
              <Avatar sx={{ bgcolor: "transparent", color: "black" }}>
                <Landmark size={28} />
              </Avatar>
            </Stack>

            <Typography color="#66bb6a" variant="h5" fontWeight={700}>
              Savings Portal
            </Typography>

            <Typography variant="body2" color="text.secondary" textAlign="center">
              Manage your savings and financial transactions
            </Typography>
          </Box>

          <Box component="form" sx={{ mt: 3 }} onSubmit={handleLogin}>
            <Stack spacing={2}>
              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ py: 1.5, borderRadius: 2, backgroundColor: "#66bb6a" }}
              >
                Log In
              </Button>
            </Stack>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default MoneyLoginPage;
