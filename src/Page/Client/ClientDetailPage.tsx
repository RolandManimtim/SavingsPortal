import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Stack,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  MenuItem,
  Chip,
  TablePagination,
  TableContainer,
  Tooltip,
  CircularProgress,
  Modal
} from "@mui/material"
import DashboardLayout from "../DashBoard/DashboardLayout";
import type { Borrower, BorrowerData, Client, Pagination } from "../../Interface/interface";
import LoadingScreen from "../../Component/Loading";
import { useParams } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
import { Edit, Visibility } from "@mui/icons-material";
import { createBorrower } from "../Borrowers/Borrowers";


const ClientDetailPage: React.FC = () => {
  
  const { transactionNo } = useParams<{ transactionNo: string }>();
   //const API_BASE_URL = "https://localhost:44365";
  const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT;
  console.log(API_BASE_URL, "test")
 const [borrowerData, setBorrowerData] = useState<BorrowerData>({
  borrowerName: "",
  borrowedDate: "",
  begginingBalance: "",
  endingBalance: "",
  status: "",
  address: "",
  contact: "",
  transactionNo: "",
  interestAmount: "",
  borrowerDetails:[]
});

const [clientData, setClientData] = useState<Client>({} as Client);

 const [loading, setloading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

 
  const handleBorrowerChange = (field: keyof BorrowerData, value: any) => {
    setBorrowerData({ ...borrowerData, [field]: value });
  };

useEffect(() => {
  const fetchClient = async () => {
    try {
      setloading(true)
      const response = await fetch(`${API_BASE_URL}/api/GoogelSheet/clientByClientCode?clientCode=${transactionNo}`);

      if (!response.ok) throw new Error("Failed to fetch borrower");

      const json = await response.json();
      console.log("Raw API response:", json.clientData);

      // Unwrap the nested borrowerData object
      const data: Client = json.clientData ?? json; 
      console.log(data, "clientdata")
      setClientData(data);

    } catch (err) {
      console.error("Failed to fetch borrower", err);
    }
    finally{
      setloading(false)
    }
  };

  fetchClient();
}, []);




  useEffect(() => {
    if (borrowerData) {
      console.log("UPDATED BORROWER:", borrowerData);
    }
  }, [borrowerData]);

  // Helper to format date for type="date" inputs


const formatDateForInput1 = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };
 

  const navigate = useNavigate();

  const [borrowersData, setBorrowersData] = useState<Borrower[]>([]);
const [pagination, setPagination] = useState<Pagination>({
  page: 1,
  pageSize: 5,
  totalCount: 0,
  totalPage: 0,
});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const fetchBorrowers = async () => {
      setloading(true);
      try {
        const params = new URLSearchParams({
  page: (page + 1).toString(), // API page starts at 1
  pageSize: rowsPerPage.toString(),
  nameFilter: transactionNo || "",      // empty string if undefined
  statusFilter: "",  // empty string if undefined
  fromDate: "",
  toDate:  "",
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
        setloading(false);
      }
    };

     useEffect(() => {
        fetchBorrowers();
      }, [page, rowsPerPage]);
    
    
       const handleEditClick = (transactionNo: string) => {
    
   navigate(`/borrowersDetails/${transactionNo}`);
  };

    const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

     const handleModalClose = () => setOpenModal(false);
       const [openModal, setOpenModal] = useState(false);
      const [isForRenewal, setIsForRenewal] = useState(false);
        const [newBorrower, setNewBorrower] = useState<Borrower>({
           name: clientData.clientName,
           borrowedDate: "",
           amount: 0,
           status: "Unpaid",
           address: "",
           contact: "",
           transactionNumber:"",
           interestAmount:"",
           clientCode:transactionNo
         });
   const handleSaveBorrower = async () => {
  try {
      handleModalClose();
      setSaving(true);
     if (isForRenewal) {
  const today = new Date().toISOString().split("T")[0]; // "2026-02-08"
  console.log(today, "gtodays")
  setNewBorrower({ ...newBorrower, borrowedDate: today });
}
      setNewBorrower({ ...newBorrower, clientCode: transactionNo });
       setNewBorrower({ ...newBorrower, name: "234" });
      console.log(transactionNo, "clientCode")
  // Call backend API
  const response = await createBorrower(newBorrower, clientData.clientName);
   console.log(response, newBorrower,"save")
  // Update local state
  setBorrowersData([...borrowersData, newBorrower]);
  
  // Reset form and close modal
  setNewBorrower({ name: clientData.clientName, borrowedDate: "", amount: 0, status: "Unpaid", address: "", contact: "",transactionNumber:"", interestAmount:0 ,clientCode:transactionNo});
  
  
  fetchBorrowers()
  } catch (error) {
  console.error("Failed to save borrower:", error);
  alert("Failed to save borrower. Please try again.");
  }
  finally{
      setSaving(false);
  }
  };
  
  const handleCompute = (value :string) => {
    
  const interestAmount = Number(value) * 0.20;
  newBorrower.interestAmount = interestAmount.toString();
  setNewBorrower({ ...newBorrower, amount: value, interestAmount: interestAmount.toString() })

  console.log(newBorrower, interestAmount, "onchange");
  };

const handleModalOpen = (isRenew: boolean) => {
  setOpenModal(true);
  setIsForRenewal(isRenew);
};
const hasUnpaid = borrowersData?.length > 0 &&
  borrowersData.every(
    (b) => b.status === "Paid"
  );
  return (
    <DashboardLayout userName="Roland Manimtim">
      {loading && <LoadingScreen message="Fetching data. Please wait..." />}
       {saving && <LoadingScreen message="Updating. Please wait..." />}
      <Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" >
        <Typography variant="h5" fontWeight={700} color="#4caf50" mb={3}>
          Client Detail
        </Typography>
        {/* <Box>
         <Button 
           onClick={() => handleBackClick()}
         variant="contained"  sx={{ borderRadius: 2, textTransform: "none", backgroundColor:"white", color:"black" }} >
                       Back
                     </Button>
                      <Button 
                      onClick={() => handleUpdate()}
                      variant="contained" color="success" sx={{ml:2, borderRadius: 2, textTransform: "none" }} >
                       Update
                     </Button>
                     </Box> */}
        </Stack>
        {/* Borrower Form */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {/* Left Column */}
            <Stack spacing={2} sx={{ flex: 1 }}>
              <TextField
                disabled
                type="text"
                label="Client Code"
                value={clientData?.clientCode ?? ""}
                fullWidth
                size="small"
              />
              <TextField
              disabled={true}
                label="Client Name"
                value={clientData?.clientName ?? ""}
                onChange={(e) => handleBorrowerChange("borrowerName", e.target.value)}
                fullWidth
                size="small"
              />
              <TextField
              disabled
                label="Registered Date"
                type="date"
                value={formatDateForInput1(clientData?.registeredDate)}
                onChange={(e) => handleBorrowerChange("borrowedDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
              />
 

            </Stack>

            {/* Right Column */}
            <Stack spacing={2} sx={{ flex: 1 }}>
              <TextField
                disabled
                label="Status"
                type="text"
                value={clientData?.status ?? ""}
                fullWidth
                size="small"
              >
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
              </TextField>
              <TextField
              disabled
                label="Address"
                value={clientData?.address ?? ""}
                onChange={(e) => handleBorrowerChange("address", e.target.value)}
                fullWidth
                size="small"
              />
              <TextField
              disabled
                label="Contact"
                value={clientData?.contactNumber ?? ""}
                onChange={(e) => handleBorrowerChange("contact", e.target.value)}
                fullWidth
                size="small"
              />

            </Stack>
          </Stack>
        </Paper>

        {/* Payment History Table */}
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight={700}>
              Transaction History
            </Typography>
              <Box>
                          <Button variant="contained" color="success" 
                          sx={{display: borrowersData.length > 0 && hasUnpaid ? "flex": "none", borderRadius: 2, textTransform: "none", ml:2}} onClick={() => handleModalOpen(true)}>
                           Renew
                        </Button>
                        <Button variant="contained" color="success" 
                        sx={{ display: borrowersData.length === 0? "flex":"none", borderRadius: 2, textTransform: "none", ml:2}} onClick={() => handleModalOpen(false)}>
                          Add 
                        </Button>
                        </Box>
          </Stack>

                     
                      <Paper elevation={5} sx={{ mt:0, borderRadius: 3, overflow: "hidden", backgroundColor: "#ffffff" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f0fdf4" }}>
                    <TableCell sx={{ fontWeight: 700 }}>Transaction No.</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Borrowed Date</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Borrowed Amount</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Interest Amount</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
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
                        <TableCell>{b.borrowedDate}</TableCell>
                        <TableCell>₱{b.amount}</TableCell>
                        <TableCell>₱{b.interestAmount}</TableCell>
                        <TableCell>
                          <Chip label={b.status} color={b.status === "Paid" ? "success" : "warning"} variant="outlined" sx={{ fontWeight: 600 }} />
                        </TableCell>
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
                        No Data Available.
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
                   </Paper>
 {/* Add Borrower Modal */}
          <Modal open={openModal} onClose={handleModalClose}>
            <Paper sx={{ p: 4, width: { xs: "90%", sm: 400 }, mx: "auto", mt: "10%", borderRadius: 3, outline: "none" }}>
              <Typography variant="h6" fontWeight={700} mb={2} color="#4caf50">Add</Typography>
              <Stack spacing={2}>
                <TextField sx={{display:isForRenewal? "none":"flex"}} label="Borrowed Date" type="date" value={newBorrower.borrowedDate} onChange={(e) => setNewBorrower({ ...newBorrower, borrowedDate: e.target.value })} InputLabelProps={{ shrink: true }} fullWidth size="small" />
                <TextField label="Amount" type="number" value={newBorrower.amount} onChange={(e) => handleCompute(e.target.value)} fullWidth size="small" />
                    <TextField disabled label="Interest Ammount" type="number" value={newBorrower.interestAmount} fullWidth size="small" />
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button variant="outlined" onClick={handleModalClose} sx={{ color: "white", backgroundColor: "#4b4b4bff" }}>Cancel</Button>
                  <Button variant="contained" color="success" onClick={handleSaveBorrower}>Save</Button>
                </Stack>
              </Stack>
            </Paper>
          </Modal>
        
      </Box>
    </DashboardLayout>
  );
};

export default ClientDetailPage;
