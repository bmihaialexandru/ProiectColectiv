import React, { Component } from 'react';
import Rodal from 'rodal';
import Select from 'react-select';
import TimePicker from 'react-times';
import TimeInput from 'react-time-input';
import {SingletonService} from "../services/SingletonService";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {formatDate} from 'react-day-picker/moment';
import 'rodal/lib/rodal.css';
import 'react-day-picker/lib/style.css';
import 'react-select/dist/react-select.css';
import 'react-times/css/classic/default.css';
import {_reloadJs} from '../js/reloadJs';



export class ScheduleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        currentSchedule : {dateStart:'',dateEnd:'',hourStart:'00:00:00',hourFinish:'00:00:00',course:'',trainer:'',room:'',type:'weekly'},
        scheduleToUpdate :{day:'',hourStart:'',hourEnd:'',course:'',trainer:'',room:'',id:0},
        type : [{value:'weekly',label:'weekly'},{value:'monthly',label:'monthly'},{value:'bi-monthly',label:'bi-monthly'}],
        courses :[],
        trainers : [],
        rooms : [],
        schedules :[],
        icons: [],
        visible :false,
        scheduleToDelete :0,
        icon_id: 0,
        icon_path: "",
        selected_week: "",
        weeks: []
    };
    this.load_dem_weeks();
    this.loadData();
    this.load();
    }

    load_dem_weeks() {
        Date.prototype.addDays = function(days) {
            var date = new Date(this.valueOf());
            date.setDate(date.getDate() + days);
            return date;
        };

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        let yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        let wkdy = yyyy + '-' + mm + '-' + dd;
        this.state.selected_week = wkdy;
        this.setState({selected_week: this.state.selected_week});

        let dateArray = [];
        let currentDate = today;
        // 10 weeks will do...
        while (currentDate <= today.addDays(10*7)) {
            let dd = currentDate.getDate();
            let mm = currentDate.getMonth() + 1;
            let yyyy = today.getFullYear();
            let wkdy = yyyy + '-' + mm + '-' + dd;
            dateArray.push(wkdy);
            currentDate = currentDate.addDays(7);
        }
        this.state.weeks = dateArray;
        this.setState({weeks: this.state.weeks});
    }

    load()
    {
      SingletonService.TrainerService.get_all_trainers().then((result) => {
          if(result === null){return; }
          var list = [];
          for (var trainer = 0; trainer < result.length; trainer++){
              var newTrainer = {value: result[trainer].id, label : result[trainer].name};
              list.push(newTrainer);
          }

          this.state.trainers = list;
          this.setState(this.state.trainers);

      });
      SingletonService.TrainingRoomService.get_all_rooms().then((result) => {
          if(result === null){return; }
          var list = [];
          for (var index = 0; index < result.length; index++){
              var newRoom = {value: result[index].id_training_room, label : result[index].name};
              list.push(newRoom);
          }

          this.state.rooms = list;
          this.setState(this.state.rooms);

      });

      SingletonService.CourseService.get_all_courses().then((result) => {
          if(result === null){return; }
          var list = [];
          for (var index = 0; index < result.length; index++){
              var newCourse = {value: result[index].id, label : result[index].courseName};
              list.push(newCourse);
          }
          this.state.courses = list;
          this.setState(this.state.courses);

      });

      SingletonService.ScheduleService.get_icons().then((result) => {
          if (result === null) {
              return;
          }
          let list = [];
          console.log(result);
          for (let i = 0; i < result.length; i++) {
              let newIcon = {value: result[i].id_icon, label: result[i].path_to_icon};
              list.push(newIcon);
          }
          this.state.icons = list;
          this.setState({icons: this.state.icons});
          if (list.length > 0) {
            this.state.icon_id = list[0].id_icon;
            this.state.icon_path = list[0].path_to_icon;
            this.setState({icon_id: this.state.icon_id});
            this.setState({icon_path: this.state.path_to_icon});
          }



    });
    }

    loadData()
    {
        SingletonService.ScheduleService.get_schedule_for_week(this.state.selected_week).then((result) => {
          if(result === null)
          {return;}
          var days=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
          var list = [];
          for (var index = 0; index < result.length; index++){
              var day=days[index];
              var newschedules=result[index][day];
              for(var i=0;i<newschedules.length;i++)
              {
                list.push({id:newschedules[i].id,day:newschedules[i].day,hourStart:this.parseTime(newschedules[i].hour_start),hourEnd:this.parseTime(newschedules[i].hour_finish),course:newschedules[i].course_name,trainer:newschedules[i].trainer_name,room:newschedules[i].room_name});
                this.parseTime(newschedules[i].hour_start);
              }
          }
          this.state.schedules = list;
          this.setState(this.state.schedules);
      });      
    }

    parseTime(time)
    {
      var res=time.split(':');
      return res[0]+':'+res[1];
    }

    show(schedule) {
        this.setState({ visible: true , scheduleToDelete:schedule.id});

    }

    hide() {
        this.setState({ visible: false });
    }

    handleRowDel(schedule) {
      this.show(schedule);
      console.log(schedule);
    };

    onOkClick()
      {
        SingletonService.ScheduleService.delete_schedule_entry(localStorage.getItem("token"),this.state.scheduleToDelete).then((result) => {
          if(result == null) {
              alert("Something went wrong.");
          }
          this.hide();
          this.loadData();
      });
        _reloadJs();
      }

    handleAddEvent() {

      console.log(this.state.currentSchedule);
      var course_id=0;
      var trainer_id=0;
      var room_id=0;
      for(var i=0;i<this.state.trainers.length;i++)
      {
        if(this.state.currentSchedule.trainer==this.state.trainers[i].label)
        {
          trainer_id=this.state.trainers[i].value;
          break;
        }

      }
      for(var i=0;i<this.state.courses.length;i++)
      {
        if(this.state.currentSchedule.course==this.state.courses[i].label)
        {
          course_id=this.state.courses[i].value;
          break;
        }
      }
      console.log("ROOM: " +this.state.currentSchedule.room);
       for(var i=0;i<this.state.rooms.length;i++)
      {
        if(this.state.currentSchedule.room==this.state.rooms[i].label)
        {
          room_id=this.state.rooms[i].value;
          break;
        }
      }
      console.log(room_id,course_id,trainer_id);
      var schedule=this.state.currentSchedule;
      SingletonService.ScheduleService.add_schedule_entry(localStorage.getItem("token"),schedule.type,schedule.dateStart,schedule.dateEnd,schedule.hourStart,schedule.hourFinish,course_id,trainer_id,room_id, this.state.id_icon).then((result) => {
            console.log(result);
            this.loadData();

        });
    
      _reloadJs();

    }
    updateValue(name,value)
    {
      if(value!=null)
      {
        this.state.currentSchedule[name]=value.label;
      }
      else
      {
        this.state.currentSchedule[name]='';
      }
      this.setState({currentSchedule:this.state.currentSchedule});
    }

    handleScheduleTable(name,value) {
      if(value!=null)
      {
        this.state.scheduleToUpdate[name]=value.label;
      }
      else
      {
        this.state.scheduleToUpdate[name]='';
      }
      this.setState({scheduleToUpdate:this.state.scheduleToUpdate});
      console.log(this.state.scheduleToUpdate);

    }

    handleStartDateUpdate(day,id,name)
    {
        //console.log(name);
        var schedule;
        for(var i=0;i<this.state.schedules.length;i++)
        {
          if(this.state.schedules[i].id ==id)
          {
            var d = day.getDate();
            var month = day.getMonth()+1;
            var year = day.getFullYear();
            var finalDate=year.toString()+'-'+month.toString()+'-'+d.toString();
            this.state.schedules[i][name]=finalDate;
            this.setState(this.state.schedules);
          }
        }
    }

    onDateUpdate(nameTag,day)
    {
      var d = day.getDate();
      var month = day.getMonth()+1;
      var year = day.getFullYear();
      var finalDate=year.toString()+'-'+month.toString()+'-'+d.toString();
      this.state.currentSchedule[nameTag]=finalDate;
      this.setState({currentSchedule:this.state.currentSchedule});
    }

    onTimeUpdate(nameTag,time)
    {
        this.state.currentSchedule[nameTag]=time+':00';
        this.setState({currentSchedule:this.state.currentSchedule});
        console.log(this.state.currentSchedule);
    }


    updateIcon(name, value) {
      if(value === null) {
          return;
      }
      for(let i = 0; i<this.state.icons.length; i++) {
        if(this.state.icons[i].label.localeCompare(value.label) === 0) {
          this.state.id_icon = this.state.icons[i].value;
          this.setState({id_icon: this.state.id_icon});
          this.state.icon_path = this.state.icons[i].label;
          this.setState({icon_path: this.state.icon_path});
        }
      }

    }

    updateCurrentWeek(name, value) {
      this.state.selected_week = value.label;
      this.setState({selected_week:this.state.selected_week});
      this.loadData();
    }

  render() {
    return (
      <div>
        <div>
          <Dropdown options={this.state.weeks.map((x) => {return {value: x, label: x} })} selectedOption={this.state.selected_week} onUpdate={this.updateCurrentWeek.bind(this)} nameTag = {'week'}/>
        </div>
        <div >
          <ScheduleTable types={this.state.type} schedules={this.state.schedules} courses={this.state.courses} trainers={this.state.trainers} rooms={this.state.rooms} onScheduleTableUpdate={this.handleScheduleTable.bind(this)} onBeginDateUpdate={this.handleStartDateUpdate.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)}  />
        </div>
        <div>
          <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-5"><h3>Schedule a new course below :</h3></div>
          </div>
        </div>
        <div>
          <div className="row" >
            <div className="col-xs-1"></div>
            <div className="col-xs-2">Choose start date</div>
            <div className="col-xs-1"></div>
            <div className="col-xs-2">Choose end date</div>
            <div className="col-xs-1"></div>
            <div className="col-xs-2">Choose start time</div>
            <div className="col-xs-1"></div>
            <div className="col-xs-2">Choose end time</div>        
          </div>

          <div className="row" >
            <div className="col-xs-1">From date :</div>
            <div className="col-xs-2">
              <DateInput nameTag={'dateStart'} onUpdate={this.onDateUpdate.bind(this)}/>
            </div>
            <div className="col-xs-1">To date :</div>
            <div className="col-xs-2">
             <DateInput nameTag={'dateEnd'} onUpdate={this.onDateUpdate.bind(this)}/>
            </div>

            <div className="col-xs-3">
              <TimePick onUpdate={this.onTimeUpdate.bind(this)} nameTag={'hourStart'}/>
            </div>   
            <div className="col-xs-3">
              <TimePick onUpdate={this.onTimeUpdate.bind(this)} nameTag={'hourFinish'}/>
            </div> 
          </div>
          <div className="row"></div>
          <div className="row">
            <div className="col-xs-1">Trainer</div>
            <div className="col-xs-2"><Dropdown options={this.state.trainers} selectedOption={''} onUpdate={this.updateValue.bind(this)} nameTag={'trainer'}/></div>
            <div className="col-xs-1">Course</div>
            <div className="col-xs-2"><Dropdown options={this.state.courses} selectedOption={''} onUpdate={this.updateValue.bind(this)} nameTag={'course'}/></div>
          </div>
          <div>
            <div className="row">
              <div className="col-xs-1">Room </div>
              <div className="col-xs-2"><Dropdown options={this.state.rooms} selectedOption={''} onUpdate={this.updateValue.bind(this)} nameTag={'room'}/></div>
              <div className="col-xs-1">Type </div>
              <div className="col-xs-2"><Dropdown options={this.state.type} selectedOption={this.state.type[0].label} onUpdate={this.updateValue.bind(this)} nameTag={'type'}/></div>
              <div className="col-xs-1">Icon</div>
              <div className="col-xs-2"><Dropdown options={this.state.icons} selectedOption={this.state.icon_path} onUpdate={this.updateIcon.bind(this)} nameTag={'icon'}/></div>
              <div className="col-xs-2"><img src={this.state.icon_path} width={100} height={100}/></div>
            </div>
            <div>
              <button className="rodal-confirm-btn" onClick={this.handleAddEvent.bind(this)}>Add</button>
            </div>
          </div>
        </div>
        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} animation={this.state.animation}>
          <div className="rodalheader">Delete schedule ?</div>
          <div className="rodalbody"><h4>Are you sure you want to delete this  schedule ?</h4>
          </div>
          <button className="rodal-confirm-btn" onClick={this.onOkClick.bind(this)}>ok</button>
          <button className="rodal-cancel-btn" onClick={this.hide.bind(this)}>close</button>
        </Rodal>
      </div>
    );

  }

}

