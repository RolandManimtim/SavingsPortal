import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Button,
  TextField,
  MenuItem,
  TablePagination,
  Modal,
  Tooltip,
  IconButton,
  CircularProgress
} from "@mui/material";
import { motion } from "framer-motion";
import { Edit, Visibility } from "@mui/icons-material";
import DashboardLayout from "../DashBoard/DashboardLayout";
import type { Borrower, Pagination } from "../../Interface/interface";
import { createBorrower } from "./Borrowers";
import LoadingScreen from "../../Component/Loading";
import { useNavigate } from "react-router-dom";

// const API_BASE_URL = "https://localhost:44365";

// Define type for borrower
const API_BASE_URL = "https://rbmanimtim.bsite.net"

const BorrowersListPage: React.FC = () => {
  const [borrowersData, setBorrowersData] = useState<Borrower[]>([]);
const [pagination, setPagination] = useState<Pagination>({
  page: 1,
  pageSize: 5,
  totalCount: 0,
  totalPage: 0,
});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Filters
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [newBorrower, setNewBorrower] = useState<Borrower>({
    name: "",
    borrowedDate: "",
    amount: 0,
    status: "Unpaid",
    address: "",
    contact: "",
    transactionNumber:"",
    interestAmount:""
  });

  // Fetch borrowers from API
  const fetchBorrowers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(), // API page starts at 1
        pageSize: rowsPerPage.toString(),
        ...(nameFilter && { nameFilter }),
        ...(statusFilter && { statusFilter }),
        ...(fromDate && { fromDate }),
        ...(toDate && { toDate }),
      });
      const res = await fetch(`${API_BASE_URL}/api/GoogelSheet/borrowers?${params}`);
   const result = await res.json();
      const data: Borrower[] = result.data;
      const paginationInfo: Pagination = {
  page: result.page,
  pageSize: result.pagesize,
  totalPage: result.totalPage,
  totalCount: result.totalCount,
};


