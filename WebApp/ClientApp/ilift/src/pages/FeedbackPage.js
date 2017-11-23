import React, { Component } from 'react';
import {Header} from '../components/Header';
import {Schedule} from '../components/Schedule';
import {Footer} from '../components/Footer';
import {Classes} from '../components/Classes';
import {session} from '../Session/Session';
import StarRatingComponent from 'react-star-rating-component';
import {_reloadJs} from '../js/reloadJs';
import {Redirect} from 'react-router-dom';


export class FeedbackPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            rating: null
        }
    }

  render() {
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
                    <textarea name="" className="form-control" id="" cols="30" rows="7" placeholder="Message"></textarea>
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
      <Footer/>
  
    </div>
    </div>
    );
  }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    _submitFeedback(){

    }
}