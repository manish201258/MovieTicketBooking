import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from './AuthContex';
import base_url from './Baseurl';
const Booking = () => {
    const {isLoggedIn} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { title, genre, image, description } = location.state;
    const [theaters, setTheater] = useState([]);
    ;
    
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
                setTheater(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        isLoggedIn?fetchData():(navigate("/home"))
    }, [isLoggedIn]);

    const handleTheaterClick = (theater,index) => {
        if(isLoggedIn){

            navigate('/booksheet', {
                state: {
                    theater,
                    image: image,
                    title: title,
                    description: description,
                    index:index
                },
            });
        }
        else{
            navigate("/home")
        }
    };

    return (
        <>
            <div className="container mt-5">
    
                    <div className="d-flex justify-content-center w-100">
                        <div className="booking-select-theater card d-flex flex-row gap-5">
                            <img src={image} className="card-img-top" alt={title} style={{width:"150px"}}/>
                            <div className="card-body">
                                <h4 className="card-title">{title}</h4>
                                <p className="card-text">{description}</p>
                                <p className="card-text"><small className="text-muted">{genre} | English</small></p>
                            </div>
                        </div>
                    </div>
    
                <div className="mt-5">
                    <h3 className="text-center text-danger">Available In:</h3>
                    <div className="row mt-3">
                        {theaters.map((theater,index) => (
                            <div key={theater._id} className="col-md-4 mb-4">
                                <div className="card h-100" onClick={() => handleTheaterClick(theater,index)}>
                                    <div className="card-body">
                                        <h5 className="card-title">{theater.name}</h5>
                                        <p className="card-text">Non-Cancellable</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Booking;