setPagination(paginationInfo);
      setBorrowersData(data);
      console.log(data,"test result")
    } catch (err) {
      console.error("Failed to fetch borrowers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch borrowers on mount and when filters/pagination change
  useEffect(() => {
    fetchBorrowers();
  }, [page, rowsPerPage]);

  const handleSearch = () => {
    setPage(0);
    fetchBorrowers();
  };

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

 const handleSaveBorrower = async () => {
try {
    handleModalClose();
    setSaving(true);
// Call backend API
const response = await createBorrower(newBorrower);
 console.log(response, newBorrower,"save")
// Update local state
setBorrowersData([...borrowersData, newBorrower]);

// Reset form and close modal
setNewBorrower({ name: "", borrowedDate: "", amount: 0, status: "Unpaid", address: "", contact: "",transactionNumber:"", interestAmount:0 });


fetchBorrowers()
} catch (error) {
console.error("Failed to save borrower:", error);
alert("Failed to save borrower. Please try again.");
}
finally{
    setSaving(false);
}
};
  const navigate = useNavigate();
 const handleEditClick = (transactionNo: string) => {
    
   navigate(`/borrowersDetails/${transactionNo}`);
  };


const handleCompute = (value :string) => {
    
  const interestAmount = Number(value) * 0.20;
  newBorrower.interestAmount = interestAmount.toString();
  setNewBorrower({ ...newBorrower, amount: value, interestAmount: interestAmount.toString() })

  console.log(newBorrower, interestAmount, "onchange");
  };

    const handleViewClick = () => {
    
   navigate(`/dashboard`);
  };

  return (
    <DashboardLayout userName="Roland Manimtim">
          {saving && <LoadingScreen message="Saving..." />}
      <Box sx={{ width: "100%", minHeight: "100vh", background: "linear-gradient(135deg, #eafaf1 0%, #f5f5f5 100%)", px: { xs: 2, sm: 4 }, py: 4 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h5" fontWeight={700} color="#4caf50">
              Borrowers
            </Typography>
            <Box>
              <Button 
                       onClick={() => handleViewClick()}
                     variant="contained"  sx={{ borderRadius: 2, textTransform: "none", backgroundColor:"white", color:"black" }} >
                                   Back
                                 </Button>
            <Button variant="contained" color="success" sx={{ borderRadius: 2, textTransform: "none", ml:2}} onClick={handleModalOpen}>
              + Add Borrower
            </Button>
            </Box>
          </Stack>

          {/* Filter Section */}
          <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
              <TextField label="Search by Name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} fullWidth size="small" />
              <TextField select label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} fullWidth size="small">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
              </TextField>
              <TextField label="From Date" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth size="small" />
              <TextField label="To Date" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth size="small" />
              <Button variant="contained" sx={{ borderRadius: 2, textTransform: "none", backgroundColor: "#4caf50", color: "#fff", "&:hover": { backgroundColor: "#43a047" } }} onClick={handleSearch}>
                Search
              </Button>
            </Stack>
          </Paper>

          {/* Borrowers Table */}
          <Paper elevation={5} sx={{ borderRadius: 3, overflow: "hidden", backgroundColor: "#ffffff" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f0fdf4" }}>
                    <TableCell sx={{ fontWeight: 700 }}>Transaction Number</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Borrower Name</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Borrowed Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Borrowed Amount</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Interest Amount</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Address</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Contact</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Stack direction="column" alignItems="center" spacing={1}>
                          <CircularProgress size={24} sx={{ color: "#45d39aff" }} />
                          <Typography>Please wait for a moment</Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ) : borrowersData.length > 0 ? (
                    borrowersData.map((b, idx) => (
                      <TableRow key={idx} sx={{ "&:nth-of-type(even)": { backgroundColor: "#f9f9f9" }, "&:hover": { backgroundColor: "#f1fdf5" } }}>
                        <TableCell>{b.transactionNumber}</TableCell>
                        <TableCell>{b.name}</TableCell>
                        <TableCell>{b.borrowedDate}</TableCell>
                        <TableCell>₱{b.amount}</TableCell>
                        <TableCell>₱{b.interestAmount}</TableCell>
                        <TableCell>
                          <Chip label={b.status} color={b.status === "Paid" ? "success" : "warning"} variant="outlined" sx={{ fontWeight: 600 }} />
                        </TableCell>
                        <TableCell>{b.address}</TableCell>
                        <TableCell>0{b.contact}</TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={0}>
                            <Tooltip title="View">
                              <IconButton onClick={() => handleEditClick(b.transactionNumber)} size="small" sx={{ color: "#4382f8" }}>
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit" sx={{display: b.status === "Paid"? "none":"flex"}}>
                              <IconButton   onClick={() => handleEditClick(b.transactionNumber)} size="small" sx={{ color: "#ecad19ff",display: b.status === "Paid"? "none":"flex" }}>
                                <Edit />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} align="center">
                        No borrowers found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
<TablePagination
  component="div"
  count={pagination.totalCount} // total items from API
  page={pagination.page - 1}    // MUI expects 0-based page
  onPageChange={handleChangePage}
  rowsPerPage={pagination.pageSize} 
  onRowsPerPageChange={handleChangeRowsPerPage}
  rowsPerPageOptions={[5, 10, 15]}
/>

          </Paper>

          {/* Add Borrower Modal */}
          <Modal open={openModal} onClose={handleModalClose}>
            <Paper sx={{ p: 4, width: { xs: "90%", sm: 400 }, mx: "auto", mt: "10%", borderRadius: 3, outline: "none" }}>
              <Typography variant="h6" fontWeight={700} mb={2} color="#4caf50">Add Borrower</Typography>
              <Stack spacing={2}>
                <TextField label="Borrower Name" value={newBorrower.name} onChange={(e) => setNewBorrower({ ...newBorrower, name: e.target.value })} fullWidth size="small" />
                <TextField label="Borrowed Date" type="date" value={newBorrower.borrowedDate} onChange={(e) => setNewBorrower({ ...newBorrower, borrowedDate: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth size="small" />
                <TextField label="Address" value={newBorrower.address} onChange={(e) => setNewBorrower({ ...newBorrower, address: e.target.value })} fullWidth size="small" />
                <TextField label="Contact Number" value={newBorrower.contact} onChange={(e) => setNewBorrower({ ...newBorrower, contact: e.target.value })} fullWidth size="small" />
                <TextField label="Amount" type="number" value={newBorrower.amount} onChange={(e) => handleCompute(e.target.value)} fullWidth size="small" />
                    <TextField disabled label="Interest Ammount" type="number" value={newBorrower.interestAmount} fullWidth size="small" />
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button variant="outlined" onClick={handleModalClose} sx={{ color: "white", backgroundColor: "#4b4b4bff" }}>Cancel</Button>
                  <Button variant="contained" color="success" onClick={handleSaveBorrower}>Save</Button>
                </Stack>
              </Stack>
            </Paper>
          </Modal>

        </motion.div>
      </Box>
    </DashboardLayout>
  );
};

export default BorrowersListPage;
