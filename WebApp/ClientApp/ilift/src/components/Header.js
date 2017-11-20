import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {


  render() {
        return (
        <div id="fh5co-header">
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
                            <ul className="fh5co-sub-menu">
                                <li><Link to={'/'}>Yoga</Link></li>
                                <li><Link to={'/'}>TRX</Link></li>
                                <li><Link to={'/'}>Tae-Bo</Link></li>
                                <li><Link to={'/'}>Pilates</Link></li>
                                <li><Link to={'/'}>Boxing</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to={'/trainers'}>Trainers</Link>
                        </li>
                        <li><Link to={'/schedule'}>Schedule</Link></li>
                        <li><Link to={'/about'}>About</Link></li>
                        <li><Link to={'/contact'}>Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
        </header>
        </div>
    );
  }
}