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
  Chip
} from "@mui/material"
import { Save } from "lucide-react";
import DashboardLayout from "../DashBoard/DashboardLayout";
import type { BorrowerData, BorrowerDetails } from "../../Interface/interface";
import LoadingScreen from "../../Component/Loading";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
  import { useNavigate } from "react-router-dom";


const BorrowerDetailPage: React.FC = () => {
  const { transactionNo } = useParams<{ transactionNo: string }>();
  // const API_BASE_URL = "https://localhost:44365";
  const API_BASE_URL = "https://rbmanimtim.bsite.net"
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

 const [loading, setloading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const handleUpdatePayment = async (dto: BorrowerDetails) => {
    try{
setSaving(true);
   const res = await fetch(`${API_BASE_URL}/api/GoogelSheet/updatePayment`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(dto),
});
if (res.ok) {
     

      const response = await fetch(`${API_BASE_URL}/api/GoogelSheet/borrowerByTransactionNo?transactionNo=${transactionNo}`);

      if (!response.ok) throw new Error("Failed to fetch borrower");

      const json = await response.json();
      console.log("Raw API response:", json);

      // Unwrap the nested borrowerData object
      const data: BorrowerData = json.borrowerData ?? json; 
      setBorrowerData(data);

       Swal.fire({
        icon: "success",
        title: "Update",
        text: "Payment has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      const errorData = await res.json();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorData.message || "Failed to update borrower data.",
      });
    }
    }catch(err){

    }finally{
setSaving(false)
    }
  
  };

const handlePaymentChange = (
  id: string, // id of the BorrowerDetails to update
  field: keyof BorrowerDetails,
  value: string
) => {
  setBorrowerData(prev => ({
    ...prev,
    borrowerDetails: prev.borrowerDetails.map(detail =>
      detail.id === id ? { ...detail, [field]: value } : detail
    )
  }));
};

  const handleBorrowerChange = (field: keyof BorrowerData, value: any) => {
    setBorrowerData({ ...borrowerData, [field]: value });
  };

useEffect(() => {
  const fetchBorrower = async () => {
    try {
      setloading(true)
      const response = await fetch(`${API_BASE_URL}/api/GoogelSheet/borrowerByTransactionNo?transactionNo=${transactionNo}`);

      if (!response.ok) throw new Error("Failed to fetch borrower");

      const json = await response.json();
      console.log("Raw API response:", json);

      // Unwrap the nested borrowerData object
      const data: BorrowerData = json.borrowerData ?? json; 
      setBorrowerData(data);

    } catch (err) {
      console.error("Failed to fetch borrower", err);
    }
    finally{
      setloading(false)
    }
  };

  fetchBorrower();
}, []);




  useEffect(() => {
    if (borrowerData) {
      console.log("UPDATED BORROWER:", borrowerData);
    }
  }, [borrowerData]);

  // Helper to format date for type="date" inputs
  const formatDateForInput = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };


  const handleUpdate = async () => {
    try{
      setSaving(true)
  const res = await fetch(`${API_BASE_URL}/api/GoogelSheet/update`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(borrowerData),
});

if (res.ok) {
     

      const response = await fetch(`${API_BASE_URL}/api/GoogelSheet/borrowerByTransactionNo?transactionNo=${transactionNo}`);

      if (!response.ok) throw new Error("Failed to fetch borrower");

      const json = await response.json();
      console.log("Raw API response:", json);

      // Unwrap the nested borrowerData object
      const data: BorrowerData = json.borrowerData ?? json; 
      setBorrowerData(data);

       Swal.fire({
        icon: "success",
        title: "Saved!",
        text: "Borrower data has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      const errorData = await res.json();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorData.message || "Failed to update borrower data.",
      });
    }

    }catch(err){
console.log(err)
    }
    finally{
 setSaving(false)
    }

  };

  const navigate = useNavigate();
