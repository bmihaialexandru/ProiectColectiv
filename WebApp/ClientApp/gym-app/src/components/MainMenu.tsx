import * as React from 'react';
import {NavLink} from "react-router-dom";
import './MainMenu.css';
import { LoginPanel } from './Panel';

export class MainMenu extends React.Component {
  render() {
    return (
        <div className="App-header">
            <div className="Navigation">
              <li style={{float: 'left'}}>Logo</li>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/trainers">Trainers</NavLink></li>
              <li><NavLink to="/courses">Courses</NavLink></li>
              <li><NavLink to="/schedule">Schedule</NavLink></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
              <li style={{float: 'right', padding: "0 150px 0 0"}}><LoginPanel/></li>
            </div>
        </div>
    );
  }
}