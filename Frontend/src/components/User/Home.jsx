import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContex';
import gsap from 'gsap';
import base_url from './Baseurl';

const Home = () => {
  const { popupToggle2, isLoggedIn } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchMovie, setSearchMovie] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`${base_url}/api/auth/movieDB`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setMovies(data);
      setSearchMovie(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isLoggedIn]);

  useEffect(() => {
    gsap.fromTo(
      '.home-container',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, [movies]);

  const handleCardClick = (movie) => {
    isLoggedIn
      ? navigate('/infopage', {
          state: {
            title: movie.title,
            description: movie.description,
            image: movie.image,
            genre: movie.genre,
            rating: movie.rating,
            year: movie.year,
          },
        })
      : popupToggle2();
  };

  const onSearch = (searchValue) => {
    setSearchMovie(
      movies.filter((e) =>
        e.title.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  return (
    <>
      <div className="home-container text-white">
        <div className="filter-section d-flex align-items-center">
          <input
            className="ms-4 mt-4"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder="Search here!"
          />
        </div>
        <div className="movie-main bg-transparent">
          <div className="movie-collection bg-transparent">
            {loading ? (
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : search.length > 0 && searchMovie.length <= 0 ? (
              <p className='text-black'>No Data Found</p>
            ) : (
              (searchMovie.length > 0 ? searchMovie : movies).map((movie) => (
                <div
                  key={movie._id}
                  className="moviecard1"
                  onClick={() => handleCardClick(movie)}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className="moviecard1-img"
                    style={{ backgroundImage: `url(${movie.image})` }}
                  ></div>
                  <div className="moviecard1-data text-black">
                    <h4 className="fw-bold">{movie.title}</h4>
                    <p>{movie.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