class ScheduleTable extends React.Component {
  render() {
    var onScheduleTableUpdate = this.props.onScheduleTableUpdate;
    var onBeginDateUpdate=this.props.onBeginDateUpdate;
    var onRowDel = this.props.onRowDel;
    var courses=this.props.courses;
    var types=this.props.types;
    var trainers=this.props.trainers;
    var rooms=this.props.rooms;
    var bodystyle = {
      height: 350,
       overflow: 'scroll',
       display:'block'
    };

    var schedule = this.props.schedules.map(function(schedule) {
      return (<ScheduleRow types={types} courses={courses} rooms={rooms} trainers={trainers} onBeginDateUpdate={onBeginDateUpdate} onUpdate={onScheduleTableUpdate} schedule={schedule} onDelEvent={onRowDel} key={schedule.id} />)
    });

    return (
      <div className="row">
      <div className="row"></div>
        <div className="col-xs-12" id="container" ref="container" >
            <table className="table table-bordered">
              <tbody style={bodystyle}>
                <tr>
                  <td>Scheduled Course Name</td>
                  <td>Scheduled Trainer Name</td>
                  <td>Day</td>
                  <td>Start time </td>
                  <td>End time </td>
                  <td>Scheduled Room Name</td>
                  <td>Delete</td>
                  <td>Save</td>
                </tr>
                {schedule}
              </tbody>
            </table>
        </div>
      </div>
    );

  }

}

