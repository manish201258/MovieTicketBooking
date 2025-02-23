import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContex";
import base_url from "./Baseurl";

const Booksheet = () => {
  const {isLoggedIn} = useAuth();
  const location = useLocation();
  const { theater, image, title,description,index } = location.state;
  const navigate = useNavigate();

  const [seats, setSeats] = useState([]);
  const [price, setPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleDateSelect = (date) => {
    setSelectedDate((prevDate) => (prevDate === date ? null : date));
  };

  const handleTimeSelect = (time) => {
    setSelectedTime((prevTime) => (prevTime === time ? null : time));
  };

  const handleSeatToggle = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        return prevSelectedSeats.filter(seat => seat !== seatId);
      } else {
        return [...prevSelectedSeats, seatId];
      }
    });
  };

  const PaymentGateway = () => {
  if(isLoggedIn){

    navigate("/payment", {
      state: {
        theater,
        image: image,
        title: title,
        date: selectedDate,
        time: selectedTime,
        price,
        seats: selectedSeats,
        noOfSeat: selectedSeats.length,
        description:description,
        status:"pending"
      },
    });
  }
  else{
    navigate("/home")
  }
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`${base_url}/api/auth/theater`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status !== 200) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setSeats(data[index].seatDetails)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    isLoggedIn?fetchData():(navigate("/home"))
}, []);
  return (
    <>
      <div className="booksheet-select-time d-flex flex-column gap-2">
        <div className="booking-select-day mt-4">
          <div className="booking-month">
            <p>July</p>
          </div>
          <div
            className="btn-day day-1"
            style={{
              width: "3rem",
              backgroundColor: selectedDate === "July 17" ? "darkgray" : "white",
            }}
            onClick={() => handleDateSelect("July 17")}
          >
            <p className="m-0" style={{ fontSize: "12px" }}>Wed</p>
            <p className="m-0 fw-bold">17</p>
          </div>
          <div
            className="btn-day day-2"
            style={{
              width: "3rem",
              backgroundColor: selectedDate === "July 18" ? "darkgray" : "white",
            }}
            onClick={() => handleDateSelect("July 18")}
          >
            <p className="m-0" style={{ fontSize: "12px" }}>Thu</p>
            <p className="m-0 fw-bold">18</p>
          </div>
          <div
            className="btn-day day-3"
            style={{
              width: "3rem",
              backgroundColor: selectedDate === "July 19" ? "darkgray" : "white",
            }}
            onClick={() => handleDateSelect("July 19")}
          >
            <p className="m-0" style={{ fontSize: "12px" }}>Fri</p>
            <p className="m-0 fw-bold">19</p>
          </div>
        </div>

        <div className="b-t-showTime d-flex gap-4 flex-wrap justify-content-center">
          {theater.shows.map((showtime, index) => (
            <div
              key={index}
              className="b-t-time"
              style={{
                backgroundColor: selectedTime === showtime ? "darkgray" : "white",
                
              }}
              onClick={() => handleTimeSelect(showtime)}
            >
              <p className='m-0 fw-bold'>{showtime}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="booksheet-select mt-5 p-3 d-flex flex-column align-items-center">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="sheets d-flex justify-content-center align-items-center m-2">
            <div className="row-row fw-bold" style={{ marginRight: "8rem" }}>
              {row.row[rowIndex]}
            </div>

            <div
              className="sheet-buttons d-flex justify-content-center gap-2"
            >
              {Array.from({ length: row.count }).map((_, sheetIndex) => (
                <div id={`${rowIndex}-${sheetIndex}`}>
                  <input type="checkbox" className="btn-check" id={`${rowIndex+1}-${sheetIndex+1}`} autoComplete="off"  
                  onChange={() => handleSeatToggle(`${rowIndex+1}-${sheetIndex+1}`)}
                  />
      <label className="select-btn btn btn-outline-secondary text-black d-flex justify-content-center align-items-center" htmlFor={`${rowIndex+1}-${sheetIndex+1}`} style={{width:"30px",height:"30px"}}>{sheetIndex+1}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="screen" style={{ textAlign: "center", width: "100%" }}>
        <img
          src="https://assetscdn1.paytm.com/movies_new/_next/static/media/screen-icon.8dd7f126.svg"
          alt=""
          style={{boxShadow:"0 0 50px 20px white"}}
        />
      </div>

      <div
        className="checkout mt-5 mb-5 d-flex justify-content-center align-items-center"
        style={{ gap: "80px" }}
      >
        <div className="total-price">
          <p className="m-0 fw-bold">₹ {selectedSeats.length*110}</p>
          <p className="m-0">
           {selectedSeats.length} x 110
          </p>
        </div>
        <button
          onClick={PaymentGateway}
          type="button"
          className="btn btn-info fw-bold"
        >
          Proceed To Checkout
        </button>
      </div>
    </>
  );
};

export default Booksheet;
