import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Stack,
  Button,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import { AccountBalance, BarChart, Dashboard, Logout, Paid, People } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface DashboardLayoutProps {
  userName: string;
  children: React.ReactNode;
}

const menuItems = ["Dashboard", "Cash Flow", "Money Lending", "Reports"];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userName, children }) => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    if (menu === "Dashboard") navigate("/dashboard");
    if (menu === "Reports") navigate("/reports");
    // Money Lending main click could also navigate if needed
  };

  const handleMoneyLendingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubMenuClick = (subItem: string) => {
    setAnchorEl(null);
    if (subItem === "borrowersList") {
      navigate("/borrowersList");
      setActiveMenu("Money Lending");
    }
    // Add other subitems here
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #eafaf1 0%, #f5f5f5 100%)" }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Menu buttons */}
          <Stack direction="row" spacing={2}>
           {menuItems.map((item) =>
  item === "Money Lending" ? (
    <React.Fragment key={item}>
      <Button
        color={activeMenu === item ? "secondary" : "inherit"}
        onClick={handleMoneyLendingClick}
        sx={{ textTransform: "none" }}
        startIcon={<AccountBalance />} // Add icon here
      >
        {item}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <MenuItem onClick={() => handleSubMenuClick("borrowersList")} >
          <People fontSize="small" sx={{ mr: 1 }} /> Borrowers
        </MenuItem>
        {/* Add more subitems here */}
      </Menu>
    </React.Fragment>
  ) : (
    <Button
      key={item}
      color={activeMenu === item ? "secondary" : "inherit"}
      onClick={() => handleMenuClick(item)}
      sx={{ textTransform: "none" }}
      startIcon={
        item === "Dashboard" ? <Dashboard /> :
        item === "Cash Flow" ? <Paid /> :
        item === "Reports" ? <BarChart /> :
        null
      }
    >
      {item}
    </Button>
  )
)}

          </Stack>

          {/* User info / logout */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="body1">{userName}</Typography>
            <IconButton onClick={handleLogout} color="inherit">
              <Logout />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box>{children}</Box>
    </Box>
  );
};

export default DashboardLayout;
