import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Footer} from '../components/Footer';
import {Trainers} from '../components/Trainers';
import {Classes} from '../components/Classes';

export class AboutPage extends Component {
  render() {
      return (
        <div id="fh5co-wrapper">
        <div id="fh5co-page">

        <Header/>

        <div className="fh5co-parallax back-4" data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                <div className="fh5co-intro fh5co-table-cell animate-box">
                  <h1 className="text-center">About Us</h1>
                  <p>Made with love by the fine folks at <a href="http://freehtml5.co">932/Brilliant</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="fh5co-team-section">
        <div className="container">
          <div className="row about">
            <div className="col-md-12 col-md-offset-0">
              <img className="img-responsive animate-box" src="images/home-image-3.jpg" alt="About"/>
            </div>
            <div className="col-md-12 col-md-offset-0 animate-box">
              <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.</p>
              <blockquote>
                <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.</p>
              </blockquote>
              <p>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.</p>
            </div>
          </div>

          <div>Aici o sa fie poze cu echipa</div>

        </div>
      </div>

        <Footer/>
        </div>
        </div>
      );
  }
}