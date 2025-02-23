import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../User/AuthContex';
import base_url from '../User/Baseurl';
const UserMangt = () => {
  const {user} = useAuth()
  const [recentPurchases, setRecentPurchases] = useState([]);
  ;
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${base_url}/api/auth/allusers`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setRecentPurchases(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateUserStatus = async (userId, newStatus) => {
    try {
      const response = await fetch(`${base_url}/api/auth/updateUserStatus/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response==201) {
        throw new Error('Failed to update user status');
      }
      fetchAllUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const onBlock = (userId) => {
    updateUserStatus(userId, 'Blocked');
  };

  const onUnblock = (userId) => {
    updateUserStatus(userId, 'Active');
  };

  const onMakeAdmin = (userId) => {
    updateUserStatus(userId, true); 
  };
  const onRemoveAdmin = (userId) => {
    updateUserStatus(userId,false)
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  if(user){
    if(user.userData.isAdmin){
      return (
        <>
          <div className="d-flex admin-main">
            <AdminSidebar />
            <div className="container mt-4 overflow-y-scroll" style={{ height: "30rem" }}>
              <div>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                  <span className="fs-4">User Management</span>
                </a>
                <hr />
              </div>
    
              {/* User List */}
              <div className="mb-4">
                <h4>All Registered Users</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className='fw-bold'>Name</th>
                      <th className='fw-bold'>Email</th>
                      <th className='fw-bold'>Status</th>
                      <th className='fw-bold'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPurchases.map((user, index) => (
                      <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.status}</td>
                        <td className='d-flex gap-2'>
                          {
                            user.status==="Blocked"?(
                              <button onClick={() => onUnblock(user._id)} type="button" className="btn btn-warning btn-sm">Unblock</button>
                            ):(
                              <button onClick={() => onBlock(user._id)} type="button" className="btn btn-danger btn-sm">Block</button>
                            )
                          }
                        
                         
                          {
                            user.isAdmin?(
    <button onClick={() => onRemoveAdmin(user._id)} type="button" className="btn btn-success btn-sm">Remove Admin</button>
                            )
                            :(
                              <button onClick={() => onMakeAdmin(user._id)} type="button" className="btn btn-success btn-sm">Make Admin</button>
                            )
                          }
                        
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      );
    }
    else{
      return (

      <div>
      <h4 className='d-flex justify-content-center'>Unauthorize Access - 404</h4>
    </div>
      )
    }
  }
};

export default UserMangt;
