import React, { Component } from 'react';
import Rodal from 'rodal';
import {SingletonService} from "../services/SingletonService";
import 'rodal/lib/rodal.css';
import '../template/css/style.css';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Button from "react-bootstrap/es/Button";


export class FeedbackCourseList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.filterText = "";

        this.state.feedbacks = [];
        this.state.visible= false;
        this.state.currentFeedback={id:0,stars:'',message:'',userName:'',courseName:''};

        this.update();

    }

    update(){


        SingletonService.FeedbackCourseService. get_actualy_all_feedbacks().then((result) => {
            if(result === null)
            {

                return;
            }
            let list = [];
            let cName = '';
            for (let feedback = 0; feedback < result.length; feedback++){

                SingletonService.CourseService.get_course(result[feedback].course_id).then((res) =>{
                    cName = res.courseName;

                        let newFeedback = {
                            id: result[feedback].id, stars: result[feedback].stars, message: result[feedback].message,
                            userName: result[feedback].author, courseName: cName
                        };

                        list.push(newFeedback);
                        var sortedList = list;
                        sortedList.sort((a,b) => b.id - a.id);
                        this.state.feedbacks = sortedList;
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

        SingletonService.FeedbackCourseService.delete_feedback(this.state.currentFeedback.id).then((result) => {
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
                       animation={this.state.animation}
                        style={{zIndex:10000}}>
                    <div><p> </p></div>
                    <div className="rodalbody" style={{display: 'center'}}>
                        <h4>This action is irreversible. <br/>Are you sure you want to delete this feedback? </h4>
                    </div>
                    <div style={{marginLeft:150, marginTop:70}}>
                    <button className="btn btn-danger" onClick={this.deleteAccepted.bind(this)}>delete</button> <t>   </t>
                    <button className="btn " onClick={this.hide.bind(this)}>cancel</button>
                    </div>
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

                <input type="text" placeholder="Search with course name"  style={{width: 250}}  className="form-control"  value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
                <br />
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

            display:'auto'
        };

        var feedback = this.props.feedbacks.map(function(feedback) {
            if (feedback.courseName.indexOf(filterText) === -1) {
                return;
            }
            return (<FeedbackRow update={update} feedback={feedback} onDelEvent={rowDel.bind(this)} key={feedback.id}/>)
        });
        return (
            <div className="row">
                <div className="col-xs-12" id="container" ref="container" >
                    <table className="table ">
                        <thead>

                        </thead>

                        <tbody style={bodystyle}>
                        <tr>
                            <td style={{textAlign:'center', opacity:.7}}>Course</td>
                            <td style={{textAlign:'center', opacity:.7}}>Author</td>
                            <td style={{textAlign:'center', opacity:.7}}>Stars</td>
                            <td style={{textAlign:'center', opacity:.7}}>Message</td>
                            <td> </td>

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
                <td style={{textAlign:'center'}}>
                    {this.props.feedback.courseName}
                </td>
                <td style={{textAlign:'center'}}>
                     {this.props.feedback.userName}
                </td>
                <td style={{textAlign:'center'}}>
                     {this.props.feedback.stars}
                </td>
                <td style={{textAlign:'center'}}>
                    {this.props.feedback.message}
                </td>
                <td className="del-cell">
                    <input type="button"  onClick={this.onDelEvent.bind(this)} value="x" className="btn btn-danger btn-xs"/>
                </td>
            </tr>

        );

    }

}
