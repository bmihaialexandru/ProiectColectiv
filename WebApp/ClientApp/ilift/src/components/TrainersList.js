import React, { Component } from 'react';
import Rodal from 'rodal';
import {SingletonService} from "../services/SingletonService";
import 'rodal/lib/rodal.css';
import '../template/css/style.css';
import '../template/css/custom-style.css';
import {NotificationManager} from "react-notifications";

export class TrainersList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.filterText = "";

    this.state.trainers = [];
    this.state.visible= false;
    this.state.currentTrainer={id:0,name:'',category:''};
      this.state.isAddButtonClicked = false;
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

          this.setState({isAddButtonClicked: false});
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
          else{
              NotificationManager.success("Delete successful!", "Success");
          }
          this.hide();
          this.update();

      });

  }

    reRender(){

        this.setState({isAddButtonClicked: true}, function () {
            this.render();
        });

    }

  render() {

    return (
      <div>

                 <Rodal visible={this.state.visible}
                       onClose={this.hide.bind(this)}
                       animation={this.state.animation}>

                     <div><p> </p></div>
                     <div className="rodalbody" style={{display: 'center'}}>
                         <h4>This action is irreversible. <br/>Are you sure you want to delete trainer {this.state.currentTrainer.name} ? </h4>
                    </div>
                     <div style={{marginLeft:150, marginTop:70}}>
                    <button className="btn btn-danger" onClick={this.deleteAccepted.bind(this)}>delete</button> <t>   </t>
                    <button className="btn " onClick={this.hide.bind(this)}>cancel</button>
                     </div>
                </Rodal>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} onButtonPressed={this.reRender.bind(this)}/>
                <TrainerTable  update={this.update.bind(this)} isButtonPressed={this.state.isAddButtonClicked} onRowDel={this.handleRowDel.bind(this)} trainers={this.state.trainers} filterText={this.state.filterText}/>
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
        <div className="row">

            <div className="col-xs-8" id="container" >
                <input type="text" className="form-control" style={{width: 350}} placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="col-xs-2" id="container" >
                <button className="btn btn-default" style={{marginLeft:10}} onClick={this.props.onButtonPressed}>Add trainer</button>

            </div>
        </div>

    );
  }

}

class TrainerTable extends React.Component {

    renderRowAdd()
    {
        if (this.props.isButtonPressed) {
            return (
                <div>
                    <div>
                        <br />
                        <input className="form-control"   type="text" placeholder="Trainer Name" id="nameT"/>
                        <p style={{display: 'inline'}}> </p>
                        <br/>
                        <textarea className="form-control" placeholder="Trainer Description" cols="25"  id="description"/>
                        <p style={{display: 'inline'}}> </p>
                        <br/>
                        <div className="file-input-wrapper"  style={{display: "inline"}}>
                            <label class="custom-file-upload">
                                <input type="file"  name="photo" style={{width: 200}} id="photo" placeholder="Photo" onChange={(e) => this.photo = e.target.files[0]} />
                                <i class="fa fa-cloud-upload"/> Upload Image
                            </label>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-success" name="add_submit" value="Add trainer" onClick={() => this.addTrainer()}>SAVE</button>

                    </div>
                    <br/>
                </div>
            );
        }
    }
  render() {
    var rowDel = this.props.onRowDel;
    var update = this.props.update;
    var filterText = this.props.filterText;
    var bodystyle = {
        height: 200,
        display:'relative'
    };

    var trainer = this.props.trainers.map(function(trainer) {
      if (trainer.name.indexOf(filterText) === -1) {
        return;
      }
      return (<TrainerRow update={update} trainer={trainer} onDelEvent={rowDel.bind(this)} key={trainer.id}/>)
    });

    return (
        <div className="row">
            <div className="col-xs-4" id="container" >
                {this.renderRowAdd()}

            </div>

            <div className="row">

                <div className="col-xs-10" id="container" ref="container" >
                    <br />
                    <table className="table ">
                        <thead>
                        <tr>
                        </tr>
                        </thead>

                        <tbody style={bodystyle}>
                        {trainer}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
  }

    addTrainer() {
        let name = document.getElementById("nameT").value;
        let description = document.getElementById("description").value;
        console.log(name);

        SingletonService.TrainerService.add_new_trainer(this.photo, name, description).then((result) => {
            NotificationManager.success("Add successful!", "Success");
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
              <input className="form-control" type="text" placeholder="Trainer Name" defaultValue={this.props.trainer.name} onChange={(e) =>  this.setState({nameTrainer : e.target.value})}  id="name"/>
          </td>
          <td className="del-cell">
              <textarea className="form-control"  defaultValue={this.props.trainer.category} onChange={(e) => this.setState({description : e.target.value})} rows={6}/>
          </td>
          <td className="del-cell">
              <img src={ this.state.photoForShow } style={{width: 100, height: 140, marginLeft:20}} id="imgStyle"/>
          </td>
          <td>
              <div className="file-input-wrapper"  style={{display: "inline"}}>
                  <label class="custom-file-upload">

                      <input type="file" name="photo" id="photo" placeholder="Photo" defaultValue={this.props.trainer.photo}
                             onChange={(e) => {var fileName = 'require(\'' + e.target.value + '\')'; this.setState({photoForUpdate : e.target.files[0]})}} />

                      <i class="fa fa-cloud-upload"/> Upload Image
                  </label>
              </div>
          </td>

        <td className="del-cell">
            <input type="button" style={{marginTop:50}} onClick={this.updateRow.bind(this)} value="Save" className="btn btn-success btn-sm"/><t> </t>
            <input  type="button" style={{marginTop:50}} onClick={this.onDelEvent.bind(this)} value="X" className="btn btn-danger btn-sm"/>

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
                      NotificationManager.success("Update successful!", "Success");
                      this.setState({photoForShow: result.imageUrl});
                  }
              });
          }
      });


  }

}
