import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Persona,
    PersonaInitialsColor,
  } from 'office-ui-fabric-react/lib/Persona';
import {NotificationContainer} from 'react-notifications';

export class Header extends Component {

  render() {
        const link = localStorage.username && localStorage.username === "admin" ? '/admin' : '/profile';
        const account = localStorage.username && 
        <li>
            <Link to={link}>
                <Persona
                    primaryText={localStorage.username}
                    initialsColor={PersonaInitialsColor.red}
                />
            </Link>
        </li>;
        
        const logoutButton = localStorage.username && 
        <li onClick={() => localStorage.clear()} id="sign-out-btn">
            <Link to={'/'} id="sign-out-link">Sign out</Link>
        </li>;

        return (
        <div id="fh5co-header">
            <NotificationContainer/>
        <header id="fh5co-header-section">
        <div className="container">
            <div className="nav-header">
                <h1 id="fh5co-logo"><Link to={'/'}><div className="header-logo-ilift"></div></Link></h1>
                
                <nav id="fh5co-menu-wrap" role="navigation">
                    <ul className="sf-menu" id="fh5co-primary-menu">
                        <li className="active">
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link className="fh5co-sub-ddown" to={'/courses'}>Courses</Link>
                        </li>
                        <li>
                            <Link to={'/trainers'}>Trainers</Link>
                        </li>
                        <li><Link to={'/schedule'}>Schedule</Link></li>
                        <li><Link to={'/about'}>About</Link></li>
                        <li><Link to={'/contact'}>Contact</Link></li>
                        {account}
                        {logoutButton}
                    </ul>
                </nav>
            </div>
        </div>
        </header>
        </div>
    );
  }
}