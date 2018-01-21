import React, { Component } from 'react';
import {HeaderAdmin} from '../components/HeaderAdmin';
import {FooterAdmin} from '../components/FooterAdmin';
import {TrainersList} from '../components/TrainersList';
import {_reloadJs} from '../js/reloadJs';


const trainers=[
{id:1,name: 'Mihai Alexandru Badila',position:'Body Trainer'},
{id:2,name:'Catrinel Carausu',position:'TRX,Swimming Instructor'},
{id:3,name:'Denisa Bica',position:'Boxing trainer'},
{id:4,name:'Codrin Strambei',position:'HIIT Instructor'},
{id:5,name:'Sabina Alexa',position:'Zumba Instructor'},
{id:6,name:'Bocioc Titus',position:'Crossfit Instructor'},
{id:7,name:'Nicu Bodea',position:'Bodybuilding Trainer'},
{id:8,name:'Cristian Baciu',position:'Yoga Instructor'}
]




export class TrainersPageAdmin extends Component {
  componentWillReceiveProps(nextProps){
    window.location.reload();
  }
  render() {
      _reloadJs();
      return (
        <div id="fh5co-wrapper">
        <div id="fh5co-page">

        <HeaderAdmin/>

        <div className="fh5co-parallax back-4" data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-md-offset-0 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
                <div className="fh5co-intro fh5co-table-cell animate-box">
                  <h1 className="text-center">Manage Trainers </h1>
                  <p> Here you can manage all the trainers </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="fh5co-team-section">
        <div className="container">
          <div className="row about">
            <div className="col-md-12 col-md-offset-0 animate-box" >
              <TrainersList/>
            </div>

          </div>

          

        </div>
      </div>

        <FooterAdmin/>
        </div>
        </div>
      );
  }
}