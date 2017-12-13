import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Footer} from '../components/Footer';
import {Classes} from '../components/Classes';
import { Redirect } from 'react-router-dom';

import { ScheduleCard } from '../components/ScheduleCard';
import { SubscriptionCard } from '../components/SubscriptionCard';

import {_reloadJs} from '../js/reloadJs';

export class ProfilePage extends Component {

    needSpacing  = false;

    constructor(props){
        super(props);
        this.state = {
            list : [
                {
                    image : require("../components/images/fit-dumbell.svg"),
                    courseName : "Body Combat",
                    instructorName: 'Bodea Nicolae',
                    time: '06AM-7AM',
                    isSubscribed: true
    
                },
                {
                    image : require("../components/images/fit-cycling.svg"),
                    courseName : "Cycling program",
                    instructorName: 'Sabina Alexa',
                    time: '06AM-7AM',
                    isSubscribed: true
                },
                {
                    image : require("../components/images/fit-yoga.svg"),
                    courseName : "Yoga programs",
                    instructorName: 'Catrinel Carausu',
                    time: '06AM-7AM',
                    isSubscribed: true
                },
                {
                    image : require("../components/images/fit-boxing.svg"),
                    courseName : "Boxing fitness",
                    instructorName: 'Bica Denisa',
                    time: '06AM-7AM',
                    isSubscribed: true
                }
          ]}
        }


    render() {
        _reloadJs();
        if(localStorage.token === ""){
            return <Redirect to='/'/>;
        }

      const spaces = this.needSpacing && <div><br/><br/><br/><br/><br/><br/><br/></div>

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


        <div id="fh5co-contact">
          <div className="container">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                <div className="heading-section text-center animate-box">
                    <h2>Your personal schedule</h2>
                </div>
                </div>
                
            <div className="row animate-box">
            <div className="col-md-10 col-md-offset-1 text-center">
              <ul className="schedule">
                <li><a href="#" className="active" data-sched="monday">Monday</a></li>
                <li><a href="#" data-sched="tuesday">Tuesday</a></li>
                <li><a href="#" data-sched="wednesday">Wednesday</a></li>
                <li><a href="#" data-sched="thursday">Thursday</a></li>
                <li><a href="#" data-sched="monday">Friday</a></li>
                <li><a href="#" data-sched="saturday">Saturday</a></li>
              </ul>
            </div>
            <div className="row text-center">
  
              <div className="col-md-12 schedule-container">
  
                <div className="schedule-content active" data-day="monday">
                {
                  this._getRandomSchedule().map( x => 
                    <ScheduleCard 
                      image={x.image}
                      name={x.courseName}
                      instructorName={x.instructorName}
                      time={x.time}
                      isSubscribed={x.isSubscribed}
                    />
                  )
                }
                </div>                
  
                <div className="schedule-content" data-day="tuesday">
                {
                  this._getRandomSchedule().map( x => 
                    <ScheduleCard 
                      image={x.image}
                      name={x.courseName}
                      instructorName={x.instructorName}
                      time={x.time}
                      isSubscribed={x.isSubscribed}
                    />
                  )
                }
                </div> 
  
                <div className="schedule-content" data-day="wednesday">
                {
                  this._getRandomSchedule().map( x => 
                    <ScheduleCard 
                      image={x.image}
                      name={x.courseName}
                      instructorName={x.instructorName}
                      time={x.time}
                      isSubscribed={x.isSubscribed}
                    />
                  )
                }
                </div>
  
                <div className="schedule-content" data-day="thursday">
                  {
                    this._getRandomSchedule().map( x => 
                      <ScheduleCard 
                        image={x.image}
                        name={x.courseName}
                        instructorName={x.instructorName}
                        time={x.time}
                        isSubscribed={x.isSubscribed}
                      />
                    )
                  }
                </div>
  
                <div className="schedule-content" data-day="friday">
                  {
                    this._getRandomSchedule().map( x => 
                      <ScheduleCard 
                        image={x.image}
                        name={x.courseName}
                        instructorName={x.instructorName}
                        time={x.time}
                        isSubscribed={x.isSubscribed}
                      />
                    )
                  }
                </div>
  
                <div className="schedule-content" data-day="saturday">
                  {
                    this._getRandomSchedule().map( x => 
                      <ScheduleCard 
                        image={x.image}
                        name={x.courseName}
                        instructorName={x.instructorName}
                        time={x.time}
                        isSubscribed={x.isSubscribed}
                      />
                    )
                  }
                </div>
              </div>
            </div>
		    </div>
              
            {spaces}
            </div>
          </div>
        </div>



        <div id="fh5co-pricing-section" className="fh5co-pricing fh5co-lightgray-section">
        <div className="container">
          <div className="row">
            <div className="className=">
              <div className="heading-section text-center animate-box">
                <h2>Your current Pricing Plan</h2>
              </div>
            </div>
          </div>
          <div className="row"  style={{marginLeft: '36%'}}>
            <div className="pricing">
                  <SubscriptionCard
                      subscriptionName={"Cardio Burst"}
                      price={"100"}
                      description={"Burn it down!"}
                      startDate={"17.11.2017"}
                      endDate={"17.12.2017"}
                  />
            </div> 
            </div>
          </div>
          </div>
        <Footer/>
    
        </div>
        </div>
        );
    }

    _getRandomSchedule() {
        const array = [];
        const max = Math.floor(Math.random()*4);
        for(let i=0; i < max; i++){
          array.push(this.state.list[Math.floor(Math.random()*this.state.list.length)]);
        }
        if(array.length === 0 && this.needSpacing === false){
          this.needSpacing = true;
        }
        return array;
    }
}