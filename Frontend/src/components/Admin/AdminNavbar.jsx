import React, { useEffect, useState } from 'react'
import { useAuth } from '../User/AuthContex'
import { NavLink,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const AdminNavbar = () => {
  const navigate = useNavigate()
  const {user,logout} = useAuth()
  const [userName,setUserName] = useState('')
  const [userEmail,setUserEmail] = useState('')

  const handleLogout = () => {
    logout();
    navigate("/home");
    toast("Logout Success")
  };

  useEffect(() => {
    if (user && user.userData) {
      setUserName(user.userData.username);
      setUserEmail(user.userData.email);
    }
  }, [user]);
  return (
   <>
   <div className="div d-flex justify-content-center p-2 ">
    <p className='m-0 fw-bold fs-5 ' >Admin Panel</p>
   </div>
<nav class="navbar bg-body-tertiary">
  <div class=" admin-navbar w-100">
    <div className='admin-navbar-logo '>
    <img className='ms-5' src="/images/logo.png" alt="" style={{width:"9rem"}}/>
    <NavLink to='/home' className="fw-bold text-decoration-none text-black">Movie Home</NavLink>
    </div>
    
    <div className=" admin-profile d-flex gap-3 align-items-center me-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
      <img src="/images/user-profile.png" alt="" style={{width:"32px",height:"32px"}}/>
      <p className='m-0'>Hi , {userName}</p>

    </div>
  </div>
</nav>

<div class="offcanvas offcanvas-end " tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" style={{maxWidth:"200px", height:"fit-content",boxShadow:"0 0 4px",marginTop:"104px",borderRadius:" 0.5rem",marginRight:"22px"}}>
  
  <div class="offcanvas-body">
  <div className="d-flex flex-column ">
                  <div className="d-flex align-items-center gap-3">
                    <div>
                      <img src="/images/user-profile.png" alt="User Profile" style={{width:"32px",height:"32px"}}/>

                    
                    </div>
                    <div>
                      <p className="m-0" style={{ fontSize: "10px" }}>{userName}</p>
                      <p className="m-0" style={{ fontSize: "10px" }}>{userEmail}</p>
                    </div>
                  </div>
                  <hr />
                  <div>
                  <NavLink to="/admin/profile"  className="text-decoration-none text-black" >
                    <p to="/profile" className="m-0 fw-bold" style={{ fontSize: "13px" }}>Profile</p>
                    <hr />

                  </NavLink>
                  <NavLink to="/admin/dashboard"  className="text-decoration-none text-black" >
                   
                    <p className="m-0 fw-bold" style={{ fontSize: "13px" }}>Dashboard</p>
                    <hr />

                  </NavLink>
                  <NavLink to="/home"  className="text-decoration-none text-black" >
                   
                    <p className="m-0 fw-bold" style={{ fontSize: "13px" }}>Movie Home</p>

                  </NavLink>

                  </div>
                  <hr />
                  <div className="log-out-btn w-100 d-flex justify-content-center">
                    <button onClick={handleLogout} type="button" className="btn btn-danger btn-sm">
                      Logout
                    </button>
                  </div>
                </div>
  </div>
</div>
   </>
  )
}

export default AdminNavbar