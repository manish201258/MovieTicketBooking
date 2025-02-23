import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContex";
import Register from "./Register";
import Login from "./Login";
import { toast } from 'react-toastify';

const Navbar = () => {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const { isLoggedIn, logout, user, popup1, popup2, popupToggle1, popupToggle2 } = useAuth();
  const navigate = useNavigate();

  // Initialize GSAP animation
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".hh1", { y: -100, duration: 0.4 })
      .from(".web-logo", { y: -100, duration: 0.5 });

    [".li1", ".li2", ".li3", ".li4"].forEach(liClass => {
      tl.from(liClass, { opacity: 0, y: -15, duration: 0.3 });
    });
  });

  // Handle logout
  const handleLogout = () => {
    logout();
    setUserName(null)
    setUserEmail(null)
    navigate("/home");
    toast("User Logout Success")
  };
 
  // console.log(user.userData.status);
  useEffect(() => {
    if (user && user.userData) {
      setUserName(user.userData.username);
      setUserEmail(user.userData.email);
    }
  }, [user]);

  function ordersOpen() {
    if(user.userData.status==="Blocked"){
      handleLogout();
      alert("Sorry You have been Blocked can't Access")
    }
    navigate("/orders");
  }
 
  return (
    <>
      <div className="navbar-1">
        <div className="nav-logo d-flex justify-content-center align-items-center">
          <img className="web-logo" src="images/logo.png" alt="Logo" />
          <div className="nav-profile">
          <div className="admin-profile d-flex gap-3 align-items-center me-4" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
      <img src="images/user-profile.png" alt="" style={{width:"32px",height:"32px"}}/>
      <div className="profile-top-name">

      {
        isLoggedIn?(
          <p className='m-0'>Hi , {userName}</p>

        ):(
          <p className='m-0'>Hi</p>

        )
      }
      </div>
      
    </div>
          </div>
        </div>
        <hr className="border border-black border-1 opacity-100 w-100 hh1" />
        <div className="nav-content position-relative">
          <div className="nav-list">
            <li className="li1">
              <NavLink
                to="/home"
                className="text-decoration-none text-black"
              >
                Home
              </NavLink>
            </li>
            <li className="li2">
              <NavLink to='/theaters' className="text-decoration-none text-black" >
                Theaters
              </NavLink>
            </li>
            <li className="li3">
                <a onClick={ordersOpen} className="text-decoration-none text-black">
                  Orders
                </a>
            </li>
            <li className="li4">
            {isLoggedIn && user && user.userData && user.userData.isAdmin && (
                <NavLink to='/admin/dashboard' className="text-decoration-none text-black">
                  Admin Panel
                </NavLink>
            )}
            </li>
          </div>

              {isLoggedIn ? (
               <div  className="offcanvas offcanvas-end " tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"style={{maxWidth:"200px", height:"fit-content",boxShadow:"0 0 4px",marginTop:"104px",borderRadius:" 0.5rem",marginRight:"22px"}}>
  
               <div className="offcanvas-body">
               <div className="d-flex flex-column ">
                               <div className="d-flex align-items-center gap-3">
                                 <div>
                                   <img src="images/user-profile.png" alt="User Profile" style={{width:"32px",height:"32px"}}/>
                                 </div>
                                 <div>
                                   <p className="m-0" style={{ fontSize: "10px" }}>{userName}</p>
                                   <p className="m-0" style={{ fontSize: "10px" }}>{userEmail}</p>
                                 </div>
                               </div>
                               <hr />
                               <div>
                                <NavLink to="/profile" className="text-decoration-none text-black">

                                 <p className="m-0 fw-bold" style={{ fontSize: "13px" }}>Profile</p>
                                 <hr />
                                </NavLink >
                                <NavLink to="/orders" className="text-decoration-none text-black">
                                
                                 <p className="m-0 fw-bold" style={{ fontSize: "13px" }}>Orders</p>
                                 <hr />
                                </NavLink>
                                 <p className="m-0 fw-bold" style={{ fontSize: "13px" }}>Offers</p>
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
              ) : (
                
                <div className="offcanvas offcanvas-end " tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel"style={{maxWidth:"200px", height:"fit-content",boxShadow:"0 0 4px",marginTop:"104px",borderRadius:" 0.5rem",marginRight:"22px"}}>
  
               <div className="offcanvas-body">
               <div className="d-flex flex-column ">
                               <div className="d-flex align-items-center gap-3">
                                 <p>Register or Login first!</p>
                               </div>
                               <hr />
                               <div>
                                 <p className="m-0 fw-bold" style={{ fontSize: "13px" }}>Offers</p>
                               </div>
                               <hr />
                               <div className="btn-group" role="group" aria-label="Basic outlined example">
                  <button onClick={popupToggle1} type="button" className="btn btn-outline-primary btn-sm">
                    Register
                  </button>
                  <button onClick={popupToggle2}  type="button" className="btn btn-outline-primary btn-sm">
                    Login
                  </button>
                </div>
                             </div>
               </div>
             </div>
              )}
        
        </div>
      </div>

      {/* forms */}
      <div className={`popup popup-register ${popup1}`}>
        <Register />
      </div>
      <div className={`popup popup-login ${popup2}`}>
        <Login />
      </div>
    </>
  );
};

export default Navbar;
