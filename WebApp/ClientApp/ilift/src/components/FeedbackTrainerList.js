import React, { Component } from 'react';
import Rodal from 'rodal';
import {SingletonService} from "../services/SingletonService";
import 'rodal/lib/rodal.css';
import '../template/css/inputBox.css';
import '../template/css/style.css';


export class FeedbackTrainersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.filterText = "";

        this.state.feedbacks = [];
        this.state.visible= false;
        this.state.currentFeedback={id:0,stars:'',message:'',userName:'',trainerName:''};

        this.update();

    }

    update(){


        SingletonService.FeedbackTrainerService. get_actualy_all_feedbacks().then((result) => {
            if(result === null)
            {

                return;
            }
            let list = [];
            let cName = '';
            for (let feedback = 0; feedback < result.length; feedback++){

                SingletonService.TrainerService.get_trainer(result[feedback].course_id).then((res) =>{
                    console.log(res);
                    cName = res.name;

                    let newFeedback = {
                        id: result[feedback].id, stars: result[feedback].stars, message: result[feedback].message,
                        userName: result[feedback].author, trainerName: cName
                    };
                    list.push(newFeedback);
                    var sortedList = list;
                    sortedList.sort((a,b) => b.id - a.id);
                    this.state.feedbacks = sortedList;
                    console.log(sortedList);
                    this.setState(this.state.feedbacks);
                });
            }



        });

    }

    show(feedback) {
        this.setState({ visible: true , currentFeedback:feedback});
    }

    hide() {
        this.setState({ visible: false });
    }

    handleUserInput(filterText) {
        this.setState({filterText: filterText});
    };

    handleRowDel(feedback) {
        this.show(feedback);
    };


    deleteAccepted(){

        SingletonService.FeedbackTrainerService.delete_feedback(this.state.currentFeedback.id).then((result) => {
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
                    <div className="rodalheader">Delete feedback</div>
                    <div className="rodalbody"><h4>Are you sure you want to delete this feedback? </h4>
                    </div>
                    <button className="btn " onClick={this.deleteAccepted.bind(this)}>ok</button> <t>   </t>
                    <button className="btn " onClick={this.hide.bind(this)}>close</button>
                </Rodal>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
                <FeedbackTable  update={this.update.bind(this)} onRowDel={this.handleRowDel.bind(this)} feedbacks={this.state.feedbacks} filterText={this.state.filterText}/>
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

                <input type="text" placeholder="Search with trainer name" value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>

            </div>

        );
    }

}

class FeedbackTable extends React.Component {

    render() {
        var rowDel = this.props.onRowDel;
        var update = this.props.update;
        var filterText = this.props.filterText;
        var bodystyle = {
            height: 250,
            overflow: 'scroll',
            display:'block'
        };

        var feedback = this.props.feedbacks.map(function(feedback) {
            if (feedback.trainerName.indexOf(filterText) === -1) {
                return;
            }
            return (<FeedbackRow update={update} feedback={feedback} onDelEvent={rowDel.bind(this)} key={feedback.id}/>)
        });
        return (
            <div className="row">
                <div className="row"></div>
                <div className="col-xs-12" id="container" ref="container" >
                    <table className="table table-bordered">
                        <thead>

                        </thead>

                        <tbody style={bodystyle}>
                        <tr>
                            <td>Trainer</td>
                            <td>Author</td>
                            <td>Stars</td>
                            <td>Message</td>

                        </tr>
                        {feedback}

                        </tbody>
                    </table>
                </div>

            </div>
        );

    }

}

class FeedbackRow extends React.Component {
    constructor(props){
        super(props);

    }
    onDelEvent() {
        this.props.onDelEvent(this.props.feedback);
    }



    render() {

        return (


            <tr className="eachRow">
                <td className="del-cell">
                    <label> {this.props.feedback.trainerName} </label>
                </td>
                <td className="del-cell">
                    <label> {this.props.feedback.userName} </label>
                </td>
                <td className="del-cell">
                    <label> {this.props.feedback.stars} </label>
                </td>
                <td className="del-cell">
                    <label> {this.props.feedback.message} </label>
                </td>
                <td className="del-cell">
                    <input type="button" style={{alignSelf:'center'}} onClick={this.onDelEvent.bind(this)} value="X" className="btn btn-danger btn-xs"/>
                </td>
            </tr>

        );

    }

}
