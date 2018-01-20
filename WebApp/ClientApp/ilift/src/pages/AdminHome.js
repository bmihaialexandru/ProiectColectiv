import React, { Component } from 'react';
import {FooterAdmin} from '../components/FooterAdmin';
import {HeaderAdmin} from '../components/HeaderAdmin';
import {RoomsList} from '../components/RoomsList';

export class AdminHome extends Component {
   componentWillReceiveProps(nextProps){
    console.log("homeadmin");
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
                  <h1 className="text-center">Hello , admin !</h1>
                  <p> Here you can manage all the page data </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="fh5co-team-section">
        <div className="container">
          <div className="row about">
            <div className="col-md-12 animate-box">
              <RoomsList/>
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

