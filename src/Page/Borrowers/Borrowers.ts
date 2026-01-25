import type { Borrower, CreateBorrowerPayload } from "../../Interface/interface";

// src/services/borrowersService.ts
//const API_BASE_URL = "https://localhost:44365";
const API_BASE_URL = "https://rbmanimtim.bsite.net";

export const getBorrowers = async (page = 1, pageSize = 10) => {
  try {
    console.log(API_BASE_URL,"log me");
    const response = await fetch(`${API_BASE_URL}/api/GoogelSheet/borrowers?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to fetch borrowers");
    }
    const data = await response.json();
    return data; // expected: array of borrowers
  } catch (error) {
    console.error("getBorrowers error:", error);
    return [];
  }
};

export const createBorrower = async (borrower: Borrower): Promise<void> => {
try {
const payload: CreateBorrowerPayload = {
...borrower,
createdBy: "Roland B. Manimtim" // Replace with actual logged-in user
};
console.log("Payload sent to API:", JSON.stringify(payload, null, 2));

const res = await fetch(`${API_BASE_URL}/api/GoogelSheet/borrowers`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

console.log(res, "ts res");
if (!res.ok) {
  const err = await res.json();
  throw new Error(err.message || "Failed to add borrower");
}


} catch (error) {
console.error("Error adding borrower:", error);
alert("Failed to add borrower. Please try again.");
}
};

export const getBorrowersByTransactionNo = async (transactionNo: string) => {
  try {
    console.log(API_BASE_URL,"log me");
    const response = await fetch(`${API_BASE_URL}/api/GoogelSheet/borrowerByTransactionNo?transactionNo=${transactionNo}`);
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to fetch borrowers");
    }
    const data = await response.json();
    return data; // expected: array of borrowers
  } catch (error) {
    console.error("getBorrowers error:", error);
    return [];
  }
};