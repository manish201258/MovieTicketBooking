import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContex';

const MovieInfo = () => {
  const {isLoggedIn,user} = useAuth();
  const location = useLocation();
  const { title, description, image, genre, rating, year } = location.state;
  const navigate = useNavigate();


  const bookingRedirect = () => {
    if(isLoggedIn && user){

      navigate("/booking", {
        state: { 
          title: title,
          genre: genre,
          image: image,
          description: description
        }
      });
    }
else{
  navigate("/home")
}
  };

  return (
    <>
      <div className="movie-info-card p-3 mt-5 bg-transparent">
        <div className="card overflow-hidden mb-3" style={{ paddingLeft: "8vw", boxShadow: "0 0 12px -4px black" }}>
          <div className="z-1 d-flex flex-wrap">
            <div className="m-4" style={{ boxShadow: "0 0 100px white" }}>
              <img src={image} className="rounded" alt="..." style={{ maxWidth: "230px" }} />
            </div>
            <div className="movie-card-info ps-4">
              <div className="card-body fw-bold h-100">
                <h4 className="card-title m-1 fw-bold">{title}</h4>
                <p className="card-text m-1"><small className="text-body-secondary"></small>{genre}</p>
                <div className="langbtn">
                  <button type="button" className="btn btn-secondary btn-sm m-1" style={{ paddingTop: "0", paddingBottom: "0" }}>2D</button>
                  <button type="button" className="btn btn-secondary btn-sm m-1" style={{ paddingTop: "0", paddingBottom: "0" }}>English</button>
                </div>
                <p className="card-text m-1"><small className="text-body-secondary"></small>Rating: {rating}</p>
                <p className="card-text m-1"><small className="text-body-secondary"></small>Released in: {year}</p>
                <div className="book-button">
                  <button onClick={bookingRedirect} type="button" className="btn mt-4" style={{ backgroundColor: "var(--bt1color)" }}>
                    Book tickets
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="z-0 bg-image">
            <img src={image} alt="" />
          </div>
        </div>

        <div className="movie-info-about p-3" style={{ width: "70%" }}>
          <h5 className='fw-bold'>About the Movie</h5>
          <p>{description}</p>
        </div>
      </div>
    </>
  );
}

export default MovieInfo;