class ScheduleRow extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      courses:this.props.courses,
      rooms:this.props.rooms,
      trainers:this.props.trainers,
    };
  }

  onDelEvent() {
    this.props.onDelEvent(this.props.schedule);

  }
  render() {
    return (
      <tr className="eachRow">
        <SelectableCell options={this.props.courses} onUpdate={this.props.onUpdate} cellData={{value: this.props.schedule.course,id: this.props.schedule.id,nameTag:'course'}} />
        <SelectableCell options={this.props.trainers} onUpdate={this.props.onUpdate} cellData={{value: this.props.schedule.trainer,id: this.props.schedule.id,nameTag:'trainer'}}/>
        <td>
          <DateCell onDateUpdate={this.props.onDateUpdate}  cellData={{value: this.props.schedule.day,id: this.props.schedule.id}}/>
        </td>
        <td>
          <TimeCell onTrainerTableUpdate={this.props.onTrainerTableUpdate} cellData={{value: this.props.schedule.hourStart,id: this.props.schedule.id}}/>
          </td>
          <td>
          <TimeCell onTrainerTableUpdate={this.props.onTrainerTableUpdate} cellData={{value: this.props.schedule.hourEnd,id: this.props.schedule.id}}/>
        </td>
        <SelectableCell options={this.props.rooms} onUpdate={this.props.onUpdate} cellData={{value: this.props.schedule.room,id: this.props.schedule.id,nameTag:'room'}}/>
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
        </td>
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="OK" className="del-btn"/>
        </td>
      </tr>
    );

  }

}


