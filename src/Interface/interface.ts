export interface Borrower {
name: string;
borrowedDate: string; // format: YYYY-MM-DD
amount: number | string ;
status: "Unpaid"| "Ongoing" | "Paid" | "Overdue" ;
address: string;
contact: string;
interestAmount: number | string ;
transactionNumber: string;
}

// Payload for creating a borrower, includes createdBy
export interface CreateBorrowerPayload extends Borrower {
createdBy: string;
}

export interface Pagination {
totalCount: number;
totalPage:number;
page: number;
pageSize: number;
}

export interface BorrowerData {
address: string;
begginingBalance:string;
borrowedDate: string;
borrowerName:string;
contact: string;
endingBalance: string;
interestAmount: string;
status: string;
transactionNo: string;
borrowerDetails : BorrowerDetails[]
}

export interface BorrowerDetails {
actualAmountToPaid: string;
actualDatePaid:string;
amountToPaid: string;
id:string;
isOverDue: string;
schedulePaymentDate: string;
status: string;
transactionNo: string;
}

export interface DashboardEtails {
activeClient: number;
capital:number;
collections: number;
interestEarned:number;
loan: number;
}