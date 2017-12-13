import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Footer} from '../components/Footer';
import {Classes} from '../components/Classes';
import $ from 'jquery'; 

import {_reloadJs} from '../js/reloadJs';

export class CoursesPage extends Component {
  render() {
    _reloadJs();
    return (
      <div id="fh5co-wrapper">
      <div id="fh5co-page">
      
      <Header/>

      <div className="fh5co-parallax back-2" data-stellar-background-ratio="0.5">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
              <div className="fh5co-intro fh5co-table-cell animate-box">
                <h1 className="text-center">Classes</h1>
                <p>Get moving!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="fh5co-schedule-section" className="fh5co-lightgray-section">
      <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="heading-section text-center animate-box">
            <h2>Our programs</h2>
          </div>
        </div>
      </div>

      <Classes/>

      </div>
      </div>

      <Footer/>
  
    </div>
    </div>
    );
  }
}