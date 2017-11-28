import React, { Component } from 'react';
import {HeaderAdmin} from '../components/HeaderAdmin';
import {FooterAdmin} from '../components/FooterAdmin';
import TrainersList from '../components/TrainersList';



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

const MyList = ({
  virtual,
  itemHeight,
}) => (
  <ul className="media-list list-group" style={virtual.style}>
    {virtual.items.map((item) => (
      <li key={`item${item.id}`} className="list-group-item" style={{height: itemHeight }}>
        <div className="media-left">
          <img className="media-object" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEzLjQ2ODc1IiB5PSIzMiIgc3R5bGU9ImZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMHB0O2RvbWluYW50LWJhc2VsaW5lOmNlbnRyYWwiPjY0eDY0PC90ZXh0PjwvZz48L3N2Zz4=" />
        </div>

        <div className="media-body">
          <h4 className="media-heading">{item.name} : <h5>{item.position}</h5></h4>
        </div>
         <div className="media-right">
        <button>Delete</button>
        </div>
      </li>
    ))}
  </ul>
);

const MyConfigurableList = TrainersList(MyList,trainers);


export class TrainersPageAdmin extends Component {
  componentWillReceiveProps(nextProps){
    window.location.reload();
  }
  render() {
      return (
        <div id="fh5co-wrapper">
        <div id="fh5co-page">

        <HeaderAdmin/>

        <div className="fh5co-parallax back-4" data-stellar-background-ratio="0.5">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center fh5co-table">
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
            <div className="col-md-12 col-md-offset-0 animate-box">
              <MyConfigurableList/>
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