const handleBackClick = () => {
    
   navigate(`/borrowersList`);
  };

  return (
    <DashboardLayout userName="Roland Manimtim">
      {loading && <LoadingScreen message="Fetching data. Please wait..." />}
       {saving && <LoadingScreen message="Updating. Please wait..." />}
      <Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" >
        <Typography variant="h5" fontWeight={700} color="#4caf50" mb={3}>
          Borrower Detail
        </Typography>
        <Box>
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
                     </Box>
        </Stack>
        {/* Borrower Form */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {/* Left Column */}
            <Stack spacing={2} sx={{ flex: 1 }}>
              <TextField
                disabled
                type="text"
                label="Transaction No"
                value={borrowerData?.transactionNo ?? ""}
                fullWidth
                size="small"
              />
              <TextField
              disabled={borrowerData.status ==="Paid"}
                label="Borrower Name"
                value={borrowerData?.borrowerName ?? ""}
                onChange={(e) => handleBorrowerChange("borrowerName", e.target.value)}
                fullWidth
                size="small"
              />
              <TextField
              disabled={borrowerData.status ==="Paid"}
                label="Borrowed Date"
                type="date"
                value={formatDateForInput(borrowerData?.borrowedDate)}
                onChange={(e) => handleBorrowerChange("borrowedDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
              />
              <TextField
              disabled={borrowerData.status ==="Paid"}
                label="Beggining Balance"
                type="number"
                value={borrowerData?.begginingBalance ?? ""}
                onChange={(e) => handleBorrowerChange("begginingBalance", e.target.value)}
                fullWidth
                size="small"
              />
             <TextField
  disabled
  label="Interest Amount"
  value={
    "₱" +
    Number(borrowerData?.interestAmount || 0).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
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
                value={borrowerData?.status ?? ""}
                fullWidth
                size="small"
              >
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
              </TextField>
              <TextField
              disabled={borrowerData.status ==="Paid"}
                label="Address"
                value={borrowerData?.address ?? ""}
                onChange={(e) => handleBorrowerChange("address", e.target.value)}
                fullWidth
                size="small"
              />
              <TextField
              disabled={borrowerData.status ==="Paid"}
                label="Contact"
                value={borrowerData?.contact ?? ""}
                onChange={(e) => handleBorrowerChange("contact", e.target.value)}
                fullWidth
                size="small"
              />
            <TextField
  disabled
  label="Ending Balance"
  value={
    "₱" +
    Number(borrowerData?.endingBalance || 0).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
  fullWidth
  size="small"
/>

               <TextField
  disabled
  label="Receivable Amount"
  value={
    "₱" +
    (
      Number(borrowerData.begginingBalance) +
      Number(borrowerData.interestAmount)
    ).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
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
              Payment History
            </Typography>
            
          </Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Payment No.</TableCell>
                <TableCell>Amount To Paid</TableCell>
                <TableCell>Schedule Payment Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actual Amount Paid</TableCell>
                <TableCell>Actual Date Paid</TableCell>
                <TableCell>Is Overdue</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrowerData?.borrowerDetails?.map((p, idx) => (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <TextField
                    disabled
                      type="number"
                      value={p.amountToPaid ?? ""}
                      //onChange={(e) => handlePaymentChange(p.id ,"amountToPaid", e.target.value)}
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                    disabled
                      type="date"
                      value={formatDateForInput(p.schedulePaymentDate)}
                      //onChange={(e) => handlePaymentChange(p.id, "schedulePaymentDate", e.target.value)}
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={p.status ?? ""} color={ p.status === "Paid"? "success":"warning"} variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>
                    <TextField
                    disabled = {p.status === "Paid" || borrowerData.status === "Paid"}
                      type="text"
                      value={p.actualAmountToPaid ?? ""}
                      onChange={(e) => handlePaymentChange(p.id, "actualAmountToPaid", e.target.value)}
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                     disabled = {p.status === "Paid" || borrowerData.status === "Paid"}
                      type="date"
                      value={formatDateForInput(p.actualDatePaid)}
                      onChange={(e) => handlePaymentChange(p.id, "actualDatePaid", e.target.value)}
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={p.isOverDue} color={ p.isOverDue === "No" ? "success": "warning"} variant="outlined" sx={{ fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>
                    <IconButton color="success" onClick={() => handleUpdatePayment(p)} sx={{display: p.status ==="Paid" || borrowerData.status === "Paid"? "none":"flex"}}>
                      <Save />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </DashboardLayout>
  );
};

export default BorrowerDetailPage;
