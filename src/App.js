import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "./components/user/UserList";
import Login from "./components/auth/Login";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/users" element={<UserList />} />
    </Routes>
  );
}

export default App;
