import React, { Component } from 'react';
import Rodal from 'rodal';
import {SingletonService} from "../services/SingletonService";
import 'rodal/lib/rodal.css';
import '../template/css/bootstrap.css';


import {PackageCourse} from "../model/PackageCourse";
import {NotificationManager} from "react-notifications";


export class PackagesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {packages: []};
        this.state.filterText = "";
        this.state.visible= false;
        this.state.currentPackage={id:0,name:'',description:'', pricing: 0, days: 0, courses: []};
        this.state.isAddButtonClicked = false;
        this.update();

    }

    update(){

        SingletonService.PackageService.get_all_packages().then((result) => {
            if(result === null)
            {

                return;
            }
            let list = [];

            for (var packag = 0; packag < result.length; packag++){
                let newPackage = {id: result[packag].id, name : result[packag].package_name, description: result[packag].description,
                    pricing: result[packag].pricing, days: result[packag].days, courses: result[packag].courses};
                list.push(newPackage);
            }
            this.setState({isAddButtonClicked: false});
            this.setState({packages: list} );
            console.log(this.state.packages);
        });

    }

    show(packag) {
        this.setState({ visible: true , currentPackage:packag});
    }

    hide() {
        this.setState({ visible: false });
    }

    handleUserInput(filterText) {
        this.setState({filterText: filterText});
    };

    handleRowDel(packag) {
        this.show(packag);
    };


    deleteAccepted(){

        SingletonService.PackageService.delete_package(this.state.currentPackage.id).then((result) => {
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
                        <h4>This action is irreversible. <br/> Are you sure you want to delete package {this.state.currentPackage.name}? </h4>

                    <div style={{marginLeft:150, marginTop:70}}>

                    <button style={{marginRight:0}} className="btn btn-danger" onClick={this.deleteAccepted.bind(this)}>delete</button> <t>   </t>
                    <button style={{marginRight:0}} className="btn " onClick={this.hide.bind(this)}>cancel</button>
                    </div>
                    </div>
                </Rodal>

                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}  onButtonPressed={this.reRender.bind(this)}/>
                <PackageTable update={this.update.bind(this)}  isButtonPressed={this.state.isAddButtonClicked}  onRowDel={this.handleRowDel.bind(this)} packages={this.state.packages} filterText={this.state.filterText}/>
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
                    <button className="btn btn-default" style={{marginLeft:30}} onClick={this.props.onButtonPressed}>Add package</button>

                </div>
            </div>

        );
    }

}

