import './assets/css/style.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/img/apple-touch-icon.png';
import { Link } from 'react-router-dom';
import React from 'react';


const AdminNavbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg header fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-primary text-white fw-bold"><i class="fa-solid fa-utensils"></i> Food Hut</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">


            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item dropdown pe-3">

                <a className="nav-link nav-profile d-flex align-items-center pe-0 text-light" href="#" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle"></i>
                  <span className="d-none d-md-block dropdown-toggle ps-2 ">Admin</span>
                </a>
              </li>


            </ul>
          </div>
        </div>
      </nav>

    </React.Fragment>
  );
}

export { AdminNavbar };