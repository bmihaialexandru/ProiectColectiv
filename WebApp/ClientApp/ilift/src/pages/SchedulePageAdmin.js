import React, { Component } from 'react';
import {HeaderAdmin} from '../components/HeaderAdmin';
import {FooterAdmin} from '../components/FooterAdmin';

export class SchedulePageAdmin extends Component {
  componentWillReceiveProps(nextProps){
    window.location.reload();
  }
  render() {
      return (
        <div id="fh5co-wrapper">
        <div id="fh5co-page">

        <HeaderAdmin/>

        <div className="fh5co-parallax back-4" data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                <div className="fh5co-intro fh5co-table-cell animate-box">
                  <h1 className="text-center">Manage Schedule </h1>
                  <p> Here you can manage the schedule timetable </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div id="fh5co-team-section">
        <div className="container">
         
          <div className="row about">
            <div className="col-md-7 col-md-offset-0 animate-box">
              <p>Oarrul curent e afisat aici </p>
            </div>

            <div className="col-md-5 col-md-offset-0 animate-box">
              <p>Textfielduri pt adaugare de noi ore etc ...</p>
            </div>

          </div>
        </div>
      </div>
    

        <FooterAdmin/>
        </div>
        </div>
      );
  }
}