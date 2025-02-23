import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContex';

const Orders = () => {
  const { user,loading,userDTA } = useAuth();
const [tickets,setTickets] = useState(null)


useEffect(()=>{
  userDTA()
  if (user && user.userData) {
    setTickets(user.userData.tickets)

  }
},[user])

  return (
    <>
    <div className="recent-orders mt-5 mb-5">
      <p className='ms-4 fs-4 fw-bold'>Order History</p>
      <div className="d-flex  flex-wrap justify-content-center" >
      {
        loading?(
          <div className='d-flex justify-content-center w-100'>

          <div class="spinner-border text-danger" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
          </div>
        )
        :
          tickets && tickets.length >0 ?(
            tickets.map((ticket, index) => (
              <div key={index} className="booked-Tickets border p-2">
              <div className="booked-movie-img m-1"style={{backgroundImage:`url(${ticket.image})`,backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
                <div className="overlaped-div position-absolute top-50 z-1 start-50 translate-middle "style={{backgroundColor:"rgba(50, 47, 47, 0.74)", width:"100%",height:"100%"}}>
      
                </div>
              <div className="booked-date z-2 position-absolute top-50 start-50 translate-middle">
                <p>{ticket.date}</p>
              </div>
              </div>
              
              <div className="booked-movie-data">
                <div className="b-m-type ">
                    <p className='text-secondary-emphasis fw-bold'>Movie</p>
                </div>
                    <p className='b-m-title fw-bold'>{ticket.movieTitle}</p>
                    <div className="b-m-time-date">
      
                    <p className='b-m-time text-muted'>Date: {ticket.date}</p>
                    <p className='b-m-time text-muted'>Time : {ticket.time}</p>
                    <p className='b-m-time text-muted'>Location : {ticket.theaterName} , Jaipur</p>
                    </div>
              </div>
              {
                ticket.ticketStatus==="Pending"?(
                  <button class="status z-3 btn btn-warning btn-sm btn-rounded">{ticket.ticketStatus}</button>
                ):(
                  ticket.ticketStatus==="Confirmed"?(
                    <button class="status z-3 btn btn-success btn-sm btn-rounded">{ticket.ticketStatus}</button>
                  ):(
                    <button class="status z-3 btn btn-danger btn-sm btn-rounded">{ticket.ticketStatus}</button>
                  )
                )
              }
        
          
            </div>
            ))
          ):
          (
            <>
            <p>Data Not Found</p>
            </>
          )
         
      }
      </div>
    </div>
      </>
    
  );
};

export default Orders;
