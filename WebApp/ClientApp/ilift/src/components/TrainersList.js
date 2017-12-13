import React, { Component } from 'react';
import Modal from 'react-modal'; 
import Rodal from 'rodal';
//import 'rodal/lib/rodal.css';//imi anuleaza stilizarile din oarecare motiv ??
//

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


export class TrainersList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.filterText = "";
    const trainers=[
    {id:1,name: 'Mihai Alexandru Badila',category:'Body Trainer'},
    {id:2,name:'Catrinel Carausu',category:'TRX,Swimming Instructor'},
    {id:3,name:'Denisa Bica',category:'Boxing trainer'},
    {id:4,name:'Codrin Strambei',category:'HIIT Instructor'},
    {id:5,name:'Sabina Alexa',category:'Zumba Instructor'},
    {id:6,name:'Bocioc Titus',category:'Crossfit Instructor'},
    {id:7,name:'Nicu Bodea',category:'Bodybuilding Trainer'},
    {id:8,name:'Cristian Baciu',category:'Yoga Instructor'}
    ]
    this.state.trainers = trainers;
    this.state.visible= false;
    this.state.currentTrainer={id:0,name:'',category:''};
  }

   show(trainer) {
        this.setState({ visible: true , currentTrainer:trainer});
    }

    hide() {
        this.setState({ visible: false });
    }

  handleUserInput(filterText) {
    this.setState({filterText: filterText});
  };

  handleRowDel(trainer) {
    this.show(trainer);
  };

  onOkClick()
    {
      //aici facem call la server sa salveze modificarile dupa delete 
      this.hide();
      //var index = this.state.trainers.indexOf(this.state.trainer);
      //this.state.trainers.splice(index, 1);
      //this.setState(this.state.trainers);
      //aici se face delete pe frontend-ii apare userurlui ca s-a sters ceva din lista
    }

  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var t = {
      id: id,
      name: "",
      category: "",
    }
    var items=[];
    items[0]=t;
    for(var i=1;i<=this.state.trainers.length;i++)
    {
        items[i]=this.state.trainers[i-1];
    }
    const state={
      trainers:items,
    }
    this.setState(state);

  }

  handleTrainerTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
  var trainers = this.state.trainers.slice();
  var newTrainers = trainers.map(function(trainer) {

    for (var key in trainer) {
      if (key == item.name && trainer.id == item.id) {
        console.log(item.name);
        trainer[key] = item.value;

      }
    }
    return trainer;
  });
    this.setState({trainers:newTrainers});
  };
  render() {

    return (
      <div>

      <Rodal visible={this.state.visible}
                       onClose={this.hide.bind(this)}
                       animation={this.state.animation}>
                    <div className="rodalheader">Delete trainer</div>
                    <div className="rodalbody"><h4>Are you sure you want to delete trainer :</h4>
                      <h4>{this.state.currentTrainer.name} ? </h4>
                    </div>
                    <button className="rodal-confirm-btn" onClick={this.onOkClick.bind(this)}>ok</button>
                    <button className="rodal-cancel-btn" onClick={this.hide.bind(this)}>close</button>
                </Rodal>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
        <TrainerTable onTrainerTableUpdate={this.handleTrainerTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} trainers={this.state.trainers} filterText={this.state.filterText}/>
      </div>
    );

  }

}
class SearchBar extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }
  render() {
    return (
      <div>

        <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>

      </div>

    );
  }

}

class TrainerTable extends React.Component {

  render() {
    var onTrainerTableUpdate = this.props.onTrainerTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var bodystyle = {
      height: 250,
       overflow: 'scroll',
       display:'block'
    };

    var trainer = this.props.trainers.map(function(trainer) {
      if (trainer.name.indexOf(filterText) === -1) {
        return;
      }
      return (<TrainerRow onTrainerTableUpdate={onTrainerTableUpdate} trainer={trainer} onDelEvent={rowDel.bind(this)} key={trainer.id}/>)
    });
    return (
      <div className="row">
      <div className="row"></div>
        <div className="col-xs-6" id="container" ref="container" >
            <table className="table table-bordered">
              <thead>
                <tr>
                </tr>
              </thead>

              <tbody style={bodystyle}>
                {trainer}
              </tbody>
            </table>
        </div>
        <div className="col-xs-1">
        </div>
        <div className="col-xs-5" id="container" >
          <div className="form-group">
            <h3>Add a new trainer </h3>
          </div>
          <div className="form-group">
            <input  className="form-control" type="text" placeholder="Trainer Name" id="newTrainerName" ref="newTrainerName"  />
          </div>
          <div className="form-group">
            <input  className="form-control" type="text" placeholder="Trainer Description" id="newTrainerPosition" ref="newTrainerPosition" />  
          </div>
          <div className="form-group">
            <button type="button" onClick={this.props.onRowAdd} className="btn btn-success center">Add</button>
          </div>
        </div>
  </div>
    );

  }

}

class TrainerRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.trainer);

  }
  render() {

    return (
      <tr className="eachRow">
        <EditableCell onTrainerTableUpdate={this.props.onTrainerTableUpdate} cellData={{
          "type": "name",
          value: this.props.trainer.name,
          id: this.props.trainer.id
        }}/>
        <EditableCell onTrainerTableUpdate={this.props.onTrainerTableUpdate} cellData={{
          type: "category",
          value: this.props.trainer.category,
          id: this.props.trainer.id
        }}/>
        <td className="del-cell">
          <input type="button" onClick={this.onDelEvent.bind(this)} value="X" className="del-btn"/>
        </td>
      </tr>
    );

  }

}
class EditableCell extends React.Component {

  render() {
    return (
      <td>
        <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onTrainerTableUpdate}/>
      </td>
    );

  }

}