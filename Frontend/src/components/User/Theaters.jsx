import React, { useEffect } from 'react'
import { useState } from 'react'
import base_url from './Baseurl'
const Theaters = () => {
    const [theaters, setTheater] = useState([]);
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
          setTheater(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    useEffect(()=>{
        fetchData();
    },[])
     
      console.log(theaters)
  return (
    <>
        <div className="booking-main m-4">
          
            <div className="theater-filter mt-5 text-danger">
                <h3>Available In:</h3>
            </div>
            <div className='mt-3'>
            {theaters.map((theater) => (
                <div key={theater._id} className="booking-theater d-flex align-items-center mt-1 p-4 flex-wrap gap-5">
                    <div className="b-t-info w-100">
                        <h5 className='m-0'>{theater.name}</h5>
                        <div className="noncancel mt-2">
                            <p className='m-0'>Non-Cancellable</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
           
        </div>
    </>
  )
}

export default Theaters