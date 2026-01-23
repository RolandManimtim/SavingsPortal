import React, { useState } from "react";
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
MenuItem
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import DashboardLayout from "../DashBoard/DashboardLayout";

interface Borrower {
name: string;
borrowedDate: string;
amount: number | string;
status: "Ongoing" | "Paid" | "Overdue"| "Unpaid";
address: string;
contact: string;
}

interface Payment {
amount: number | "";
date: string;
}

const BorrowerDetailPage: React.FC = () => {
const [borrower, setBorrower] = useState<Borrower>({
name: "",
borrowedDate: "",
amount: "",
status: "Unpaid",
address: "",
contact: "",
});

const [payments, setPayments] = useState<Payment[]>([]);

const handleAddPayment = () => {
setPayments([...payments, { amount: "", date: "" }]);
};

const handleDeletePayment = (index: number) => {
const newPayments = [...payments];
newPayments.splice(index, 1);
setPayments(newPayments);
};

const handlePaymentChange = (index: number, field: "amount" | "date", value: any) => {
const newPayments = [...payments];
newPayments[index][field] = value;
setPayments(newPayments);
};

const handleBorrowerChange = (field: keyof Borrower, value: any) => {
setBorrower({ ...borrower, [field]: value });
};

return ( <DashboardLayout userName="Roland Manimtim">
<Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}> <Typography variant="h5" fontWeight={700} color="#4caf50" mb={3}>
Borrower Detail </Typography>

```
    {/* Borrower Form */}
    <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
{/* Left Column */}
<Stack spacing={2} sx={{ flex: 1 }}>
<TextField
label="Borrower Name"
value={borrower.name}
onChange={(e) => handleBorrowerChange("name", e.target.value)}
fullWidth
size="small"
/>
<TextField
label="Borrowed Date"
type="date"
value={borrower.borrowedDate}
onChange={(e) => handleBorrowerChange("borrowedDate", e.target.value)}
InputLabelProps={{ shrink: true }}
fullWidth
size="small"
/>
<TextField
label="Amount"
type="number"
value={borrower.amount}
onChange={(e) => handleBorrowerChange("amount", e.target.value)}
fullWidth
size="small"
/> </Stack>

```
{/* Right Column */}
<Stack spacing={2} sx={{ flex: 1 }}>
  <TextField
    label="Status"
    select
    value={borrower.status}
    onChange={(e) => handleBorrowerChange("status", e.target.value as Borrower["status"])}
    fullWidth
    size="small"
  >
    <MenuItem value="Ongoing">Ongoing</MenuItem>
    <MenuItem value="Paid">Paid</MenuItem>
    <MenuItem value="Overdue">Overdue</MenuItem>
  </TextField>
  <TextField
    label="Address"
    value={borrower.address}
    onChange={(e) => handleBorrowerChange("address", e.target.value)}
    fullWidth
    size="small"
  />
  <TextField
    label="Contact"
    value={borrower.contact}
    onChange={(e) => handleBorrowerChange("contact", e.target.value)}
    fullWidth
    size="small"
  />
</Stack>
```

  </Stack>
</Paper>


    {/* Payment History Table */}
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={700}>
          Payment History
        </Typography>
        <Button variant="contained" color="success" startIcon={<Add />} onClick={handleAddPayment}>
          Add Payment
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Payment Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((p, idx) => (
            <TableRow key={idx}>
              <TableCell>
                <TextField type="number" value={p.amount} onChange={(e) => handlePaymentChange(idx, "amount", e.target.value)} size="small" fullWidth />
              </TableCell>
              <TableCell>
                <TextField type="date" value={p.date} onChange={(e) => handlePaymentChange(idx, "date", e.target.value)} size="small" fullWidth InputLabelProps={{ shrink: true }} />
              </TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => handleDeletePayment(idx)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {payments.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No payments yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  </Box>
</DashboardLayout>


);
};

export default BorrowerDetailPage;
