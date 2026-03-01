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
  Tooltip,
  Modal
} from "@mui/material"
import { Save , Printer} from "lucide-react";
import DashboardLayout from "../DashBoard/DashboardLayout";
import type { BorrowerData, BorrowerDetails } from "../../Interface/interface";
import LoadingScreen from "../../Component/Loading";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
  import { useNavigate } from "react-router-dom";


const BorrowerDetailPage: React.FC = () => {
  
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

 const [loading, setloading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const handleUpdatePayment = async (dto: BorrowerDetails) => {
    try{
      const endingBalance = Number(borrowerData.endingBalance) - Number(dto.actualAmountToPaid)
      dto.endingBalance = endingBalance.toString();
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
  console.log(value,id, "date")
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
useEffect(() => {
 

  fetchBorrower();
}, []);




  // useEffect(() => {
  //   if (borrowerData) {
  //     console.log("UPDATED BORROWER:", borrowerData);
  //   }
  // }, [borrowerData]);

  // Helper to format date for type="date" inputs
 const formatDateForInput = (dateStr?: string) => {
  console.log(dateStr, "test date");
  if (!dateStr) return "";

  // Split MM/dd/yy
  const parts = dateStr.split("/");
  if (parts.length !== 3) return "";

  let [month, day, year] = parts.map(Number);
  if (year < 100) year += 2000; // convert 2-digit year to 20xx

  // Format as yyyy-MM-dd
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
};

const formatDateForInput1 = (dateStr?: string) => {
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
    
   navigate(-1);
  };
const handlePrintReceipt = (p: any) => {
  const receiptWindow = window.open("", "_blank", "width=800,height=600");

  if (!receiptWindow) return;

  receiptWindow.document.write(`
    <html>
      <head>
        <title>Payment Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
          }
          .receipt {
            max-width: 500px;
            margin: auto;
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 8px;
          }
          .title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
          }
          .divider {
            border-top: 1px dashed #999;
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="title">PAYMENT RECEIPT</div>

          <div class="row">
            <span>Client Name:</span>
            <span>${borrowerData.borrowerName}</span>
          </div>

          <div class="row">
            <span>Transaction No:</span>
            <span>${borrowerData.transactionNo}</span>
          </div>

          <div class="divider"></div>

          <div class="row">
  <span>Amount Borrowed:</span>
  <span>₱${Number(borrowerData.begginingBalance).toLocaleString()}</span>
</div>

<div class="row">
  <span>Interest Amount:</span>
  <span>₱${Number(borrowerData.interestAmount).toLocaleString()}</span>
</div>

<div class="row">
  <span>Total Amount:</span>
  <span>₱${(Number(borrowerData.begginingBalance) + Number(borrowerData.interestAmount)).toLocaleString()}</span>
</div>


          <div class="row">
            <span>Date Paid:</span>
            <span>${p.actualDatePaid}</span>
          </div>
<div class="row">
  <span>Amount Paid:</span>
  <span>₱${Number(p.actualAmountToPaid).toLocaleString()}</span>
</div>

<div class="row">
  <span>Remaining Balance:</span>
  <span>₱${Number(p.endingBalance).toLocaleString()}</span>
</div>


          <div class="divider"></div>

          <div style="text-align:center; margin-top:20px;">
            Thank you for your payment.
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
    </html>
  `);

  receiptWindow.document.close();
};

  const [openModal, setOpenModal] = useState(false);
    const handleModalClose = () => setOpenModal(false);


 const handleSaveBorrower = async () => {
try {
    handleModalClose();
    setSaving(true);

// setSaving(true);
const newBalance =
  Number(borrowerData.begginingBalance) + additionalAmount;
const unpaidDetails = borrowerData.borrowerDetails.filter(
  (item: any) => item.status === "Unpaid"
);
const cleanTransactionNo = borrowerData.transactionNo.replace(/\s+/g, '');
await fetch(
  `${API_BASE_URL}/api/GoogelSheet/topUp?name=${borrowerData.borrowerName}
  &transactionNo=${cleanTransactionNo}
  &newBegbal=${newBalance}
  &newInterestAmount=${newBalance * 0.2}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(unpaidDetails)
  }
);
setBorrowerData(prev => {
  const updated = {
    ...prev,
    begginingBalance: newBalance.toString(),
    interestAmount: (newBalance * 0.2).toString(),
  };

  // send to API here
  fetch(`${API_BASE_URL}/api/GoogelSheet/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated),
  });

  return updated;
});
await fetchBorrower();


  
Swal.fire({
  icon: "success",
  title: "Updated!",
  text: "Payment sched updated successfully.",
  timer: 2000,
  showConfirmButton: false,
}).then(() => {
  // refresh the page after the alert disappears
  window.location.reload();
});


} catch (error) {
   Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Something went wrong!",
          timer: 2000,
          showConfirmButton: false,
        });
