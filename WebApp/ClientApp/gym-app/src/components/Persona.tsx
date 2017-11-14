import * as React from 'react';
import {
  Persona
} from 'office-ui-fabric-react/lib/Persona';

export class PersonaInitials extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Persona
          primaryText='Carausu Catrinel'
          secondaryText= 'Scrum master'
        />
      </div>
    );
  }
}