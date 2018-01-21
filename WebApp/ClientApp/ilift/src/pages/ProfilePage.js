import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Footer} from '../components/Footer';
import {Classes} from '../components/Classes';
import { Redirect } from 'react-router-dom';

import $ from 'jquery';
import { ScheduleCard } from '../components/ScheduleCard';
import { SubscriptionCard } from '../components/SubscriptionCard';

import {_reloadJs} from '../js/reloadJs';
import {SingletonService} from "../services/SingletonService";

export class ProfilePage extends Component {

  constructor(props){
    super(props);
    this.state = {
      unpaid: [], 
      subscriptions: [],
      oldPassword : "",
      newPassword : "",
      confirmationPass : "",
        loaded: false
    }
    }

    componentWillMount(){
      $('html,body').scrollTop(0);
    }

    componentDidMount() {
        SingletonService.PackageService.get_paid_packages_for_me().then((response) => {
          const subscriptions = [];

          response.forEach(pack => {
            const entry = subscriptions.find(x => x.id === pack.id_package);
            if (entry) {
                entry.courses.push({
                  number_subscribtions: pack.nr_courses,
                  name: pack.name
                });
            }
            else {
              const entry = {
                packageName : pack.package_name,
                pricing: pack.pricing,
                expirationDate: pack.due_date,
                description: pack.description,
                courses: [{
                  number_subscribtions: pack.nr_courses,
                  name: pack.name
                }],
                id: pack.id_package,
                isRenew: this._getCurrentDate() >= pack.expirationDate,
                isSubscribed: true
            };
            subscriptions.push(entry);
          }
          });

          SingletonService.PackageService.get_unpaid_packages_for_me().then((response) => {
            const unpaid = [];
  
              response.forEach(pack => {
                  const entry = {
                    packageName : pack.package_name,
                    pricing: pack.pricing,
                    description: pack.description,
                    courses: [],
                    days: pack.days,
                    id: pack.id_package
                };
                unpaid.push(entry);
              

            });
              this.setState({subscriptions, unpaid});
              //console.log("SUBS ARE: "+ subscriptions);
              this.setState({loaded: true});
          });
        });
    }

    _getCurrentDate() {
      const today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; 
      var yyyy = today.getFullYear();

      if(dd<10) {
        dd = '0'+dd
      } 
      
      if(mm<10) {
          mm = '0'+mm
      } 
      
      return yyyy + "-" + mm + "-" + dd;
    }

    render() {
      console.log(this.state.subscriptions);
        _reloadJs();
        if(localStorage.token === ""){
            return <Redirect to='/'/>;
        }

        if(this.state.loaded === true)
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
                    <h1 className="text-center">Hello, {localStorage.username}</h1>
                    <p>Manage you gym program</p>
                </div>
                </div>
            </div>
            </div>
        </div>

        <Schedule isPersonalised={true} title={"Your personal schedule"}/>


      <div id="fh5co-contact">
			<div className="container">
      <div className="row">
      <div className="col-md-8 col-md-offset-2">
      <div className="heading-section text-center animate-box">
          <h2>Change password</h2>
      </div>
      </div>
      <div className="col-md-6 animate-box">
        <div className="row">
          <div className="col-md-6 col-md-offset-9" style={{heigth: '50px !important'}}>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Old Password" id="password"
            value={this.state.oldPassword} onChange={(newVal) => {this.setState({oldPassword: newVal.target.value});}}
            />
          </div>
        </div>
          <div className="col-md-6 col-md-offset-9" style={{heigth: '50px !important'}}>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="New Password" id="password"
              value={this.state.newPassword} onChange={(newVal) => { this.setState({newPassword: newVal.target.value});}}/>
            </div>
          </div>
          <div className="col-md-6 col-md-offset-9" style={{heigth: '50px !important'}}>
            <div className="form-group">
              <input type="password" className="form-control" placeholder="Confirm Password" id="password"
              value={this.state.confirmationPass} onChange={(newVal) => {this.setState({confirmationPass: newVal.target.value});}}/>
            </div>
          </div>
          <div className="col-md-12 col-md-offset-9">
            <div className="form-group">
              <button type="submit" value="Sign in" className="btn btn-primary" onClick={() => {this._change_password();}}>
               Change password
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>

        <div className="fh5co-pricing fh5co-lightgray-section">
        <div className="container">
          <div className="row">
            <div className="className=">
              <div className="heading-section text-center animate-box">
                <h2>Your current Pricing Plans</h2>
              </div>
            </div>
          </div>
          <div className="row">
                  {
                    this.state.subscriptions.map(packag =>
                      <SubscriptionCard
                        id={packag.id}
                        packageName={packag.packageName}
                        pricing={packag.pricing}
                        description={packag.description}
                        days={packag.days}
                        courses={packag.courses}
                        expirationDate={packag.expirationDate}
                        isRenew={packag.isRenew}
                        isSubscribed={packag.isSubscribed}
                    />)
                  }
            </div>
            {this.state.subscriptions.length === 0 &&
                    "No active packages"
            }
          </div>
          </div>

          <div className="fh5co-pricing fh5co-lightgray-section">
        <div className="container">
          <div className="row">
            <div className="className=">
              <div className="heading-section text-center animate-box">
                <h2>Your unpaid Pricing Plans</h2>
              </div>
            </div>
          </div>
          <div className="row">
                  {
                    this.state.unpaid.map(packag => 
                      <SubscriptionCard
                        id={packag.id}
                        packageName={packag.packageName}
                        pricing={packag.pricing}
                        description={packag.description}
                        days={packag.days}
                        courses={packag.courses}
                        isRenew={false}
                        isSubscribed={true}
                    />)
                  }
            </div>
            {this.state.unpaid.length === 0 &&
                    "No upaid packages"
            }
          </div>
          </div>

        <Footer/>
    
        </div>
        </div>
        );
        else return(<div>Loading...</div>);
    }

    _change_password(){
      if(this.state.oldPassword === "" || this.state.newPassword === "" || this.state.confirmationPass === ""){
        alert("All field must be filled in!");
        return;
      }
      if(this.state.oldPassword !== localStorage.getItem("password")) {
        alert("Old password is not correct!");
        return;
      }
      if(this.state.newPassword !== this.state.confirmationPass) {
        alert("New password and confiramtion do not match!");
        return;
      }
        SingletonService.UserService.change_password(this.state.oldPassword, this.state.newPassword).then((result) => {
          if(result === null)
          {
              return;
          }
          this.setState({list: result});
      });
    }
}