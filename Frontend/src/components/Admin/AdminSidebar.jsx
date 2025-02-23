import React from 'react'
import { NavLink } from 'react-router-dom';
const AdminSidebar = () => {
  return (

    <>
    <div className=" admin-side-menu d-flex flex-column flex-shrink-0 m-2 p-3 bg-light" >
      <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span className="fs-4">Admin Menu</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink to="/admin/dashboard" className="nav-link link-dark" activeClassName="active">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/usermanagement" className="nav-link link-dark" activeClassName="active">
            User Management
          </NavLink>
        </li>
      </ul>
    </div>
    </>
  )
}

export default AdminSidebar