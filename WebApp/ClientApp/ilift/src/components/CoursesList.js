import React, { Component } from 'react';
import Rodal from 'rodal';
import {SingletonService} from "../services/SingletonService";
import 'rodal/lib/rodal.css';
import '../template/css/bootstrap.css';
import '../template/css/custom-style.css';
import {NotificationManager} from "react-notifications";

export class CoursesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.filterText = "";

        this.state.courses = [];
        this.state.visible= false;
        this.state.currentCourse={id:0,name:'',description:''};

        this.state.isAddButtonClicked = false;
        this.update();

    }

    update(){

        SingletonService.CourseService.get_all_courses().then((result) => {
            if(result === null)
            {

                return;
            }
            var list = [];
            for (var course = 0; course < result.length; course++){
                var newCourse = {id: result[course].id, name : result[course].courseName, description: result[course].description, photo: result[course].image};
                list.push(newCourse);
            }

            this.setState({isAddButtonClicked: false});
            this.setState({courses: list} );
            console.log(this.state.courses);
        });

    }

    show(course) {
        this.setState({ visible: true , currentCourse:course});
    }

    hide() {
        this.setState({ visible: false });
    }

    handleUserInput(filterText) {
        this.setState({filterText: filterText});
    };

    handleRowDel(course) {
        this.show(course);
    };


    deleteAccepted(){

        SingletonService.CourseService.delete_course(this.state.currentCourse.id).then((result) => {
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
                    <div className="rodalbody"><h4>This action is irreversible. <br/>Are you sure you want to delete course {this.state.currentCourse.name}? </h4>
                    </div>
                    <div style={{marginLeft:150, marginTop:70}}>
                    <button className="btn btn-danger" onClick={this.deleteAccepted.bind(this)}>DELTE</button> <t>   </t>
                    <button className="btn " onClick={this.hide.bind(this)}>CANCEL</button>
                    </div>
                </Rodal>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} onButtonPressed={this.reRender.bind(this)}/>
                <CourseTable update={this.update.bind(this)} isButtonPressed={this.state.isAddButtonClicked} onRowDel={this.handleRowDel.bind(this)} courses={this.state.courses} filterText={this.state.filterText}/>
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
                    <button className="btn btn-default" onClick={this.props.onButtonPressed}>Add course</button>

                    </div>
            </div>

        );
    }

}

class CourseTable extends React.Component {


    constructor(){
        super();

    }

    renderRowAdd()
    {
        if (this.props.isButtonPressed) {
            return (
                <div>
                    <div>
                        <br/>
                        <input className="form-control" style={{width: 400}} type="text" name="courseName" id="courseName" placeholder="Name" />
                        <p style={{display: 'inline'}}> </p>
                        <br/>
                        <textarea className="form-control" style={{width: 400}}  name="description" id="description" cols="25"   placeholder="Description"/>
                        <p style={{display: 'inline'}}> </p>
                        <br/>
                        <div className="file-input-wrapper ">
                        <button className="btn btn-default">image</button>
                        <input type="file"  name="photo" id="photo" style={{}} placeholder="Photo" onChange={(e) => this.photo = e.target.files[0]} />
                        </div>
                            <p style={{display: 'inline'}}> </p>
                        <br/>
                        <button type="submit" className="btn btn-success" style={{}} name="addCourse_submit" value="Add course" onClick={() => this.addCourse()}>Save</button>

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
            height: 250,

            display:'relative'
        };

        var course = this.props.courses.map(function(course) {
            if (course.name.indexOf(filterText) === -1) {
                return;
            }
            return (<CourseRow update={update} course={course} onDelEvent={rowDel.bind(this)} key={course.id}/>)
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
                        {course}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );

    }

    addCourse() {
        let courseName = document.getElementById("courseName").value;
        let description = document.getElementById("description").value;
        console.log(courseName);
        console.log(description);

        SingletonService.CourseService.add_new_course(this.photo, courseName, description).then((result) => {

                console.log(result);
                NotificationManager.success("Add successful!", "Success");
                this.props.update();

        });
    }


}

class CourseRow extends React.Component {
    constructor(props){
        super(props);
        this.state= {nameCourse : this.props.course.name,
            description: this.props.course.description,
            photoForShow: this.props.course.photo,
            photoForUpdate: this.props.course.photo}

    }
    onDelEvent() {
        this.props.onDelEvent(this.props.course);
    }

    render() {

        var bodystyle = {
            width: 50, height: 50,
            display: "inline",
            align:'center',
            marginTop:50
        };


        return (
            <tr className="eachRow">
                <td className="del-cell">
                    <input  type="text" className="form-control"  placeholder="Course Name" defaultValue={this.props.course.name} onChange={(e) =>  this.setState({nameCourse : e.target.value})}/>
                </td>
                <td className="del-cell" >
                    <textarea className="form-control" defaultValue={this.props.course.description} onChange={(e) => this.setState({description : e.target.value})} rows={6}/>
                </td>
                <td className="del-cell" >
                    <img src={ this.state.photoForShow } style={bodystyle} id="imgStyle"/>

                    <div className="file-input-wrapper" style={{display: "inline"}}>
                        <button className="btn btn-default btn-sm" style={{display: "inline", marginLeft: 20}}>Upload IMAGE</button>
                    <input type="file"   name="photo" id="photo" placeholder="Photo" defaultValue={this.props.course.photo}
                           onChange={(e) => {var fileName = 'require(\'' + e.target.value + '\')'; this.setState({photoForUpdate : e.target.files[0]})}} />
                    </div>
                </td>

                <td className="del-cell" >
                    <input type="button"style={{marginTop:60}} onClick={this.updateRow.bind(this)} value="Save" className="btn btn-success btn-sm"/><t> </t>
                    <input type="button" style={{marginTop:60}}  onClick={this.onDelEvent.bind(this)} value="X" className="btn btn-danger btn-sm"/>

                </td>
            </tr>
        );

    }


    updateRow(){

        SingletonService.CourseService.edit_course(this.props.course.id, this.state.photoForUpdate,this.state.nameCourse, this.state.description).then((result) => {
            if (result != null) {
                console.log(result);
                this.props.update();
                SingletonService.CourseService.get_course(this.props.course.id).then((result) => {
                    if (result != null) {

                        console.log( result.image);
                        NotificationManager.success("Update successful!", "Success");
                        this.setState({photoForShow: result.image});
                    }
                });
            }
        });


    }

}