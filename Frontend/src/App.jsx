import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Login from './components/User/Login';
import Register from './components/User/Register';
import Home from './components/User/Home';
import MovieInfo from './components/User/MovieInfo';
import Booking from './components/User/Booking';
import Booksheet from './components/User/Booksheet';
import Payment from './components/User/Payment';
import Orders from './components/User/Orders';
import AdminDeshboard from './components/Admin/AdminDeshboard';
import UserMangt from './components/Admin/UserMangt';
import Theaters from './components/User/Theaters';
import Profile from './components/User/Profile';
import MainLayout from './components/User/MainLayout';
import AdminLayout from './components/Admin/AdminLayout';
import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path='/' element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="home" element={<Home />} />
            <Route path="theaters" element={<Theaters />} />

            <Route element={<ProtectedRoutes />}>
            <Route path="infopage" element={<MovieInfo />} />
              <Route path="booking" element={<Booking />} />v 
              <Route path="booksheet" element={<Booksheet />} />
              <Route path="payment" element={<Payment />} />
              <Route path="orders" element={<Orders />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route element={<ProtectedRoutes/>}>
              <Route path="dashboard" element={<AdminDeshboard />} />
              <Route path="usermanagement" element={<UserMangt />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
    </Router>
  );
};

export default App;
