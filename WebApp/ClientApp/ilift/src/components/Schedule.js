import React, { Component } from 'react';
import { ScheduleCard } from './ScheduleCard';
import {SingletonService} from "../services/SingletonService";

export class Schedule extends Component {

  constructor(props){
    super(props);
    this.state = {
        selectedWeek: "Current week",
        monday: [], 
        tuesday: [],
        thursday: [], 
        wednesday: [], 
        friday: [], 
        saturday: [],
        sunday: [],
        isEmpty: false
    }
  };

  componentDidMount() {
    this._getData();
  }

  _getData(selectedWeek) {
    const week = selectedWeek ? selectedWeek : "Current Week";
    SingletonService.ScheduleService.get_schedule_for_week(this._getDate(week))
    .then((response) => {
        const sunday = [];
        const monday = [];
        const tuesday = [];
        const wednesday = [];
        const thursday = [];
        const friday = [];
        const saturday = [];
        let isEmpty = false;

      if(localStorage.getItem("username")) {
        SingletonService.SubscribtionService.get_my_subscribtions().then((data) => {
          if (data.length === 0 && this.props.isPersonalised) {
            isEmpty = true;
          }

          data.forEach(s => {
            let obj = response[0].sunday.find(x => x.id === s.id_entry);
            if (obj) {
              sunday.push({...obj, isSubscribed: true});
            }
            obj = response[1].monday.find(x => x.id === s.id_entry);
            if (obj) {
              monday.push({...obj, isSubscribed: true});
            }
            obj = response[2].tuesday.find(x => x.id === s.id_entry);
            if (obj) {
              tuesday.push({...obj, isSubscribed: true});
            }
            obj = response[3].wednesday.find(x => x.id === s.id_entry);
            if (obj) {
              wednesday.push({...obj, isSubscribed: true});
            }
            obj = response[4].thursday.find(x => x.id === s.id_entry);
            if (obj) {
              thursday.push({...obj, isSubscribed: true});
            }
            obj = response[5].friday.find(x => x.id === s.id_entry);
            if (obj) {
              friday.push({...obj, isSubscribed: true});
            }
            obj = response[6].saturday.find(x => x.id === s.id_entry);
            if (obj) {
              saturday.push({...obj, isSubscribed: true});
            }
          })

          if (!this.props.isPersonalised) {
            response[0].sunday.forEach( x => {
              const obj = sunday.find(el => el.id === x.id);
              if (!obj) {
                sunday.push({...x, isSubscribed: false});
              }
            });
            response[1].monday.forEach( x => {
              const obj = monday.find(el => el.id === x.id);
              if (!obj) {
                monday.push({...x, isSubscribed: false});
              }
            });
            response[2].tuesday.forEach( x => {
              const obj = tuesday.find(el => el.id === x.id);
              if (!obj) {
                tuesday.push({...x, isSubscribed: false});
              }
            });
            response[3].wednesday.forEach( x => {
              const obj = wednesday.find(el => el.id === x.id);
              if (!obj) {
                wednesday.push({...x, isSubscribed: false});
              }
            });
            response[4].thursday.forEach( x => {
              const obj = thursday.find(el => el.id === x.id);
              if (!obj) {
                thursday.push({...x, isSubscribed: false});
              }
            });
            response[5].friday.forEach( x => {
              const obj = friday.find(el => el.id === x.id);
              if (!obj) {
                friday.push({...x, isSubscribed: false});
              }
            });
            response[6].saturday.forEach( x => {
              const obj = saturday.find(el => el.id === x.id);
              if (!obj) {
                saturday.push({...x, isSubscribed: false});
              }
            });
          }

          if(selectedWeek){
            this.setState({sunday, monday, tuesday, wednesday, thursday, friday, saturday, isEmpty, selectedWeek});

          }else{
            this.setState({sunday, monday, tuesday, wednesday, thursday, friday, saturday, isEmpty});
          }
        });
      }
      else {
        if (!this.props.isPersonalised) {
          response[0].sunday.forEach( x => {
            const obj = sunday.find(el => el.id === x.id);
            if (!obj) {
              sunday.push({...x, isSubscribed: false});
            }
          });
          response[1].monday.forEach( x => {
            const obj = monday.find(el => el.id === x.id);
            if (!obj) {
              monday.push({...x, isSubscribed: false});
            }
          });
          response[2].tuesday.forEach( x => {
            const obj = tuesday.find(el => el.id === x.id);
            if (!obj) {
              tuesday.push({...x, isSubscribed: false});
            }
          });
          response[3].wednesday.forEach( x => {
            const obj = wednesday.find(el => el.id === x.id);
            if (!obj) {
              wednesday.push({...x, isSubscribed: false});
            }
          });
          response[4].thursday.forEach( x => {
            const obj = thursday.find(el => el.id === x.id);
            if (!obj) {
              thursday.push({...x, isSubscribed: false});
            }
          });
          response[5].friday.forEach( x => {
            const obj = friday.find(el => el.id === x.id);
            if (!obj) {
              friday.push({...x, isSubscribed: false});
            }
          });
          response[6].saturday.forEach( x => {
            const obj = saturday.find(el => el.id === x.id);
            if (!obj) {
              saturday.push({...x, isSubscribed: false});
            }
          });
        }

        if(selectedWeek){
          this.setState({sunday, monday, tuesday, wednesday, thursday, friday, saturday, isEmpty, selectedWeek});

        }else{
          this.setState({sunday, monday, tuesday, wednesday, thursday, friday, saturday, isEmpty});
        }
      }
    })
  }

