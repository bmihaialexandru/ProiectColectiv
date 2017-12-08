import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class HeaderAdmin extends Component {


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
                            <Link to={'/admin'}>Home</Link>
                        </li>
                        <li>
                            <Link  to={'/managecourses'}>Courses</Link>
                        </li>
                        <li>
                            <Link to={'/managetrainers'}>Trainers</Link>
                        </li>
                        <li><Link to={'/manageschedules'}>Schedule</Link></li>
                        <li><Link to={'/manageusers'}>Users</Link></li>
                        <li><Link to={'/managesubscpritions'}>Subscriptions</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
        </header>
        </div>
    );
  }
}