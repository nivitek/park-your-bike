import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Reset from "./components/Reset/Reset";
import Layout from "./Layout";
import Lists from "./components/Lists/Lists";
import Main from "./components/Main/Main";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/ErrorPages/NotFound";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <Layout>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="/Lists" element={<Lists />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Detail" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Layout>
  );
}

export default App;
