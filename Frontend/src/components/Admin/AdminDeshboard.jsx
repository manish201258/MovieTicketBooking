import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../User/AuthContex';
import base_url from '../User/Baseurl';
const AdminDashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [totalTicketsPurchased, setTotalTicketsPurchased] = useState(0);
  const [totalPendingTickets, setTotalPendingTickets] = useState(0);
  const [totalConfirmedTickets, setTotalConfirmedTickets] = useState(0);
  const [totalRejectedTickets, setTotalRejectedTickets] = useState(0);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [isConfirmed,setIsConfirmed] = useState();
  
const {user} = useAuth()
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${base_url}/api/auth/users`
        , {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response===200) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsersCount(data)
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  
  const TotalTickets = async () => {
    try {
      const response = await fetch(`${base_url}/api/auth/totalticket`
        , {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response===200) {
        throw new Error('Failed to fetch total tickets');
      }
      const data = await response.json();
      setTotalTicketsPurchased(data)
    } catch (error) {
      console.error('Error fetching total tickets:', error);
      throw error;
    }
  };

  const PendingTickets = async () => {
    try {
      const response = await fetch(`${base_url}/api/auth/pendingtickets`
        , {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response===200) {
        throw new Error('Failed to fetch pending tickets');
      }
      const data = await response.json();
      setTotalPendingTickets(data)
    } catch (error) {
      console.error('Error fetching pending tickets:', error);
      throw error;
    }
  };

  const ConfirmedTickets = async () => {
    try {
      const response = await fetch(`${base_url}/api/auth/confirmtickets`
        , {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response===200) {
        throw new Error('Failed to fetch confirmed tickets');
      }
      const data = await response.json();
      setTotalConfirmedTickets(data)
    } catch (error) {
      console.error('Error fetching confirmed tickets:', error);
      throw error;
    }
  };
  const RejectedTickets = async () => {
    try {
      const response = await fetch(`${base_url}/api/auth/rejectedtickets`
        , {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response===200) {
        throw new Error('Failed to fetch rejected tickets');
      }
      const data = await response.json();
      setTotalRejectedTickets(data)
    } catch (error) {
      console.error('Error fetching confirmed tickets:', error);
      throw error;
    }
  };
  const Allusers = async () => {
    try {
      const response = await fetch(`${base_url}/api/auth/allusers`
        , {
          method: "GET",
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (!response===200) {
        throw new Error('Failed to fetch confirmed tickets');
      }
      const data = await response.json();
      setRecentPurchases(data)
    } catch (error) {
      console.error('Error fetching confirmed tickets:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        fetchUsers();
        TotalTickets();
        PendingTickets();
        ConfirmedTickets();
        RejectedTickets();
        Allusers()
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const updateTicketStatus = async (userId, ticketId, newStatus) => {
                                                                            // yha par partams pass kar raha hu
    try {                                                                      
      const response = await fetch(`${base_url}/api/auth/updateTicketStatus/${userId}/${ticketId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticketStatus: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update ticket status');
      }
  
      Allusers();
    } catch (error) {
      console.error('Error updating ticket status:', error);
    }
  };

  const onConfirm = (userId, ticketId) => {
    updateTicketStatus(userId, ticketId, 'Confirmed');
    isConfirmed(true)
  };

  const onReject = (userId, ticketId) => {
    updateTicketStatus(userId, ticketId, 'Rejected');
    isConfirmed(false)
  };

if(user){

if(user.userData.isAdmin){
  return (
    <div>
      <div className="admin-main d-flex">
        <AdminSidebar />

        <div className="admin-dashboard mt-4 ms-2 me-2 d-flex flex-column gap-2 overflow-x-hidden overflow-y-scroll" style={{ height: "30rem" }}>
          <div>
            <a  className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
              <span className="fs-4">Dashboard</span>
            </a>
            <hr />
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card text-white bg-primary">
                <div className="card-body">
                  <h5 className="card-title">Registered Users</h5>
                  <p className="card-text">{usersCount}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card text-white bg-info">
                <div className="card-body">
                  <h5 className="card-title">Total Tickets Purchased</h5>
                  <p className="card-text">{totalTicketsPurchased}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card text-white bg-warning">
                <div className="card-body">
                  <h5 className="card-title">Total Pending Tickets</h5>
                  <p className="card-text">{totalPendingTickets}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card text-white bg-success">
                <div className="card-body">
                  <h5 className="card-title">Total Confirmed Tickets</h5>
                  <p className="card-text">{totalConfirmedTickets}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card text-white bg-danger">
                <div className="card-body">
                  <h5 className="card-title">Total Rejected Tickets</h5>
                  <p className="card-text">{totalRejectedTickets}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card text-white bg-secondary">
                <div className="card-body">
                  <h5 className="card-title">Total Revenue</h5>
                  <p className="card-text">{totalConfirmedTickets*110}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="recent-purchases">
            <h4 className="mb-4">Recent Purchases</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className='fw-bold'>User Name:</th>
                  <th className='fw-bold'>Movie</th>
                  <th className='fw-bold'>Seat No.</th>
                  <th className='fw-bold'>Status</th>
                  <th className='fw-bold'>Action</th>
                </tr>
              </thead>
              <tbody>
  {recentPurchases.map((user, index) => (
    user.tickets.length > 0  && (
      <React.Fragment key={index}>
        {user.tickets.map((ticket, ticketIndex) => (
          <tr key={ticketIndex}>
            <td>{user.username}</td>
            <td>{ticket.movieTitle}</td>
            <td>
              {ticket.seats.map((seat, seatIndex) => (
                <span key={seatIndex}>{seat} </span>
              ))}
            </td>
            <td>{ticket.ticketStatus}</td>
            <td className='d-flex gap-2'>
              {ticket.ticketStatus === 'Pending' && (
                isConfirmed ?
                  (
                   <></>
                  )
                  :
                  (
                    <div className='d-flex gap-2'>

                      <button onClick={() => onConfirm(user._id, ticket._id)} type="button" className="btn btn-success btn-sm">Confirm</button>
                      <button onClick={() => onReject(user._id, ticket._id)} type="button" className="btn btn-danger btn-sm">Reject</button>
                    </div>
                  )
              )}
            </td>
          </tr>
        ))}
      </React.Fragment>
    )
  ))}
</tbody>


            </table>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
else{
return(
  <div>
  <h4 className='d-flex justify-content-center'>Unauthorize Access - 404</h4>
</div>
)
}

}
  
}

export default AdminDashboard;
