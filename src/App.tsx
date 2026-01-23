import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MoneyLoginPage from "./Page/LoginPage/LoginPage";
import Dashboard from "./Page/DashBoard/Dashboard";
import AddBorrowerPage from "./Page/Borrowers/AddBorrowers";
import BorrowersListPage from "./Page/Borrowers/BorrowersList";
import BorrowerDetailPage from "./Page/Borrowers/BorrowerDetailPage";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Roland"); // optional dummy user

  return (
    <Routes>
      {/* Login route */}
      <Route
        path="/"
        element={
          loggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <MoneyLoginPage />
          )
        }
      />

      {/* Dashboard route */}
      <Route
        path="/dashboard"
        element={
          !loggedIn ? (
            <Dashboard  />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
      path="/addBorrowers"
      element={<AddBorrowerPage/>}/>
      <Route
      path="/borrowersList"
      element={<BorrowersListPage/>}/>
      <Route
      path="/borrowersDetails"
      element={<BorrowerDetailPage/>}/>
    </Routes>
  );
};

export default App;
