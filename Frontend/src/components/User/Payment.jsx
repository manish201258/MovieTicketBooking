import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContex';
import base_url from './Baseurl';
import { toast } from 'react-toastify';

const Payment = () => {
  const {user,isLoggedIn} = useAuth()
  const location = useLocation();
  const navigate = useNavigate()
  const { image, title, date, time, price, seats, noOfSeat, description, theater} = location.state;
  ;

  async function buyTicket(){
    if(isLoggedIn){

      const ticketData = {
        userId:user.userData._id,
        image,
        movieTitle: title,
        date,
        time,
        price,
        seats,
        theaterName: theater.name,
        ticketStatus:'Pending'
      }
        const response = await fetch(`${base_url}/api/auth/orderticket`,{
          method:"POST",
          headers:{
            'Content-Type':"application/json",
          },
          body:JSON.stringify(ticketData),
        })
    if(response.status===201){
      toast("Ticket Purchased")
      navigate('/home')
    }
    }
    else{
      console.log("server error")
      navigate("/home")
    }

  }
  console.log(price)
  return (
    <>
    <div className="ticket-main">
      <div className="ticket-data p-4 rounded">
        <div className="ticket-movie-details mb-3">
          <img src={image} alt="Movie Poster" className="img-fluid rounded" />
          <div className="t-m-d-desc ms-3">
            <h5 className="fw-bold">{title}</h5>
            <p className="fs-7 fst-italic text-muted">{description.slice(0, description.length / 3)}...</p>
            <p className='mt-5 fw-bold'>Seats no:</p>
            <div className="seats-data d-flex gap-3 flex-wrap">
              {seats.map((sheetName, index) => (
                <div className="div d-flex" key={index}>
                  <p>{sheetName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ticket-movie-session">
          <p className="m-0 ms-3 fw-semibold">Date: {date}</p>
          <p className="m-0 ms-3 fw-semibold">Time: {time}</p>
        </div>
      </div>
      <div className="ticket-buy p-4 rounded">
        <div className="theater-name">
          <p className='m-0 text-danger'>Available at:</p>
          <p className='fw-bold fs-4'>{theater.name}</p>
        </div>
        <div className="sheet-p-data">
          <h5 className="fw-bold">Buy Tickets</h5>
          <p className="fs-6">Price: ₹{noOfSeat*110} ({noOfSeat} X 110)</p>
          <button onClick={buyTicket} className="btn btn-primary">Pay Now</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Payment;
