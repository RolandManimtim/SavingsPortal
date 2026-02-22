import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import { User,HandCoins,Boxes, CircleDollarSign, BanknoteArrowUp } from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import DashboardLayout from "./DashboardLayout";
import type { DashboardEtails } from "../../Interface/interface";
import LoadingScreen from "../../Component/Loading";
import { useNavigate } from "react-router-dom";

const data = [
  { month: "Jan", collection: 5000, loan: 2000 },
  { month: "Feb", collection: 4500, loan: 2500 },
  { month: "Mar", collection: 6000, loan: 3000 },
  { month: "Apr", collection: 5500, loan: 2200 },
  { month: "May", collection: 7000, loan: 3500 },
  { month: "Jun", collection: 6500, loan: 2800 },
];



const MyusersName = localStorage.getItem("userName") || "";
const Dashboard: React.FC = () => {
  // const API_BASE_URL = "https://localhost:44365";
  const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;
const [dashboardDetails, setDashboardDetails] = useState<DashboardEtails>({
  activeClient: 0,
  capital: 0,
  collections: 0,
  loan: 0,
  interestEarned:0
});
   const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    const fetchBorrower = async () => {
      try {
        setloading(true)
        const response = await fetch(`${API_BASE_URL}/api/GoogelSheet/dashboardDetails`);
  
        if (!response.ok) throw new Error("Failed to fetch borrower");
  
        const json = await response.json();
        setDashboardDetails(json.data)
        console.log("Raw API response:", json);
  
      } catch (err) {
        console.error("Failed to fetch borrower", err);
      }
      finally{
        setloading(false)
      }
    };
  
    fetchBorrower();
  }, []);

    const navigate = useNavigate();
  const handleViewClick = () => {
    
   navigate(`/borrowersList`);
  };

  const [hovered, setHovered] = useState(false);
  const [hoveredCap, setHoveredCap] = useState(false);
  const [hoveredCol, setHoveredCol] = useState(false);
  const [hoveredLol, setHoveredLol] = useState(false);
  const [hoveredInt, setHoveredInt] = useState(false);
  return (
     <DashboardLayout userName={MyusersName}  >
{loading && <LoadingScreen message="Dashboard Loading. Please wait..." />}
      {/* Main content */}
      <Box sx={{ p: 4 }}>
        {/* Only show dashboard content if active menu is Dashboard */}
        
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} mb={3}>
            <Paper sx={{ flex: 1, p: 3, borderRadius: 3 }} >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "rgba(46,125,50,0.2)" }}>
                  <User color="#2e7d32" />
                </Avatar>
                <Box  onClick={() => handleViewClick()} 
                onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
                sx={{
        borderRadius: 2,
        backgroundColor: hovered ? "rgba(46,125,50,0.1)" : "white",
        cursor: "pointer",
       
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        },
      }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Active Borrowers
                  </Typography>
                 <Typography variant="h6" fontWeight={700}>
  {dashboardDetails.activeClient}
</Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper sx={{ flex: 1, p: 3, borderRadius: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "rgba(46,125,50,0.2)" }}>
                  <HandCoins color="#2e7d32" />
                </Avatar>
                  <Box  onClick={() => handleViewClick()} 
                onMouseEnter={() => setHoveredCap(true)}
      onMouseLeave={() => setHoveredCap(false)}
                sx={{
        borderRadius: 2,
        backgroundColor: hoveredCap ? "rgba(46,125,50,0.1)" : "white",
        cursor: "pointer",
       
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        },
      }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Capital
                  </Typography>
                      <Typography variant="h6" fontWeight={700}>
 ₱{Number(dashboardDetails.capital).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</Typography>
                </Box>
              </Stack>
            </Paper>
            <Paper sx={{ flex: 1, p: 3, borderRadius: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "rgba(46,125,50,0.2)" }}>
                  <Boxes color="#2e7d32" />
                </Avatar>
                 <Box onClick={() => handleViewClick()} 
                onMouseEnter={() => setHoveredCol(true)}
      onMouseLeave={() => setHoveredCol(false)}
                sx={{
        borderRadius: 2,
        backgroundColor: hoveredCol ? "rgba(46,125,50,0.1)" : "white",
        cursor: "pointer",
       
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        },
      }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Collections
                  </Typography>
                      <Typography variant="h6" fontWeight={700}>
 ₱{Number(dashboardDetails.collections).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</Typography>
                </Box>
              </Stack>
            </Paper>
            <Paper sx={{ flex: 1, p: 3, borderRadius: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "rgba(244, 233, 233, 0.2)" }}>
                  <CircleDollarSign color="#d39f2f" />
                </Avatar>
                  <Box  onClick={() => handleViewClick()} 
                onMouseEnter={() => setHoveredLol(true)}
      onMouseLeave={() => setHoveredLol(false)}
                sx={{
        borderRadius: 2,
        backgroundColor: hoveredLol ? "rgba(46,125,50,0.1)" : "white",
        cursor: "pointer",
       
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        },
      }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Loans
                  </Typography>
                      <Typography variant="h6" fontWeight={700}>
₱{Number(dashboardDetails.loan).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</Typography>
                </Box>
              </Stack>
            </Paper>
            <Paper sx={{ flex: 1, p: 3, borderRadius: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
               <Avatar sx={{ bgcolor: "rgba(46,125,50,0.2)" }}>
                  <BanknoteArrowUp color="#2e7d32" />
                </Avatar>
               <Box  onClick={() => handleViewClick()} 
                onMouseEnter={() => setHoveredInt(true)}
      onMouseLeave={() => setHoveredInt(false)}
                sx={{
        borderRadius: 2,
        backgroundColor: hoveredInt ? "rgba(46,125,50,0.1)" : "white",
        cursor: "pointer",
       
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        },
      }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Interest Earned
                  </Typography>
                      <Typography variant="h6" fontWeight={700}>
 ₱{Number(dashboardDetails.interestEarned).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>
  
       
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography  variant="h6" fontWeight={700} mb={2}>
              Cash Flow
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      
      {/* Income Bars */}
      <Bar dataKey="collection" name="Collection" fill="#2e7d32" barSize={20} />
      
      {/* Expense Bars */}
      <Bar dataKey="loan" name="Loan" fill="#d32f2f" barSize={20} />
    </BarChart>
  </ResponsiveContainer>
          </Paper>
        
      </Box>
    
    </DashboardLayout>
  );
};

export default Dashboard;
