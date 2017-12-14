import React, { Component } from 'react';
import { ScheduleCard } from './ScheduleCard';

export class Schedule extends Component {

  constructor(props){
    super(props);
    this.state = {
        selectedWeek: "Current week",
        list : [
            {
                image : require("./images/fit-dumbell.svg"),
                courseName : "Body Combat",
                instructorName: 'Bodea Nicolae',
                time: '06AM-7AM',
                isSubscribed: false

            },
            {
                image : require("./images/fit-cycling.svg"),
                courseName : "Cycling program",
                instructorName: 'Sabina Alexa',
                time: '06AM-7AM',
                isSubscribed: false
            },
            {
                image : require("./images/fit-yoga.svg"),
                courseName : "Yoga programs",
                instructorName: 'Catrinel Carausu',
                time: '06AM-7AM',
                isSubscribed: false
            },
            {
                image : require("./images/fit-boxing.svg"),
                courseName : "Boxing fitness",
                instructorName: 'Bica Denisa',
                time: '06AM-7AM',
                isSubscribed: true
            },
            {
                image : require("./images/fit-swimming.svg"),
                courseName : "Swimming program",
                instructorName: 'Baciu Cristian',
                time: '06AM-7AM',
                isSubscribed: false
            },
            {
                image : require("./images/fit-massage.svg"),
                courseName : "Massage",
                instructorName: 'Codrin Strimbei',
                time: '06AM-7AM',
                isSubscribed: false
            },
            {
              image : require("./images/fit-swimming.svg"),
              courseName : "Culturism hour",
              instructorName: 'Badila Mihai',
              time: '06AM-7AM',
              isSubscribed: false
          },
          {
              image : require("./images/fit-massage.svg"),
              courseName : "Crossfit",
              instructorName: 'Bocioc Titus',
              time: '06AM-7AM',
              isSubscribed: false
          },
      ]}
  };

  render() {
        const dropdownText = this.state.selectedWeek === "" ? "Select week" : this.state.selectedWeek;
        const dropdownOptions = ["Current week", "Next week"].filter(x => x !== dropdownText);

        return (
        <div id="fh5co-schedule-section" className="fh5co-lightgray-section">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="heading-section text-center animate-box">
                <h2>Class Schedule</h2>
                <br/>

                <div class="btn-group" id="status" data-toggle="buttons">
                  <label class={"btn btn-default btn-md " + this._getCssClasses("Current week")} onClick={() => this.setState({selectedWeek: "Current week"})}>
                    <input type="radio" value="1" checked="checked"/>Current week
                  </label>
                  <label class={"btn btn-default btn-md " + this._getCssClasses("Next week")} onClick={() => this.setState({selectedWeek: "Next week"})}>
                    <input type="radio" value="0"/>Next week
                  </label>
                </div>


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
		    </div>
		</div>
    );
  }

  _getRandomSchedule() {
    const array = [];
    for(let i=0; i < 4; i++){
      array.push(this.state.list[Math.floor(Math.random()*this.state.list.length)]);
    }
    return array;
  }

  _getCssClasses(option){
    return option === this.state.selectedWeek ? " btn-on active btn-on-custom" : " btn-off-custom";
  }
}