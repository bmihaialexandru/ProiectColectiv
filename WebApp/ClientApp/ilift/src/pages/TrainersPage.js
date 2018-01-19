import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Footer} from '../components/Footer';
import {Trainers} from '../components/Trainers';
import {Classes} from '../components/Classes';

import $ from 'jquery';
import {_reloadJs} from '../js/reloadJs';

export class TrainersPage extends Component {

  componentWillMount(){
    $('html,body').scrollTop(0);
  }

  render() {
    _reloadJs();
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
                <h1 className="text-center">Trainers</h1>
                <p>Choose you weapon wisely!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <Trainers/>

      <Footer/>
      
      </div>
      </div>
    );
  }
}