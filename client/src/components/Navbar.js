import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactToolTip from 'react-tooltip';

export default function Navbar(props) {
  return (
    <div className="w-100 d-flex justify-content-around py-2">
      <ReactToolTip />
      <div>
        <NavLink data-tip="login" className="btn btn-light rounded-circle text-muted" to="/login">
          <i className="fas fa-sign-in-alt"></i>
        </NavLink>
      </div>
      <div>
        <NavLink data-tip="register" className="btn btn-light rounded-circle text-muted" to="/register">
          <i className="far fa-edit"></i>
        </NavLink>
      </div>
    </div>
  );
}
