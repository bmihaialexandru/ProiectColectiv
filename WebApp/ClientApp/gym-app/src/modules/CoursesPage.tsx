import * as React from 'react';
import { SpinnerBasic } from "../components/Spinner";
import './Page.css';

export class CoursesPage extends React.Component {
 render() {
   return (
     <div className='page-content'>
       <h2>Courses</h2>
       <div className = "content">
        <SpinnerBasic/>
       </div>
     </div>
   );
 }
}