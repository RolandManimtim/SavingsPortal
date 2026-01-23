export interface Borrower {
name: string;
borrowedDate: string; // format: YYYY-MM-DD
amount: number | string;
status: "Unpaid"| "Ongoing" | "Paid" | "Overdue" ;
address: string;
contact: string;
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