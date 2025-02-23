import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row w-100">
          <div className="col-md-4 mb-3 d-flex flex-column align-items-center gap-3">
            <img className="footer-logo mb-2" src="images/logo.png" alt="Logo" width="150" />
            <div className="address">
              <p className="m-0">Address:</p>
              <p>Poornima University, Jaipur</p>
            </div>
          <hr className="footer-hr" />
          </div>
          <div className="col-md-4 mb-3 d-flex flex-column align-items-center gap-1 ">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 mb-3">
              <a href="#" className="text-white">
                <img src="images/instagram.png" alt="Instagram" width="30" style={{filter:"invert()"}}/>
              </a>
              <a href="#" className="text-white">
                <img src="images/facebook.png" alt="Facebook" width="30" style={{filter:"invert()"}}/>
              </a>
              <a href="#" className="text-white">
                <img src="images/twitter.png" alt="Twitter" width="30" style={{filter:"invert()"}}/>
              </a>
              <a href="#" className="text-white">
                <img src="images/github.png" alt="GitHub" width="30" style={{filter:"invert()"}}/>
              </a>
            </div>
            <a href="#" className="d-block text-white">Map & Directions</a>
          <hr className="footer-hr"/>
          </div>
          <div className="col-md-4 mb-3 d-flex flex-column align-items-center gap-1">
            <button type="button" className="btn btn-secondary btn-sm mb-2">Make A Gift</button>
            <a href="#" className="d-block text-white mb-2">Corporate Info</a>
            <a href="#" className="d-block text-white">Contact Us</a>
            <hr className="footer-hr"/>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
