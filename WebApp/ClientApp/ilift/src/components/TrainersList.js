import React, { Component } from 'react';
import Rodal from 'rodal';
import {SingletonService} from "../services/SingletonService";
import 'rodal/lib/rodal.css';//imi anuleaza stilizarile din oarecare motiv ??
import '../template/css/inputBox.css';
import '../template/css/style.css';


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

    this.state.trainers = [];
    this.state.visible= false;
    this.state.currentTrainer={id:0,name:'',category:''};

    this.update();

  }

  update(){
      SingletonService.TrainerService.get_all_trainers().then((result) => {
          if(result === null)
          {

              return;
          }
          var list = [];
          for (var trainer = 0; trainer < result.length; trainer++){
              var newTrainer = {id: result[trainer].id, name : result[trainer].name, category: result[trainer].description, photo: result[trainer].imageUrl};
              list.push(newTrainer);
          }

          this.state.trainers = list;
          console.log(list);
          this.setState(this.state.trainers );

      });

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


  deleteAccepted(){

      SingletonService.TrainerService.delete_trainer(this.state.currentTrainer.id).then((result) => {
          if(result == null) {
              alert("Something went wrong.");
          }
          this.hide();
          this.update();

      });

  }

  render() {

    return (
      <div>

      <Rodal visible={this.state.visible}
                       onClose={this.hide.bind(this)}
                       animation={this.state.animation}>
                    <div className="rodalheader">Delete trainer</div>
                    <div className="rodalbody"><h4>Are you sure you want to delete trainer {this.state.currentTrainer.name} ? </h4>
                    </div>
          <button className="btn " onClick={this.deleteAccepted.bind(this)}>ok</button> <t>   </t>
                    <button className="btn " onClick={this.hide.bind(this)}>close</button>
                </Rodal>
        <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
        <TrainerTable  update={this.update.bind(this)} onRowDel={this.handleRowDel.bind(this)} trainers={this.state.trainers} filterText={this.state.filterText}/>
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
    var rowDel = this.props.onRowDel;
    var update = this.props.update;
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
      return (<TrainerRow update={update} trainer={trainer} onDelEvent={rowDel.bind(this)} key={trainer.id}/>)
    });
    return (
      <div className="row">
      <div className="row"></div>
        <div className="col-xs-12" id="container" ref="container" >
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
        <div className="col-xs-4" id="container" >
          <div className="form-group">
            <h3>Add a new trainer </h3>
          </div>

            <input  type="text" placeholder="Trainer Name" id="nameT"/>
            <input  type="text" placeholder="Trainer Description" id="description"/>
            <input type="file"  name="photo" id="photo" placeholder="Photo" onChange={(e) => this.photo = e.target.files[0]} />

            <input type="submit" name="add_submit" value="Add trainer" onClick={() => this.addTrainer()} />

        </div>
  </div>
    );

  }

    addTrainer() {
        let name = document.getElementById("nameT").value;
        let description = document.getElementById("description").value;
        console.log(name);

        SingletonService.TrainerService.add_new_trainer(this.photo, name, description).then((result) => {
            console.log(result);
            this.props.update();
        });



    }


}

class TrainerRow extends React.Component {
    constructor(props){
        super(props);
        this.state= {nameTrainer : this.props.trainer.name,
                    description: this.props.trainer.category,
                    photoForShow: this.props.trainer.photo,
                    photoForUpdate: this.props.trainer.photo}

    }
  onDelEvent() {
      this.props.onDelEvent(this.props.trainer);
  }



  render() {

    return (
      <tr className="eachRow">
          <td className="del-cell">
              <input  type="text" placeholder="Trainer Name" defaultValue={this.props.trainer.name} onChange={(e) =>  this.setState({nameTrainer : e.target.value})}  id="name"/>
          </td>
          <td className="del-cell">
              <textarea defaultValue={this.props.trainer.category} onChange={(e) => this.setState({description : e.target.value})} rows={6}/>
          </td>
          <td className="del-cell">
              <img src={ this.state.photoForShow } style={{width: 100, height: 150,display: "inline", paddingTop: 10, paddingLeft:10}} id="imgStyle"/>
              <input type="file" style={{display: "inline", paddingLeft: 10}}  name="photo" id="photo" placeholder="Photo" defaultValue={this.props.trainer.photo}
                     onChange={(e) => {var fileName = 'require(\'' + e.target.value + '\')'; this.setState({photoForUpdate : e.target.files[0]})}} />
          </td>

        <td className="del-cell">
            <input type="button" style={{alignSelf:'center'}} onClick={this.onDelEvent.bind(this)} value="X" className="btn btn-danger btn-xs"/><t> </t>
            <input type="button"onClick={this.updateRow.bind(this)} value="Save" className="btn btn-success btn-xs"/>
        </td>
      </tr>
    );

  }


  updateRow(){

      SingletonService.TrainerService.edit_trainer(this.props.trainer.id, this.state.photoForUpdate,this.state.nameTrainer, this.state.description).then((result) => {
          if (result != null) {
              console.log(result);
              this.props.update();
              SingletonService.TrainerService.get_trainer(this.props.trainer.id).then((result) => {
                  if (result != null) {

                      console.log( result.imageUrl);
                      this.setState({photoForShow: result.imageUrl});
                  }
              });
          }
      });


  }

}
