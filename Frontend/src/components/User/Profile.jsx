import React from 'react';
import { useAuth } from '../User/AuthContex';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
const Profile = () => {
    const navigate = useNavigate()
  const { user, logout } = useAuth();
  const [userName,setUserName] = useState('')
  const [userEmail,setUserEmail] = useState('')
  useEffect(() => {
    if (user && user.userData) {
      setUserName(user.userData.username);
      setUserEmail(user.userData.email);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/home");
  };
  return (
    <>
  
      <div className="d-flex justify-content-center m-5">
          <div className="card ps-5 pe-5 pt-4 pb-4 d-flex flex-column align-items-center">
            
          <button type="button" class="border border-0 bg-transparent position-relative"style={{backgroundImage:"url(/images/user-profile.png)",backgroundRepeat:"no-repeat",backgroundSize:"contain",height:"100px",width:"100px"}}>
  <span class="position-absolute "style={{bottom:"-5px",right:"-5px",transform:"rotate(90deg)"}}>
    <img src="/images/editprofile.png" alt=""style={{width:"40px"}} />
  </span>
</button>
            <div className="card-body d-flex flex-column align-items-center">
            
            <h5 className="card-title">{userName}</h5>
              <p className="card-text">{userEmail}</p>
              <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
            </div>
          </div>
      </div>
    </>
  );
};

export default Profile;
