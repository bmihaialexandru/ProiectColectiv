import React, { Component } from 'react';
import Rodal from 'rodal';
import {SingletonService} from "../services/SingletonService";
import 'rodal/lib/rodal.css';
import '../template/css/style.css';
import {NotificationManager} from "react-notifications";


export class PaymentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.filterText = "";

        this.state.payments = [];
        this.state.visible= false;
        this.state.currentPayment={id:0,userName: "", packageName: "", user_id: 0, package_id: 0, pricing:0};

        this.update();

    }

    update(){

        SingletonService.UserService.get_all_users().then((result) => {
            if (result === null) {

                return;
            }
            var allPayments = [];

            for (let user = 0; user < result.length; user++) {
                SingletonService.PackageService.get_unpaid_packages_for_user(result[user].id).then((result2) => {
                    if (result === null) {

                        return;
                    }
                    for (let payment = 0; payment < result2.length; payment++) {
                        var newPayment = {id: result2[payment].id, userName: result[user].name,packageName: result2[payment].package_name,
                            pricing:result2[payment].pricing, user_id: result2[payment].id_user, package_id: result2[payment].id_package};
                        allPayments.push(newPayment);
                    }

                    this.setState({payments: allPayments} );
                });
            }


        });

    }

    show(payment) {
        console.log("Pay " + payment);
        this.setState({ visible: true , currentPayment:payment});
    }

    hide() {
        this.setState({ visible: false });
    }

    handleUserInput(filterText) {
        this.setState({filterText: filterText});
    };

    handleRowDel(payment) {
        this.show(payment);
    };


    deleteAccepted(){

        console.log(this.state.currentPayment);
        SingletonService.PackageService.make_payment(this.state.currentPayment.user_id,this.state.currentPayment.package_id,this.state.currentPayment.id).then((result) => {
            if(result == null) {
                NotificationManager.error("Something went wrong.", "Error");
            }
            else{
                NotificationManager.success("Payment successful!", "Success");
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
                        >
                    <div><p> </p></div>
                    <div className="rodalbody" style={{display: 'center'}}>
                        <h4>{this.state.currentPayment.userName} paid for package {this.state.currentPayment.packageName}.</h4>
                    </div>
                    <button className="btn btn-success" onClick={this.deleteAccepted.bind(this)}>ok</button> <t>   </t>
                    <button className="btn " onClick={this.hide.bind(this)}>cancel</button>
                </Rodal>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)}/>
                <PaymentTable  update={this.update.bind(this)} onRowDel={this.handleRowDel.bind(this)} payments={this.state.payments} filterText={this.state.filterText}/>
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

                <input type="text" placeholder="Search with user name"  style={{width: 250}}  className="form-control"  value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
                <br />
            </div>

        );
    }

}

class PaymentTable extends React.Component {

    render() {
        var rowDel = this.props.onRowDel;
        var update = this.props.update;
        var filterText = this.props.filterText;
        var bodystyle = {
            height: 250,
            overflow: 'auto',
            display:'block'
        };

        var payment = this.props.payments.map(function(payment) {
            if (payment.userName.indexOf(filterText) === -1) {
                return;
            }
            return (<PaymentRow update={update} payment={payment} onDelEvent={rowDel.bind(this)} key={payment.id}/>)
        });
        return (
            <div className="row">
                <div className="col-xs-12" id="container" ref="container" >
                    <table className="table table">
                        <thead>

                        </thead>

                        <tbody style={bodystyle}>
                        <tr>
                            <td style={{textAlign:'center', opacity:.7}}>User name</td>
                            <td style={{textAlign:'center', opacity:.7}}>Package name</td>
                            <td style={{textAlign:'center', opacity:.7}}>Price</td>
                            <td></td>

                        </tr>
                        {payment}

                        </tbody>
                    </table>
                </div>

            </div>
        );

    }

}

class PaymentRow extends React.Component {
    constructor(props){
        super(props);

    }
    onDelEvent() {
        this.props.onDelEvent(this.props.payment);
    }



    render() {

        return (

            <tr className="eachRow">
                <td style={{textAlign:'center'}}>
                    <p style={{display:'inline'}}> </p>
                    {this.props.payment.userName}
                    <p style={{display:'inline'}}> </p>
                </td>
                <td style={{textAlign:'center'}}>
                    <p style={{display:'inline'}}> </p>
                    {this.props.payment.packageName}
                    <p style={{display:'inline'}}> </p>
                </td>
                <td style={{textAlign:'center'}}>
                    <p style={{display:'inline'}}> </p>
                    {this.props.payment.pricing}
                    <p style={{display:'inline'}}> </p>
                </td>
                <td className="del-cell">
                    <p style={{display:'inline'}}> </p>
                    <p style={{display:'inline'}}> </p>
                    <input type="button" style={{alignSelf:'center'}} onClick={this.onDelEvent.bind(this)} value="Accept payment" className="btn btn-success btn-xs"/>
                    <p style={{display:'inline'}}> </p>
                </td>
            </tr>

        );

    }

}
