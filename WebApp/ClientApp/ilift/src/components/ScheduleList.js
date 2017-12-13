import React, { Component } from 'react';
import Rodal from 'rodal';
import Select from 'react-select';
import TimePicker from 'react-times';
import TimeInput from 'react-time-input';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {formatDate} from 'react-day-picker/moment';
import 'rodal/lib/rodal.css';
import 'react-day-picker/lib/style.css';
import 'react-select/dist/react-select.css';
import 'react-times/css/classic/default.css';



export class ScheduleList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.type=[{value:'weekly',label:'weekly'},{value:'monthly',label:'monthly'},{value:'bi-monthly',label:'bi-monthly'}];
    this.state.courses=[{value:1,label:'TRX'},{value:2,label:'Zumba'},{value:3,label:'Boxing'}];
    this.state.trainers=[{value:1,label:'Sabina Alexa'},{value:2,label:'Denisa Bica'}];
    this.state.rooms=[{value:1,label:'room Balance'},{value:2,label:'red room'},{value:3,label:'bathroom'}];
    this.state.schedules=[{id:1,dateStart:'2018-01-01',dateEnd:'2018-01-23',hourStart:'17:00',hourEnd:'18:00',course:'Zumba',trainer:'Denisa Bica',room:'red room',type:'weekly'},{id:100,dateStart:'2018-02-10',dateEnd:'2018-02-10',hourStart:'12:00',hourEnd:'13:00',course:'TRX',trainer:'Sabina Alexa',room:'room Balance',type:'monthly'}]
    this.state.visible= false;
    this.state.currentSchedule={id:100,day:'10-12-2018',hourStart:'12:00',hourFinish:'13:00',course:'TRX',trainer:'Sabina Alexa',room:4};
    }

    show(schedule) {
        this.setState({ visible: true , currentSchedule:schedule});
    }

    hide() {
        this.setState({ visible: false });
    }

    handleRowDel(trainer) {
      this.show(trainer);
    };

    onOkClick()
      {
        this.hide();
      }

    handleAddEvent(evt) {

    }

    handleScheduleTable(evt) {

    }

    handleStartDateUpdate(day,id,name)
    {
        console.log(name);
        var schedule;
        for(var i=0;i<this.state.schedules.length;i++)
        {
          if(this.state.schedules[i].id ==id)
          {
            console.log(this.state.schedules[i]);
            var d = day.getDate();
            var month = day.getMonth()+1;
            var year = day.getFullYear();
            var finalDate=year.toString()+'-'+month.toString()+'-'+d.toString();
            this.state.schedules[i][name]=finalDate;
            console.log(finalDate);
            this.setState(this.state.schedules);
          }
        }
        console.log(this.state.schedules);
    }

  render() {
    return (
      <div>
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
              <DateInput/>
            </div>
            <div className="col-xs-1">To date :</div>
            <div className="col-xs-2">
             <DateInput/>
            </div>

            <div className="col-xs-3">
              <TimePick/>
            </div>   
            <div className="col-xs-3">
              <TimePick/>
            </div> 
          </div>
          <div className="row"></div>
          <div className="row">
            <div className="col-xs-1">Trainer</div>
            <div className="col-xs-2"><Dropdown options={this.state.trainers} selectedOption={''}/></div>
            <div className="col-xs-1">Course</div>
            <div className="col-xs-2"><Dropdown options={this.state.courses} selectedOption={''}/></div>
          </div>
          <div>
            <div className="row">
              <div className="col-xs-1">Room </div>
              <div className="col-xs-2"><Dropdown options={this.state.rooms} selectedOption={''}/></div>
              <div className="col-xs-1">Type </div>
              <div className="col-xs-2"><Dropdown options={this.state.type} selectedOption={this.state.type[0].label}/></div>
            </div>
          </div>
        </div>
        <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} animation={this.state.animation}>
          <div className="rodalheader">Delete schedule ?</div>
          <div className="rodalbody"><h4>Are you sure you want to delete schedule :</h4>
            <h4>{this.state.currentSchedule.course} ? </h4>
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
      return (<ScheduleRow types={types} courses={courses} rooms={rooms} trainers={trainers} onBeginDateUpdate={onBeginDateUpdate} onScheduleTableUpdate={onScheduleTableUpdate} schedule={schedule} onDelEvent={onRowDel} key={schedule.id} />)
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
                  <td>Day Interval for the course</td>
                  <td>Start time - end time</td>
                  <td>Scheduled Room</td>
                  <td>Type of course</td>
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
        <SelectableCell options={this.props.courses} cellData={{value: this.props.schedule.course,id: this.props.schedule.id}} />
        <SelectableCell options={this.props.trainers} cellData={{value: this.props.schedule.trainer,id: this.props.schedule.id}}/>
        <td>
          <div>Start from day </div>
          <DateCell onDateUpdate={this.props.onDateUpdate}  cellData={{value: this.props.schedule.dateStart,id: this.props.schedule.id}}/>
          <div> until day </div>
          <DateCell onDateUpdate={this.props.onDateUpdate}  cellData={{value: this.props.schedule.dateEnd,id: this.props.schedule.id}}/>
        </td>
        <td>
          <TimeCell onTrainerTableUpdate={this.props.onTrainerTableUpdate} cellData={{value: this.props.schedule.hourStart,id: this.props.schedule.id}}/>
          <div> - </div>
          <TimeCell onTrainerTableUpdate={this.props.onTrainerTableUpdate} cellData={{value: this.props.schedule.hourEnd,id: this.props.schedule.id}}/>
        </td>
        <SelectableCell options={this.props.rooms} cellData={{value: this.props.schedule.room,id: this.props.schedule.id}}/>
        <SelectableCell options={this.props.types} cellData={{value: this.props.schedule.type,id: this.props.schedule.id}}/>
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
    
    console.log(val);
    
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
  }
  render() {
    const { selectedDay } = this.state;
    return (
      <td>
        <DayPickerInput onDayChange={this.handleDayChange} selectedDay={this.state.selectedDay}/>
      </td>
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
    };
  }

  render()
  {
    return (
    <td>
        <Dropdown options={this.props.options} selectedOption={this.props.options[this.state.index]} clearable={false}/>
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
      }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() 
  {
    return (
      <Select name="form-field-name" value={this.state.selectedOption} onChange={this.handleChange} options={this.state.options}/>
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