  _getDate(selectedWeek) {
    const today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    if(selectedWeek === "Next week"){
      const rest = dd + 7 - 30;
      dd = rest <= 0 ? dd + 7 : rest;
      mm = rest <= 0 ? mm : mm + 1;
      mm = mm === 12 ? 0 : mm;
      yyyy = mm === 12 ? yyyy + 1 : yyyy;
    }

    if(dd<10) {
      dd = '0'+dd
    } 
    
    if(mm<10) {
        mm = '0'+mm
    } 
    
    return yyyy + "-" + mm + "-" + dd;
  }

  render() {
        const dropdownText = this.state.selectedWeek === "" ? "Select week" : this.state.selectedWeek;
        const dropdownOptions = ["Current week", "Next week"].filter(x => x !== dropdownText);

        return (
        <div id="fh5co-schedule-section" className="fh5co-lightgray-section">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="heading-section text-center animate-box">
                <h2>{this.props.title}</h2>
                
                {
                  !this.state.isEmpty && 
                <div className="btn-group" id="status" data-toggle="buttons">
                  <label className={"btn btn-default btn-md " + this._getCssClasses("Current week")} onClick={() => {
                    this._getData("Current week");
                  }}>
                    <input type="radio" value="1" checked="checked"/>Current week
                  </label>
                  <label className={"btn btn-default btn-md " + this._getCssClasses("Next week")} onClick={() => {
                    this._getData("Next week");
                  }}>
                    <input type="radio" value="0"/>Next week
                  </label>
                </div>
                }
              </div>
            </div>
          </div>

          {
           !this.state.isEmpty && 
          <div className="row animate-box">
            <div className="col-md-10 col-md-offset-1 text-center">
              <ul className="schedule">
                <li><a href="#" className="active" data-sched="monday">Monday</a></li>
                <li><a href="#" data-sched="tuesday">Tuesday</a></li>
                <li><a href="#" data-sched="wednesday">Wednesday</a></li>
                <li><a href="#" data-sched="thursday">Thursday</a></li>
                <li><a href="#" data-sched="monday">Friday</a></li>
                <li><a href="#" data-sched="saturday">Saturday</a></li>
                <li><a href="#" data-sched="sunday">Sunday</a></li>
              </ul>
            </div>
            <div className="row text-center" style={{marginBottom: 300}}>
  
              <div className="col-md-12 schedule-container">
  
                <div className="schedule-content active" data-day="monday">
                {
                  this.state.monday.map( x => 
                    <ScheduleCard 
                      image={x.icon_path}
                      name={x.course_name}
                      instructorName={x.trainer_name} 
                      time={x.hour_start + " - " + x.hour_finish}
                      isSubscribed={x.isSubscribed}
                      idCourse={x.id_course}
                      idTrainer={x.id_trainer}
                      id={x.id}
                    />
                  )
                }
                </div>                
  
                <div className="schedule-content" data-day="tuesday">
                {
                  this.state.tuesday.map( x => 
                    <ScheduleCard 
                      image={x.icon_path}
                      name={x.course_name}
                      instructorName={x.trainer_name} 
                      time={x.hour_start + " - " + x.hour_finish}
                      isSubscribed={x.isSubscribed}
                      idCourse={x.id_course}
                      idTrainer={x.id_trainer}
                      id={x.id}
                    />
                  )
                }
                </div> 
  
                <div className="schedule-content" data-day="wednesday">
                {
                  this.state.wednesday.map( x => 
                    <ScheduleCard 
                      image={x.icon_path}
                      name={x.course_name}
                      instructorName={x.trainer_name} 
                      time={x.hour_start + " - " + x.hour_finish}
                      isSubscribed={x.isSubscribed}
                      idCourse={x.id_course}
                      idTrainer={x.id_trainer}
                      id={x.id}
                    />
                  )
                }
                </div>
  
                <div className="schedule-content" data-day="thursday">
                  {
                    this.state.thursday.map( x => 
                      <ScheduleCard 
                      image={x.icon_path}
                      name={x.course_name}
                      instructorName={x.trainer_name} 
                      time={x.hour_start + " - " + x.hour_finish}
                      isSubscribed={x.isSubscribed}
                      idCourse={x.id_course}
                      idTrainer={x.id_trainer}
                      id={x.id}
                    />
                    )
                  }
                </div>
  
                <div className="schedule-content" data-day="friday">
                  {
                    this.state.friday.map( x => 
                      <ScheduleCard 
                      image={x.icon_path}
                      name={x.course_name}
                      instructorName={x.trainer_name} 
                      time={x.hour_start + " - " + x.hour_finish}
                      isSubscribed={x.isSubscribed}
                      idCourse={x.id_course}
                      idTrainer={x.id_trainer}
                      id={x.id}
                    />
                    )
                  }
                </div>
  
                <div className="schedule-content" data-day="saturday">
                  {
                    this.state.saturday.map( x => 
                      <ScheduleCard 
                      image={x.icon_path}
                      name={x.course_name}
                      instructorName={x.trainer_name} 
                      time={x.hour_start + " - " + x.hour_finish}
                      isSubscribed={x.isSubscribed}
                      idCourse={x.id_course}
                      idTrainer={x.id_trainer}
                      id={x.id}
                    />
                    )
                  }
                </div>

                <div className="schedule-content" data-day="sunday">
                  {
                    this.state.sunday.map( x => 
                      <ScheduleCard 
                      image={x.icon_path}
                      name={x.course_name}
                      instructorName={x.trainer_name} 
                      time={x.hour_start + " - " + x.hour_finish}
                      isSubscribed={x.isSubscribed}
                      idCourse={x.id_course}
                      idTrainer={x.id_trainer}
                      id={x.id}
                    />)
                  }
                </div>
              </div>
            </div>
		      </div>
          }
          {
            this.state.isEmpty && this.props.isPersonalised ? "You did not subscribe to any class yet" :
              this.state.isEmpty ? "No courses available for the selected week" : null
          }
		    </div>
		</div>
    );
  }

  _getCssClasses(option){
    return option === this.state.selectedWeek ? " btn-on active btn-on-custom" : " btn-off-custom";
  }
}