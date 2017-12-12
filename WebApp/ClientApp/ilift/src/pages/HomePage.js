import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Trainers} from '../components/Trainers';
import {SubscriptionTypes} from '../components/SubscriptionTypes';
import {News} from '../components/News';
import {Footer} from '../components/Footer';
import { Link } from 'react-router-dom';

import {_reloadJs} from '../js/reloadJs';

export class HomePage extends Component {

  componentWillReceiveProps(nextProps){
    window.location.reload();
  }

  render() {
    _reloadJs();
    console.log("session token: " + localStorage.getItem("token"));
    return (
      <div id="fh5co-wrapper">
        <div id="fh5co-page">

        <Header/>
      
        <div className="fh5co-hero">
          <div className="fh5co-overlay"></div>
          <div className="fh5co-cover home-background" data-stellar-background-ratio="0.5">
            <div className="desc animate-box">
              <div className="container">
                <div className="row" >
                  <div className="col-md-7" style={{paddingTop: "20px"}}>
                    <h2 style={{fontSize: '50px'}}>Fitness &amp; Health <br/>is a <b>Mentality</b></h2>
                    <span><Link to={'/login'}><button className="btn btn-primary">Sign in!</button></Link></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      <Schedule/>
      
      <div className="fh5co-parallax back-3" data-stellar-background-ratio="0.5">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
              <div className="fh5co-intro fh5co-table-cell animate-box">
                <h1 className="text-center">Commit To Always Lift</h1>
                <p>Excuses don't make you stronger!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Trainers/>


      <div className="fh5co-parallax back-2" data-stellar-background-ratio= "0.5">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 col-md-pull-3 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 fh5co-table">
              <div className="fh5co-intro fh5co-table-cell box-area">
                <div className="animate-box">
                  <h1>Fitness Classes this winter</h1>
                  <p>So you'll be proud this summer!</p>
                  <a href="#" className="btn btn-primary">Subscribe to a class!</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionTypes/>

      <News/>
      
      <Footer/>

    </div>
    </div>
    );
  }
}
