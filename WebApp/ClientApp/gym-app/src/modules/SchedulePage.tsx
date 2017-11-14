import * as React from 'react';
import { SpinnerBasic } from "../components/Spinner";
import './Page.css';

export class SchedulePage extends React.Component {
 render() {
   return (
     <div className='page-content'>
       <h2>Schedule</h2>
       <div className = "content">
        <SpinnerBasic/>
       </div>
     </div>
   );
 }
}