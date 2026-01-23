import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { motion } from "framer-motion";

const AddBorrowerPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save: you can integrate API here
    alert("Borrower saved!");
    navigate("/dashboard"); // redirect back to dashboard after saving
  };

  const handleCancel = () => {
    navigate("/dashboard");
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
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: 500 }}
      >
        <Paper elevation={10} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight={700} color="#66bb6a" mb={3}>
            Add Borrower
          </Typography>

          <Box component="form" onSubmit={handleSave}>
            <Stack spacing={2}>
              <TextField
                label="Borrower's Name"
                type="text"
                fullWidth
                required
              />
              <TextField
                label="Borrowed Date"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Amount"
                type="number"
                fullWidth
                required
              />

              <Stack direction="row" spacing={2} mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AddBorrowerPage;