class TimePick extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={};
    this.state.time='00:00';
  
  }

  onTimeChange(newTime)
  {
    this.setState({time:newTime});
    this.props.onUpdate(this.props.nameTag,newTime);
  }

  render() 
  {
    return (
      <TimePicker theme="classic" withoutIcon={true} time={this.state.time} onTimeChange={this.onTimeChange.bind(this)}/>
    );
  }
}

class TimeCell extends React.Component{

  constructor(props)
  {
    super(props);
    this.state={};
    this.state.time=this.props.cellData.value;
  }

  onTimeChangeHandler(val) {
    
    
   }

    render() {
    return (
      <TimeInput
        initTime={this.state.time}
        ref="TimeInputWrapper"
        className='form-control'
        mountFocus='true'
        onTimeChange={this.onTimeChangeHandler.bind(this)}
      />
    );
   }

}

class DateCell extends React.Component{
  constructor(props) {
    super(props);
    var d=this.props.cellData.value;
    var date = new Date(d);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      selectedDay: date,
    };
  }
  handleDayChange(day) {
    
    //this.props.onDateUpdate(day,this.props.cellData.id,this.props.cellData.type);
    this.setState({ selectedDay: day });
  }
  render() {
    const { selectedDay } = this.state;
    return (
      
        <DayPickerInput onDayChange={this.handleDayChange} placeholder={`${formatDate(this.state.selectedDay,'YYYY-MM-DD')}`}/>
      
    );
  }
}


class DateInput extends React.Component{
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      selectedDay: undefined,
    };
  }
  handleDayChange(day) {
    this.setState({ selectedDay: day });
    this.props.onUpdate(this.props.nameTag,day);
  }
  render() {
    const { selectedDay } = this.state;
    return (
        <DayPickerInput onDayChange={this.handleDayChange} selectedDay={this.state.selectedDay}/>
    );
  }
}



class SelectableCell extends React.Component
{
  constructor(props) {
    super(props);
    let index;
    for(var i=0;i<this.props.options.length;i++)
    {
      if(this.props.cellData.value==this.props.options[i].label)
      {
        index=i;
        break;
      }
    }
    this.state={
      index:index,
      option:this.props.cellData.value,

    };

  }

  render()
  {
    return (
    <td>
        <Dropdown options={this.props.options} selectedOption={this.state.option} onUpdate={this.props.onUpdate} nameTag={this.props.cellData.nameTag}/>
    </td>
    );
  }
}


class Dropdown extends React.Component
{
  constructor(props)
  {
      super(props);
      this.state = {
      selectedOption: this.props.selectedOption,
      options:this.props.options,
      nameTag:this.props.nameTag
      }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onUpdate(this.state.nameTag,selectedOption);
  }

  render() 
  {
    return (
      <Select name="form-field-name" placeholder={this.state.selectedOption} value={this.state.selectedOption} onChange={this.handleChange} options={this.props.options}/>
      );
  }

}

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
