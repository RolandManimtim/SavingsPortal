import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
  FormControl,
  Select,
  MenuItem,
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
import type { BarChartDetails, DashboardEtails } from "../../Interface/interface";
import LoadingScreen from "../../Component/Loading";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";



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

const [barchartDetails, setBarchartDetails] = useState<BarChartDetails[]>([]);

   const [loading, setloading] = useState<boolean>(false);

    const [dashBoardLoading, setDashloading] = useState<boolean>(false);
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


const currentYear = new Date().getFullYear();

const [selectedYear, setSelectedYear] = useState<number>(currentYear);

const years = Array.from({ length: 8 }, (_, i) => currentYear - i);
  useEffect(() => {
    const fetchBarchart = async () => {
      try {
        setDashloading(true)
        const response = await fetch(`${API_BASE_URL}/api/GoogelSheet/barchartDetails?year=${selectedYear}`);
  
        if (!response.ok) throw new Error("Failed to fetch borrower");
  
        const json = await response.json();
        console.log(json, "barchart")
        setBarchartDetails(json.barchartDetails)
        console.log("Raw API response:", json);
  
      } catch (err) {
        console.error("Failed to fetch borrower", err);
      }
      finally{
        setDashloading(false)
      }
    };
  
    fetchBarchart();
  }, [selectedYear]);

    const navigate = useNavigate();
  const handleViewClick = () => {
    
   navigate(`/client`);
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

  {/* Active Borrowers - Green */}
  <Paper sx={{ flex: 1, p: 3, borderRadius: 3, bgcolor: "#f1f8e9" }}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ bgcolor: "#c5e1a5" }}>
        <User color="#2e7d32" />
      </Avatar>

      <Box
        onClick={() => handleViewClick()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          borderRadius: 2,
          backgroundColor: hovered ? "#e8f5e9" : "#f1f8e9",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Typography variant="subtitle2" color="text.secondary">
          Active Borrowers
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          {dashboardDetails.activeClient}
        </Typography>
      </Box>
    </Stack>
  </Paper>


  {/* Capital - Blue */}
  <Paper sx={{ flex: 1, p: 3, borderRadius: 3, bgcolor: "#e3f2fd" }}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ bgcolor: "#bbdefb" }}>
        <HandCoins color="#1565c0" />
      </Avatar>

      <Box
        onClick={() => handleViewClick()}
        onMouseEnter={() => setHoveredCap(true)}
        onMouseLeave={() => setHoveredCap(false)}
        sx={{
          borderRadius: 2,
          backgroundColor: hoveredCap ? "#e1f5fe" : "#e3f2fd",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          },
        }}
      >
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


  {/* Collections - Purple */}
  <Paper sx={{ flex: 1, p: 3, borderRadius: 3, bgcolor: "#f3e5f5" }}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ bgcolor: "#e1bee7" }}>
        <Boxes color="#7b1fa2" />
      </Avatar>

      <Box
        onClick={() => handleViewClick()}
        onMouseEnter={() => setHoveredCol(true)}
        onMouseLeave={() => setHoveredCol(false)}
        sx={{
          borderRadius: 2,
          backgroundColor: hoveredCol ? "#f8bbd0" : "#f3e5f5",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          },
        }}
      >
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


  {/* Loans - Orange */}
  <Paper sx={{ flex: 1, p: 3, borderRadius: 3, bgcolor: "#fff3e0" }}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ bgcolor: "#ffcc80" }}>
        <CircleDollarSign color="#ef6c00" />
      </Avatar>

      <Box
        onClick={() => handleViewClick()}
        onMouseEnter={() => setHoveredLol(true)}
        onMouseLeave={() => setHoveredLol(false)}
        sx={{
          borderRadius: 2,
          backgroundColor: hoveredLol ? "#ffe0b2" : "#fff3e0",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          },
        }}
      >
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


  {/* Interest Earned - Gold */}
  <Paper sx={{ flex: 1, p: 3, borderRadius: 3, bgcolor: "#fffde7" }}>
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ bgcolor: "#fff59d" }}>
        <BanknoteArrowUp color="#f9a825" />
      </Avatar>

      <Box
        onClick={() => handleViewClick()}
        onMouseEnter={() => setHoveredInt(true)}
        onMouseLeave={() => setHoveredInt(false)}
        sx={{
          borderRadius: 2,
          backgroundColor: hoveredInt ? "#fff9c4" : "#fffde7",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          },
        }}
      >
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
  
       
        <Paper
  sx={{
    p: 3,
    borderRadius: 3,
    bgcolor: "#f8fafc",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  }}
>
 <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    mb={2}
  >
    <Typography
      variant="h6"
      fontWeight={700}
      sx={{ color: "#1e293b" }}
    >
      Cash Flow
    </Typography>

    <FormControl size="small" sx={{ minWidth: 120 }}>
      <Select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
      >
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Stack>
 {dashBoardLoading ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={300}
    >
      <CircularProgress /> 
      <Typography ml={3}>Loading....</Typography>
    </Box>
  ) : (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={barchartDetails}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      
      <XAxis
        dataKey="month"
        tick={{ fill: "#64748b", fontSize: 12 }}
        axisLine={{ stroke: "#cbd5e1" }}
      />
      
      <YAxis
        tick={{ fill: "#64748b", fontSize: 12 }}
        axisLine={{ stroke: "#cbd5e1" }}
      />
      
      <Tooltip
        contentStyle={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      />

      {/* Collection - Green */}
      <Bar
        dataKey="collection"
        name="Collection"
        fill="#16a34a"
        barSize={24}
        radius={[6, 6, 0, 0]}
      />

      {/* Loan - Red */}
      <Bar
        dataKey="loan"
        name="Loan"
        fill="#dc2626"
        barSize={24}
        radius={[6, 6, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
  )}
</Paper>
        
      </Box>
    
    </DashboardLayout>
  );
};

export default Dashboard;
