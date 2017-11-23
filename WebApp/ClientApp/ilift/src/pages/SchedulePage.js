import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Trainers} from '../components/Trainers';
import {SubscriptionTypes} from '../components/SubscriptionTypes';
import {News} from '../components/News';
import {Footer} from '../components/Footer';

import {_reloadJs} from '../js/reloadJs';

export class SchedulePage extends Component {
  render() {
    _reloadJs();
    return (
      <div id="fh5co-wrapper">
      <div id="fh5co-page">
      
      <Header/>

      <div class="fh5co-parallax back-5" data-stellar-background-ratio="0.5">
        <div class="overlay"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
              <div class="fh5co-intro fh5co-table-cell animate-box">
                <h1 class="text-center">Schedule</h1>
                <p>Build up your fitness program as you wish!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <Schedule/>  

      <Footer/>
             
      </div>
      </div>
    );
  }
}