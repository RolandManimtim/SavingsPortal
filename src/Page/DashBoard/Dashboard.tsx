import React from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
} from "@mui/material";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import DashboardLayout from "./DashboardLayout";

const data = [
  { month: "Jan", income: 5000, expense: 2000 },
  { month: "Feb", income: 4500, expense: 2500 },
  { month: "Mar", income: 6000, expense: 3000 },
  { month: "Apr", income: 5500, expense: 2200 },
  { month: "May", income: 7000, expense: 3500 },
  { month: "Jun", income: 6500, expense: 2800 },
];



const usersName = localStorage.getItem("userName") || "";
const Dashboard: React.FC = () => {
  return (
     <DashboardLayout userName={usersName}  >

      {/* Main content */}
      <Box sx={{ p: 4 }}>
        {/* Only show dashboard content if active menu is Dashboard */}
        
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} mb={4}>
            <Paper sx={{ flex: 1, p: 3, borderRadius: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "rgba(46,125,50,0.2)" }}>
                  <ArrowUp color="#2e7d32" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Income
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    ${data.reduce((acc, item) => acc + item.income, 0)}
                  </Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper sx={{ flex: 1, p: 3, borderRadius: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "rgba(211,47,47,0.2)" }}>
                  <ArrowDown color="#d32f2f" />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Expense
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    ${data.reduce((acc, item) => acc + item.expense, 0)}
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
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#2e7d32" strokeWidth={3} />
                <Line type="monotone" dataKey="expense" stroke="#d32f2f" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        
      </Box>
    
    </DashboardLayout>
  );
};

export default Dashboard;
