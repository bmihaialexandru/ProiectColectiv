import React, {Component} from 'react';
import {SingletonService} from "../services/SingletonService";
import 'rodal/lib/rodal.css';
import '../template/css/bootstrap.css';
import {NotificationManager} from 'react-notifications';

export class RoomsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {rooms: []};
        this.state.filterText = "";
        this.state.visible = false;
        this.state.room_name = "";
        this.state.max_capacity = 0;
        this.update();

    }

    update() {
        SingletonService.TrainingRoomService.get_all_rooms().then((result) => {
            if (result === null) {
                return;
            }
            let list = [];
            for (let i = 0; i < result.length; i++) {
                let newRoom = {id: result[i].id, name: result[i].name, max_capacity: result[i].max_capacity};
                list.push(newRoom);
            }
            this.setState({isAddButtonClicked: false});
            this.setState({rooms: list});
        });

    }


    handleUserInput(filterText) {
        this.setState({filterText: filterText});
    };

    reRender() {

        this.setState({isAddButtonClicked: true}, function () {
            this.render();
        });

    }

    addRoom() {
        SingletonService.TrainingRoomService.add_training_room(localStorage.getItem("token"), this.state.room_name, this.state.max_capacity).then((result) => {
            if(result!== null) {
                NotificationManager.success("Room was created", "Success");
                this.update();
            }
        });

    }

    handleChange(event) {
        this.setState({room_name: event.target.value});
    }

    handleMaxChange(event) {
        this.setState({max_capacity: event.target.value});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 animate-box">
                        <div className="row">
                            <div className="row">
                                <div className="col-xs-10" id="container" ref="container">
                                    <br/>
                                    <SearchBar filterText={this.state.filterText}
                                               onUserInput={this.handleUserInput.bind(this)}
                                               onButtonPressed={this.reRender.bind(this)}/>
                                    <br/>

                                    <RoomsTable update={this.update.bind(this)} rooms={this.state.rooms}
                                                filterText={this.state.filterText}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-4 animate-box">
                        <div className="row">
                            <div className="row">
                                <div className="col-xs-10" id="container" ref="container">
                                    <br/>
                                    <input type="text" className="form-control" name="packagName"
                                           placeholder="Room Name" onChange={this.handleChange.bind(this)}/><br/>
                                    <input type="number" pattern="[0-9]*"
                                           className="form-control" value={this.state.max_capacity}
                                           onChange={this.handleMaxChange.bind(this)}
                                           name="Capacity" placeholder="Capacity"/><br/>
                                    <button type="button" name="Add Room" onClick={this.addRoom.bind(this)}
                                            className="btn btn-default btn-sm">Add room
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
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
                <div className="col-xs-8" id="container">
                    <input type="text" className="form-control" style={{width: 200}} placeholder="Search..."
                           value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
                </div>
            </div>

        );
    }

}

class RoomsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valueSelect: "",
        };

    }

    render() {
        var update = this.props.update;
        var filterText = this.props.filterText;
        var bodystyle = {
            height: 250,
            display: 'relative'
        };


        let room = this.props.rooms.map(function (room) {
            if (room.name.indexOf(filterText) === -1) {
                return;
            }
            return (<RoomRow update={update} room={room} key={room.id}/>)
        });


        return (
            <table className="table">
                <thead>
                <tr>
                </tr>
                </thead>
                <tbody style={bodystyle}>
                <tr>
                    <td style={{textAlign: 'center', opacity: .7}}>Name</td>
                    <td style={{textAlign: 'center', opacity: .7}}>Maximum Capacity</td>
                </tr>
                {room}
                </tbody>
            </table>
        );

    }
}

class RoomRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr className="eachRow">
                <td style={{textAlign: 'center'}}>
                    <p style={{display: 'inline'}}></p>
                    {this.props.room.name}
                    <p style={{display: 'inline'}}></p>
                </td>
                <td style={{textAlign: 'center'}}>
                    <p style={{display: 'inline'}}></p>
                    {this.props.room.max_capacity}
                    <p style={{display: 'inline'}}></p>
                </td>
            </tr>
        );
    }
}