import React, {Component} from 'react';

import {NavLink} from 'react-router-dom';
import './layout.css'
class Header extends Component {
    logout = (event) => {
        localStorage.removeItem('userData');
        window.location = '/login';
    }
    render() {
        return (
            <header className="page-header">
                <nav className="navbar" role="navigation">
                    <div className="container-fluid">
                        <div className="havbar-header">
                            <NavLink to="/home" className="navbar-brand custom-background-white">
                                <div className="logo-enclave">
                                    <img src="/assets/pages/img/logos/logo.jpg" alt=""/>
                                    <span>
                                        &nbsp; Car Take Care
                                    </span>

                                </div>
                                {/* <i className="fa fa-home" style={{fontSize:"50px",marginTop:'7px'}}/>  */}
                            </NavLink>
                            <div className="topbar-actions">
                                {/* <span
                                    style={{
                                    color: '#6c7984',
                                    padding: '10px',
                                    fontWeight: 'bold',
                                    fontSize: "20px"
                                }}>Welcome</span> */}
                                <div className="btn-group-img btn-group">
                                    <button
                                        type="button"
                                        className="btn btn-sm dropdown-toggle custom-background-white"
                                        data-toggle="dropdown"
                                        data-hover="dropdown"
                                        data-close-others="true">
                                        <img
                                            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="avatar"/>
                                    </button>
                                    <ul className="dropdown-menu-v2 dropdown-custom-background" role="menu">
                                      
                                        <li>
                                            <span onClick= {(event) =>this.logout(event)}>
                                                <i className="icon-key"/>
                                                Log Out
                                            </span>
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