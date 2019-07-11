import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
class Header extends Component {
    logout = (event)=>{
        sessionStorage.removeItem('userData');
        window.location = '/login' ;
    }
    render() {
        return (
            <header className="page-header">
            <nav className="navbar" role="navigation">
              <div className="container-fluid">
                <div className="havbar-header">
                  <NavLink to = "/home" className="navbar-brand">
                    <img src="../assets/layouts/layout6/img/logo.png" alt="Logo" /> </NavLink>
                  <div className="topbar-actions">                  

                    <span style={{color: '#32C5D2',padding:'10px'}}>Hi {sessionStorage.getItem('userData')}.</span>

                    <div className="btn-group-img btn-group">
                      <button type="button" className="btn btn-sm dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="" /> </button>
                      <ul className="dropdown-menu-v2" role="menu">
                        <li>
                          {/* <a href="abc">
>>>>>>> 0a6ae57ccd22a015416bd3f4db12871b0fd824f8
                            <i className="icon-user" /> My Profile
                            <span className="badge badge-danger">1</span>
                          </a> */}
                        </li>
                        <li>
                          <a onClick = {(event) =>this.logout(event)}>
                            <i className="icon-key" /> Log Out </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        );
    }
}

export default Header;