import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Footer} from '../components/Footer';
import {Classes} from '../components/Classes';
import {session} from '../Session/Session';
import StarRatingComponent from 'react-star-rating-component';
import {_reloadJs} from '../js/reloadJs';
import {Redirect} from 'react-router-dom';
import $ from 'jquery';
import {FeedbackCard} from '../components/FeedbackCard';
import {SingletonService} from "../services/SingletonService";

export class FeedbackPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            rating: null,
            list : [
                /*
              {
                author: "Anna Kendrick",
                rating: 4,
                description: "Those abs!"
              },
              {
                author: "Jason Momoa",
                rating: 5,
                description: "Great energy!"
              },
              {
                author: "Bradley Cooper",
                rating: 4,
                description: "Definitely trying that again!"
              },
              {
                author: "Nicole Sherzinger",
                rating: 3,
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non molestie est. Sed mattis sem vitae faucibus vehicula. "
              },
              {
                author: "The Rock",
                rating: 5,
                description: "Great guy, but I can lift more than him!"
              }
              */
            ]
        };
        let e_id = this.props.location.state.id;
        console.log("Entity is: "+ this.props.location.state.entityType);
        if(this.props.location.state.entityType.localeCompare("course") === 0)
        {
            SingletonService.FeedbackCourseService.get_all_feedbacks(e_id).then((result) => {
                this.setState({list: result});
                console.log(result);
            })
        }
    }

  render() {
      //$('html,body').scrollTop(0);
      _reloadJs();
      console.log(this.props.location.entityName);
      if(!this.props.location.state){
          return <Redirect to="/"/>
      }
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
      <br/><br/>
      <div className="col-md-11 col-md-offset-2 animate-box" style={{fontSize: "24px"}}>Previous feedbacks:</div>
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
                    alert("Feedback added succesfully!");
                    window.location.replace("/courses")
                }
            })
        }

    }
}