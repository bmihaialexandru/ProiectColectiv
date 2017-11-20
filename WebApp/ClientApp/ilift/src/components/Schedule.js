import React, { Component } from 'react';

export class Schedule extends Component {


  render() {
        return (
        <div id="fh5co-schedule-section" className="fh5co-lightgray-section">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="heading-section text-center animate-box">
                <h2>Class Schedule</h2>
              </div>
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
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-dumbell.svg")} alt="Cycling"/>
                      <small>06AM-7AM</small>
                      <h3>Body Building</h3>
                      <span>John Doe</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-yoga.svg")} alt=""/>
                      <small>06AM-7AM</small>
                      <h3>Yoga Programs</h3>
                      <span>James Smith</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-cycling.svg")} alt=""/>
                      <small>06AM-7AM</small>
                      <h3>Cycling Program</h3>
                      <span>Rita Doe</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-boxing.svg")} alt="Cycling"/>
                      <small>06AM-7AM</small>
                      <h3>Boxing Fitness</h3>
                      <span>John Dose</span>
                    </div>
                  </div>
                </div>                
  
                <div className="schedule-content" data-day="tuesday">
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-dumbell.svg")} alt="Cycling"/>
                      <small>06AM-7AM</small>
                      <h3>Body Building</h3>
                      <span>John Doe</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-yoga.svg")} alt=""/>
                      <small>06AM-7AM</small>
                      <h3>Yoga Programs</h3>
                      <span>James Smith</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-cycling.svg")} alt=""/>
                      <small>06AM-7AM</small>
                      <h3>Cycling Program</h3>
                      <span>Rita Doe</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-boxing.svg")} alt="Cycling"/>
                      <small>06AM-7AM</small>
                      <h3>Boxing Fitness</h3>
                      <span>John Dose</span>
                    </div>
                  </div>
                </div> 
  
                <div className="schedule-content" data-day="wednesday">
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-yoga.svg")} alt=""/>
                      <small>06AM-7AM</small>
                      <h3>Yoga Programs</h3>
                      <span>James Smith</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-dumbell.svg")} alt="Cycling"/>
                      <small>06AM-7AM</small>
                      <h3>Body Building</h3>
                      <span>John Doe</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-boxing.svg")} alt="Cycling"/>
                      <small>06AM-7AM</small>
                      <h3>Boxing Fitness</h3>
                      <span>John Dose</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-cycling.svg")} alt=""/>
                      <small>06AM-7AM</small>
                      <h3>Cycling Program</h3>
                      <span>Rita Doe</span>
                    </div>
                  </div>
                </div>
  
                <div className="schedule-content" data-day="thursday">
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-dumbell.svg")} alt="Cycling"/>
                      <small>06AM-7AM</small>
                      <h3>Body Building</h3>
                      <span>John Doe</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-yoga.svg")} alt=""/>
                      <small>06AM-7AM</small>
                      <h3>Yoga Programs</h3>
                      <span>James Smith</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-cycling.svg")} alt=""/>
                      <small>06AM-7AM</small>
                      <h3>Cycling Program</h3>
                      <span>Rita Doe</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-boxing.svg")} alt="Cycling"/>
                      <small>06AM-7AM</small>
                      <h3>Boxing Fitness</h3>
                      <span>John Dose</span>
                    </div>
                  </div>
                </div>
  
                <div className="schedule-content" data-day="friday">
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-yoga.svg")} alt=""/>
                      <small>06AM-7AM</small>
                      <h3>Yoga Programs</h3>
                      <span>James Smith</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-dumbell.svg")} alt="Cycling"/>
                      <small>06AM-7AM</small>
                      <h3>Body Building</h3>
                      <span>John Doe</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-boxing.svg")} alt="Cycling"/>
                      <small>06AM-7AM</small>
                      <h3>Boxing Fitness</h3>
                      <span>John Dose</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-cycling.svg")} alt=""/>
                      <small>06AM-7AM</small>
                      <h3>Cycling Program</h3>
                      <span>Rita Doe</span>
                    </div>
                  </div>
                </div>
  
                <div className="schedule-content" data-day="saturday">
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-dumbell.svg")} alt="Cycling"/>
                      <small>06AM-7AM</small>
                      <h3>Body Building</h3>
                      <span>John Doe</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-yoga.svg")} alt=""/>
                      <small>06AM-7AM</small>
                      <h3>Yoga Programs</h3>
                      <span>James Smith</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-cycling.svg")} alt=""/>
                      <small>06AM-7AM</small>
                      <h3>Cycling Program</h3>
                      <span>Rita Doe</span>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-6">
                    <div className="program program-schedule">
                      <img src={require("./images/fit-boxing.svg")} alt="Cycling"/>
                      <small>06AM-7AM</small>
                      <h3>Boxing Fitness</h3>
                      <span>John Dose</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
		      </div>
		    </div>
		</div>
    );
  }
}