class PackageTable extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            courses : [],
            valueSelect: "",
            listToAdd : [{name: '', number: ''}]
        };
        this.getCourses();

    }

    getCourses()
    {
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

            this.setState({courses: list});
            let listToAddNew = [{name: this.state.courses[0].name, number: ''}];
            this.setState({listToAdd: listToAddNew});
            console.log(this.state.courses);
        });
    }

    renderRowAdd()
    {
        if (this.props.isButtonPressed) {
            return (
                <div>
                    <div>
                        <br />
                        <input type="text" className="form-control" name="packagName" id="packagName" placeholder="Name" /><br />
                        <textarea  name="description" className="form-control" id="description" cols="25"   placeholder="Description"/><br />

                        <input type="text" className="form-control"  name="pricing" id="pricing"  placeholder="Pricing" /><br />
                        <input type="text" className="form-control"  name="days" id="days"  placeholder="Days" /><br />

                        {this.state.listToAdd.map((course, idx) => (
                            <div style={{display: 'inline'}}>
                                <select style={{width: 200, display: 'inline'}}  className="form-control" defaultValue={"Course"} onChange={this.handleNameChange(idx)} value={course.name}>
                                    {this.state.courses.map((e, key) => {
                                        return <option key={key} value={e.name}>{e.name}</option>;
                                    })}
                                </select>
                                <p style={{display: 'inline'}}> </p>
                                <input onChange={this.handleNumberChange(idx)} value={course.number} style={{width: 100, display: 'inline'}} className="form-control" type="text"  name="entries" id="entries"  placeholder="Entries"/>
                                <p style={{display: 'inline'}}> </p>
                                <button  style={{display: 'inline-block'}} onClick={this.handleRemoveCourse(idx)} className="btn btn-default btn-sm"> - </button><br />

                            </div>
                        ))}
                        <br />
                        <button type="button" onClick={this.handleAddCourse} className="btn btn-default">Add Course</button>
                        <br />
                        <br />
                        <button type="submit" className=" btn btn-primary"  name="addPackage_submit" value="Add package" onClick={() => this.addPackage()}> Submit </button>



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



        let packag = this.props.packages.map(function(packag) {
            if (packag.name.indexOf(filterText) === -1) {
                return;
            }
            return (<PackageRow update={update} packag={packag} onDelEvent={rowDel.bind(this)} key={packag.id}/>)
        });



        return (
            <div className="row">
                <div className="col-xs-4" id="container" >
                    {this.renderRowAdd()}

                </div>
            <div className="row">
                <div className="col-xs-10" id="container" ref="container" >
                    <br />
                    <table className="table">
                        <thead>
                        <tr>
                        </tr>
                        </thead>

                        <tbody style={bodystyle}>
                        <tr>
                            <td style={{textAlign:'center', opacity:.7}}>Name</td>
                            <td style={{textAlign:'center', opacity:.7}}>Description</td>
                            <td style={{textAlign:'center', opacity:.7}}>Price</td>
                            <td style={{textAlign:'center', opacity:.7}}>Days</td>
                            <td style={{textAlign:'center', opacity:.7}}>Courses</td>
                            <td> </td>

                        </tr>
                        {packag}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        );

    }

        handleNameChange = (idx) => (evt) => {
            const newCourses = this.state.listToAdd.map((course, sidx) => {
                if (idx !== sidx) return course;
                return { ...course, name: evt.target.value };
            });

            this.setState({ listToAdd: newCourses });
            console.log(this.state.listToAdd);
        };

        handleNumberChange = (idx) => (evt) => {
            const newCourses = this.state.listToAdd.map((course, sidx) => {
                if (idx !== sidx) return course;
                return { ...course, number: evt.target.value };
            });

            this.setState({ listToAdd: newCourses });
            console.log(this.state.listToAdd);
        };

        handleAddCourse= () => {
            this.setState({ listToAdd: this.state.listToAdd.concat([{ name: this.state.courses[0].name, number: '' }]) });
        };

        handleRemoveCourse = (idx) => () => {
            console.log(idx);
            this.setState({ listToAdd: this.state.listToAdd.filter((s, sidx) => idx !== sidx) });
        };

        addPackage() {
            let courseName = document.getElementById("packagName").value;
            let description = document.getElementById("description").value;
            let pricing = document.getElementById("pricing").value;
            let days = document.getElementById("days").value;
            let courses2 = [];
            for (let i = 0; i < this.state.listToAdd.length; i++){
                for (let j = 0; j < this.state.courses.length; j++){
                    if(this.state.listToAdd[i].name === this.state.courses[j].name){
                        courses2.push({id: this.state.courses[j].id, number: this.state.listToAdd[i].number})
                    }
                }
            }
            this.setState({listToAdd : [{name: this.state.courses[0].name, number: ''}]});

            SingletonService.PackageService.add_new_package(courseName, description, pricing, days, courses2).then((result) => {

                if(result !== null) {
                NotificationManager.success("Add successful!", "Success");
                this.props.update();
                }

            });
    }


}

class PackageRow extends React.Component {
    constructor(props){
        super(props);
        this.state= {namePackage : this.props.packag.name,
            description: this.props.packag.description,
            pricing: this.props.packag.pricing,
            days: this.props.packag.days,
            course: this.props.packag.courses
           }

    }
    onDelEvent() {
        this.props.onDelEvent(this.props.packag);
    }



    render() {

        return (
            <tr className="eachRow">
                <td style={{textAlign:'center'}}>
                    <p style={{display:'inline'}}> </p>
                   {this.state.namePackage}
                    <p style={{display:'inline'}}> </p>
                </td>
                <td style={{textAlign:'center'}}>
                    <p style={{display:'inline'}}> </p>
                     {this.state.description}
                    <p style={{display:'inline'}}> </p>
                </td>
                <td style={{textAlign:'center'}}>
                    <p style={{display:'inline'}}> </p>
                    {this.state.pricing}
                    <p style={{display:'inline'}}> </p>
                </td>
                <td style={{textAlign:'center'}}>
                    <p style={{display:'inline'}}> </p>
                    {this.state.days}
                    <p style={{display:'inline'}}> </p>
                </td>
                <td style={{textAlign:'center'}}>
                    <p style={{display:'inline'}}> </p>
                    <ul> {this.state.course.map((x) => <li style={{textDecorationColor:'#848484', fontSize:16, display:"block"}}>{x.name} : {x.number_subscribtions} classes</li>)} </ul>
                    <p style={{display:'inline'}}> </p>
                </td>
                <td style={{textAlign:'center'}}>
                    <input type="button" style={{alignSelf:'center'}} onClick={this.onDelEvent.bind(this)} value="X" className="btn btn-danger btn-sm"/><t> </t>

                </td>
            </tr>
        );

    }


}