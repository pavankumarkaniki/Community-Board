import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        <Route
          path="/create"
          element={user ? <CreatePost /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}