console.error("Failed to save borrower:", error);
alert("Failed to save borrower. Please try again.");
}
finally{
    setSaving(false);
}
};

const [additionalAmount, setAdditionalAmount] = useState(0 );

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
              disabled
                label="Borrower Name"
                value={borrowerData?.borrowerName ?? ""}
                onChange={(e) => handleBorrowerChange("borrowerName", e.target.value)}
                fullWidth
                size="small"
              />
              <TextField
              disabled
                label="Borrowed Date"
                type="date"
                value={formatDateForInput(borrowerData?.borrowedDate)}
                onChange={(e) => handleBorrowerChange("borrowedDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
              />
              <TextField
              disabled
                label="Beggining Balance"
                type="number"
                value={borrowerData?.begginingBalance ?? ""}
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
             <Box sx={{display: borrowerData.status === "Unpaid" ? "flex": "none"}}>
                        <Button variant="contained" color="success" sx={{ borderRadius: 2, textTransform: "none", ml:2}} 
                      onClick={() => setOpenModal(true)}  >
                          + Top-up
                        </Button>
                        </Box>
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
                      value={formatDateForInput1(p.actualDatePaid)}
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
                   <Box
  sx={{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 0
  }}
>
  <Tooltip title="Save" arrow>
  <IconButton
    color="success"
    onClick={() => handleUpdatePayment(p)}
    sx={{
      display:
        p.status === "Paid" || borrowerData.status === "Paid"
          ? "none"
          : "flex"
    }}
  >
    <Save />
  </IconButton>
</Tooltip>
  <Tooltip title="Print Receipt" arrow>
  <IconButton
    color="info"
    onClick={() => handlePrintReceipt(p)}
    sx={{
      display:
        p.status === "Paid" || borrowerData.status === "Paid"
          ? "flex"
          : "none"
    }}
  >
    <Printer />
  </IconButton>
</Tooltip>
</Box>

                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Modal open={openModal} onClose={handleModalClose}>
            <Paper sx={{ p: 4, width: { xs: "90%", sm: 400 }, mx: "auto", mt: "10%", borderRadius: 3, outline: "none" }}>
              <Typography variant="h6" fontWeight={700} mb={2} color="#4caf50">New Top up</Typography>
              <Stack spacing={2}>
                <TextField label="Additional Amount" value={additionalAmount === 0 ? "":additionalAmount} 
                onChange={(e) => setAdditionalAmount(Number(e.target.value))} fullWidth size="small" />
                <TextField disabled label="New Amount Borrowed" type="number" 
                value={Number(borrowerData.begginingBalance) + additionalAmount} 
                 InputLabelProps={{ shrink: true }} fullWidth size="small" />
                <TextField disabled label="New Interest Amount" value={(Number(borrowerData.begginingBalance) + additionalAmount) * 0.2}  fullWidth size="small" />
                
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

export default BorrowerDetailPage;
