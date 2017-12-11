import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Footer} from '../components/Footer';
import {Classes} from '../components/Classes';
import {login} from '../WebApis/LoginWebApi';
import { Redirect } from 'react-router-dom';

import {_reloadJs} from '../js/reloadJs';

export class LoginPage extends Component {
  render() {
    _reloadJs();
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
                <h1 className="text-center">Sign in</h1>
                <p>Log into your iLift account</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div id="fh5co-contact">
			<div className="container">
      <div className="row">
      <div className="col-md-6 animate-box">
        <div className="row">
          <div className="col-md-6 col-md-offset-9">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Username" id="username"/>
            </div>
          </div>
          <div className="col-md-6 col-md-offset-9">
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" id="password"/>
            </div>
          </div>
          <div className="col-md-12 col-md-offset-9">
            <div className="form-group">
              <button type="submit" value="Sign in" className="btn btn-primary" onClick={() => {
                        this._loginUser(document.getElementById("username").value, document.getElementById("password").value);
              }}>
               Sign in 
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
      <Footer/>
  
    </div>
    </div>
    );
  }

  _loginUser(username, password){
    const response = login(username, password)
     .then(result => {
        // document.getElementsByClassName("ilift-account")[0].style.display = "inline";
        document.getElementsByClassName("ilift-account-name")[0].innerHTML = username;

        //window.location.replace("/");
        return result;
      })
      .catch(error => {
          alert(error);
      });
    }
}