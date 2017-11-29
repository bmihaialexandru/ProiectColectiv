import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Footer} from '../components/Footer';
import {Classes} from '../components/Classes';
import {session} from '../Session/Session';
import { Redirect } from 'react-router-dom';

import {_reloadJs} from '../js/reloadJs';

export class ProfilePage extends Component {
    render() {
        _reloadJs();
        if(session.token === ""){
            return <Redirect to='/'/>;
        }

        return (
        <div id="fh5co-wrapper">
        <div id="fh5co-page">
        
        <Header/>

        <div className="fh5co-parallax back-3" data-stellar-background-ratio="0.5">
            <div className="overlay"></div>
            <div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                <div className="fh5co-intro fh5co-table-cell animate-box">
                    <h1 className="text-center">Hello, {session.username}</h1>
                    <p>Manage you gym program</p>
                </div>
                </div>
            </div>
            </div>
        </div>


        <div id="fh5co-contact">
            <div className="container">
            <div className="row">
                Here info about subscriptions + personal schedule
        </div>
        </div>
        </div>
        <Footer/>
    
        </div>
        </div>
        );
    }
}