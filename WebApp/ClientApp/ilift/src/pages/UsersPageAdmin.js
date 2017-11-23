import React, { Component } from 'react';
import {HeaderAdmin} from '../components/HeaderAdmin';
import {FooterAdmin} from '../components/FooterAdmin';
import '../template/css/inputBox.css';

export class UsersPageAdmin extends Component {
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
                  <h1 className="text-center">Manage Users </h1>
                  <p> Here you can manage all the users </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      <div id="fh5co-team-section">
        <div className="container">
         
          <div className="row about">
            <div className="col-md-7 col-md-offset-0 animate-box">
              <form method="get" action="/search" id="search">
                 <input name="q" type="text" size="40" placeholder="Search..." />
              </form>
            </div>

            <div className="col-md-5 col-md-offset-0 animate-box">
              

                <div class="container">
      
                    <div class="">
                  
                      
                        <h1 class="text-centter">Register new user</h1>
                        
                        <input type="text" name="username" placeholder="Name" />
                        <input type="text" name="phone" placeholder="Phone" />
                        <input type="text" name="email" placeholder="E-mail" />
                        <input type="password" name="password" placeholder="Password" />
                        
                        <input type="submit" name="signup_submit" value="Sign up" />
                      

                    </div>

              </div>


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