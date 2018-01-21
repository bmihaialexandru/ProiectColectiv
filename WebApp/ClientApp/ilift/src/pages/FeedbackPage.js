import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Footer} from '../components/Footer';
import {Classes} from '../components/Classes';
import StarRatingComponent from 'react-star-rating-component';
import {_reloadJs} from '../js/reloadJs';
import {Redirect} from 'react-router-dom';
import {FeedbackCard} from '../components/FeedbackCard';
import {SingletonService} from "../services/SingletonService";
import {NotificationManager} from "react-notifications";
import $ from 'jquery';

export class FeedbackPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            rating: null,
            list : []
        };

        const e_id = this.props.location.state.id;
        if(this.props.location.state.entityType.localeCompare("course") === 0)
        {
            SingletonService.FeedbackCourseService.get_all_feedbacks(e_id).then((result) => {
                this.setState({list: result});
            })
        }
        else if(this.props.location.state.entityType.localeCompare("trainer") === 0)
        {
            SingletonService.FeedbackTrainerService.get_all_feedbacks(e_id).then((result) => {
                this.setState({list: result});
            })
        }
    }

  componentWillMount(){
    $('html,body').scrollTop(0);
  }

  render() {
      _reloadJs();
      
      if(!this.props.location.state){
          return <Redirect to="/"/>
      }

      const text = this.state.list.length === 0 ? "No previous feedback" : "Previous feedback:";

    const description = this.props.location.state.entityDescription ? 
      <div>
      <div className="col-md-11 col-md-offset-2 animate-box" style={{fontSize: "24px"}}>Course description:</div>
      <div className="row text-center animate-box">
        {this.props.location.state.entityDescription}
      </div>
      </div>
      : null;


    return (
      <div id="fh5co-wrapper">
      <div id="fh5co-page">
      
      <Header/>
      
      <div className="fh5co-parallax back-4" data-stellar-background-ratio="0.5">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
              <div className="fh5co-intro fh5co-table-cell animate-box">
                <h1 className="text-center">Give feedback for {this.props.location.state.entityType} {this.props.location.state.entityName}</h1>
                <p>Tell us your opinion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{backgroundColor: "#fcfcfc"}}>
      <br/>
      
      { !localStorage.username && <div style={{marginTop: 100}}/>}
      {description}
      <br/>
      <div className="col-md-11 col-md-offset-2 animate-box" style={{fontSize: "24px"}}>{text}</div>
      <div className="row text-center animate-box">
         <div className="col-md-8 col-md-offset-2 schedule-container">
          {this.state.list.map( x => 
							<FeedbackCard 
                            author={x.author}
                            rating={x.stars}
                            description={x.message}
							/>
					)}
        </div>
      </div>

      
      { !localStorage.username && <div style={{marginBottom: 150}}/>}

  { localStorage.username &&
    <div id="fh5co-contact">
		<div className="container">
        <div className="row">
        <div className="col-md-6 animate-box">
        <div className="row">
          <div className="col-md-12 col-md-offset-6">
            How good was your experience with {this.props.location.state.entityName} ?
          </div>
          <div className="col-md-6 col-md-offset-6">
            <div>
                <StarRatingComponent 
                    name="rate" 
                    starCount={5}
                    value={this.state.rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
          </div>
            <div className="col-md-12 col-md-offset-6">
                <div className="form-group">
                    <textarea name="" className="form-control" id="message" cols="30" rows="7" placeholder="Message"></textarea>
                </div>
            </div>
          <div className="col-md-12 col-md-offset-6">
            <div className="form-group">
              <button type="submit" value="Submit" className="btn btn-primary" onClick={() => {
                        this._submitFeedback();
              }}>
               Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
      }
      </div>
      <Footer/>
  
    </div>
    </div>
    );
  }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    _submitFeedback(){
        let message = document.getElementById("message").value;
        let stars = this.state.rating;
        let e_id =  this.props.location.state.id;
        //let router = this.context.router;

        if(this.props.location.state.entityType.localeCompare("course") === 0) {
            SingletonService.FeedbackCourseService.add_new_feedback(stars, message, e_id).then((result) => {
                if (result !== null) {
                    NotificationManager.success("Feedback added succesfully!", "Success");
                    window.location.reload();
                }
            })
        }
        else if(this.props.location.state.entityType.localeCompare("trainer") === 0) {
            SingletonService.FeedbackTrainerService.add_new_feedback(stars, message, e_id).then((result) => {
                if (result !== null) {
                    NotificationManager.success("Feedback added succesfully!", "Success");
                    window.location.reload();
                }
            })
        }

    }
}