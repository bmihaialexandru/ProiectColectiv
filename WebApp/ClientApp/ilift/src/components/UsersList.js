import React, { Component } from 'react';
import Rodal from 'rodal';
import {SingletonService} from "../services/SingletonService";
import 'rodal/lib/rodal.css';
import '../template/css/bootstrap.css';


export class UsersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.filterText = "";

        this.state.users = [];
        this.state.visible= false;
        this.state.currentUser={id:0,name:'',phone:'',email:''};

        this.state.isAddButtonClicked = false;

        this.update();

    }

    update(){

        SingletonService.UserService.get_all_users().then((result) => {
            if(result === null)
            {

                return;
            }
            var list = [];
            for (var user = 0; user < result.length; user++){
                var newUser = {id: result[user].id, name : result[user].name, phone: result[user].phone_number, email: result[user].email};
                list.push(newUser);
            }

            this.setState({isAddButtonClicked: false});
            this.setState({users: list} );
            console.log(this.state.users);
        });

    }

    show(user) {
        this.setState({ visible: true , currentUser:user});
    }

    hide() {
        this.setState({ visible: false });
    }

    handleUserInput(filterText) {
        this.setState({filterText: filterText});
    };

    handleRowDel(user) {
        this.show(user);
    };


    deleteAccepted(){

        SingletonService.UserService.delete_user(this.state.currentUser.id).then((result) => {
            if(result == null) {
                alert("Something went wrong.");
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
                    <div className="rodalheader">Delete user</div>
                    <div className="rodalbody"><h4>Are you sure you want to delete  {this.state.currentUser.name} ? </h4>
                    </div>
                    <button className="btn " onClick={this.deleteAccepted.bind(this)}>ok</button> <t>   </t>
                    <button className="btn " onClick={this.hide.bind(this)}>close</button>
                </Rodal>

                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} onButtonPressed={this.reRender.bind(this)}/>
                <br />
                <UserTable update={this.update.bind(this)} isButtonPressed={this.state.isAddButtonClicked} onRowDel={this.handleRowDel.bind(this)} users={this.state.users} filterText={this.state.filterText}/>
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

                    <div className="col-xs-9" id="container" >
                    <input type="text" style={{display: 'inline', width:300, height:42}} className="form-control"  placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="col-xs-1" id="container" >
                    <button className="btn btn-default" onClick={this.props.onButtonPressed}>Add user</button>
                    </div>

            </div>

        );
    }

}

class UserTable extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            isButtonPressed: this.props.isButtonPressed
        }

    }

    renderRowAdd()
    {
        if (this.props.isButtonPressed) {
            return (
                <div>
                    <div>

                        <input style={{display: 'inline', width: 200, height: 42}} className="form-control"
                               type="text" name="username" id="username" placeholder="Name"/>
                        <p style={{display: 'inline'}}> </p>
                        <input style={{display: 'inline', width: 200, height: 42}} className="form-control"
                               type="text" name="phone" id="phone" placeholder="Phone"/>
                        <p style={{display: 'inline'}}> </p>
                        <input style={{display: 'inline', width: 200, height: 42}} className="form-control"
                               type="text" name="email" id="email" placeholder="E-mail"/>
                        <p style={{display: 'inline'}}> </p>
                        <input style={{display: 'inline', width: 200, height: 42}} className="form-control"
                               type="password" name="password" id="password" placeholder="Password"/>
                        <p style={{display: 'inline'}}> </p>
                        <button style={{display: 'inline'}} type="submit" className="btn btn-success"
                                name="signup_submit" value="Sign up" onClick={() => this.register()}>Sign up
                        </button>
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
            height: 500,
            display:'block'
        };

        var user = this.props.users.map(function(user) {
            if (user.name.indexOf(filterText) === -1) {
                return;
            }
            return (<UserRow update={update} user={user} onDelEvent={rowDel.bind(this)} key={user.id}/>)
        });



        return (
            <div className="row">
                <div className="col-xs-12" id="container" >
                    {this.renderRowAdd()}

                </div>


                    <div className="col-xs-12" id="container" ref="container" >
                        <br />
                        <table className="table ">
                            <thead>
                            <tr>
                            </tr>
                            </thead>

                            <tbody style={bodystyle}>
                            <tr>
                                <td style={{paddingLeft:10}}>User name</td>
                                <td style={{paddingLeft:10}}>Phone</td>
                                <td style={{paddingLeft:10}}>Email</td>
                                <td style={{paddingLeft:10}}>Password</td>
                                <td> </td>

                            </tr>
                            {user}
                            </tbody>
                        </table>
                    </div>
            </div>
        );

    }

    register() {
        let username = document.getElementById("username").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let token = localStorage.getItem("token");

        console.log(username);

        SingletonService.UserService.register(token, username, password, phone, email).then((result) => {
            console.log(result);
            if(result != null) {
                alert("Register successful!");
                this.props.update();

            }
        });
    }


}

class UserRow extends React.Component {
    constructor(props){
        super(props);
        this.state= {name : this.props.user.name,
            phone: this.props.user.phone,
            email: this.props.user.email,
            password: '',
            disabled: true,
            changePass: false
            }

    }
    onDelEvent() {
        this.props.onDelEvent(this.props.user);
    }

    handleCheck(){
        this.setState( {disabled: !this.state.disabled} )
        this.setState({changePass: !this.state.changePass})
    }

    render() {



        return (

        <tr className="eachRow">
                <td className="del-cell">
                    <input  type="text" className="form-control"  placeholder="UserName" defaultValue={this.props.user.name} onChange={(e) =>  this.setState({name : e.target.value})}/>
                </td>
                <td className="del-cell">
                    <input  type="text" className="form-control"  placeholder="Phone" defaultValue={this.props.user.phone} onChange={(e) =>  this.setState({phone : e.target.value})}/>
                </td>
                <td className="del-cell">
                    <input  type="text" className="form-control"  placeholder="Email" defaultValue={this.props.user.email} onChange={(e) =>  this.setState({email : e.target.value})}/>
                </td>
                <td className="del-cell">
                    <input  type="text" className="form-control" placeholder="Password"  disabled = {(this.state.disabled)? "disabled" : ""} defaultValue='' onChange={(e) =>  this.setState({password : e.target.value})}/>
                    <input type="checkbox" onChange={this.handleCheck.bind(this)}/>

                        <label >  Change password!</label>

                </td>

                <td className="del-cell" style={{align:'center', paddingTop:15}}>
                    <input type="button" style={{alignSelf:'center'}} onClick={this.onDelEvent.bind(this)} value="X" className="btn btn-danger btn-sm"/><t> </t>
                    <input type="button" onClick={this.updateRow.bind(this)} value="Save" className="btn btn-success btn-sm"/>
                </td>
            </tr>
        );

    }


    updateRow(){

        let pass = this.state.password;
        if (this.state.changePass === false) {
            pass = '';
        }

        if (this.state.changePass === true && this.state.password === '') {
            alert("Password can not be empty!");
        }
        else {
            SingletonService.UserService.edit_user(this.props.user.id, this.state.name, this.state.phone, this.state.email, pass).then((result) => {
                if (result != null) {
                    console.log(result);
                    this.props.update();
                    alert("User changed.")
                }
            });
        }


    }

}