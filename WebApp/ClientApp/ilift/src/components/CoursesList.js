import React, { Component } from 'react';
import Rodal from 'rodal';
import {SingletonService} from "../services/SingletonService";
import 'rodal/lib/rodal.css';
import '../template/css/bootstrap.css';

import '../template/css/inputBox.css';


export class CoursesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.filterText = "";

        this.state.courses = [];
        this.state.visible= false;
        this.state.currentCourse={id:0,name:'',description:''};

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
                    <div className="rodalheader">Delete course</div>
                    <div className="rodalbody"><h4>Are you sure you want to delete course {this.state.currentCourse.name} ? </h4>
                    </div>
                    <button className="btn " onClick={this.deleteAccepted.bind(this)}>ok</button> <t>   </t>
                    <button className="btn " onClick={this.hide.bind(this)}>close</button>
                </Rodal>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
                <CourseTable update={this.update.bind(this)} onRowDel={this.handleRowDel.bind(this)} courses={this.state.courses} filterText={this.state.filterText}/>
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

class CourseTable extends React.Component {

    render() {

        var rowDel = this.props.onRowDel;
        var update = this.props.update;
        var filterText = this.props.filterText;
        var bodystyle = {
            height: 250,
            overflow: 'scroll',
            display:'block'
        };

        var course = this.props.courses.map(function(course) {
            if (course.name.indexOf(filterText) === -1) {
                return;
            }
            return (<CourseRow update={update} course={course} onDelEvent={rowDel.bind(this)} key={course.id}/>)
        });
        return (
            <div className="row">
                <div className="row"></div>
                <div className="col-xs-10" id="container" ref="container" >
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                        </tr>
                        </thead>

                        <tbody style={bodystyle}>
                        {course}
                        </tbody>
                    </table>
                </div>
                <div className="col-xs-1">
                </div>
                <div className="col-xs-4" id="container" >
                    <div className="form-group">
                        <h3>Add a new course </h3>
                    </div>

                    <input type="text" name="courseName" id="courseName" placeholder="Name" />
                    <textarea  name="description" id="description" cols="25"   placeholder="Description"/>

                    <input type="file"  name="photo" id="photo"  placeholder="Photo" onChange={(e) => this.photo = e.target.files[0]} />

                    <input type="submit"  name="addCourse_submit" value="Add course" onClick={() => this.addCourse()} />

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

        return (
            <tr className="eachRow">
                <td className="del-cell">
                    <input  type="text" placeholder="Course Name" defaultValue={this.props.course.name} onChange={(e) =>  this.setState({nameCourse : e.target.value})}/>
                </td>
                <td className="del-cell">
                    <textarea defaultValue={this.props.course.description} onChange={(e) => this.setState({description : e.target.value})} rows={6}/>
                </td>
                <td className="del-cell">
                    <img src={ this.state.photoForShow } style={{width: 50, height: 50,display: "inline", paddingTop: 30, paddingLeft:30}} id="imgStyle"/>
                    <input type="file" style={{display: "inline", paddingLeft: 20}}  name="photo" id="photo" placeholder="Photo" defaultValue={this.props.course.photo}
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

        SingletonService.CourseService.edit_course(this.props.course.id, this.state.photoForUpdate,this.state.nameCourse, this.state.description).then((result) => {
            if (result != null) {
                console.log(result);
                this.props.update();
                SingletonService.CourseService.get_course(this.props.course.id).then((result) => {
                    if (result != null) {

                        console.log( result.image);
                        this.setState({photoForShow: result.image});
                    }
                });
            }
        });


    }

}