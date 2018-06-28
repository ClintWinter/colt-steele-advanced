import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [
        {
          name: 'Tim',
          hobbies: ['sailing', 'react']
        }, {
          name: 'Matt',
          hobbies: ['math', 'd3']
        }, {
          name: 'Colt',
          hobbies: ['css', 'hiking']
        }, {
          name: 'Elie',
          hobbies: ['music', 'es2015']
        }
      ]
    };

    setTimeout(() => {
        randInst = Math.floor(Math.random() * this.state.instructors.length);
        randHobby = Math.floor(Math.random() * this.state.instructors[randInst].length);

        const instructors = [...this.state.instructors];
        instructors[randInst] = Object.assign({}, instructors[randInst]);
        instructors[randInst].hobbies = [...instructor[randInst].hobbies];

        instructors[randInst].hobbies.splice(randHobby, 1);

        this.setState({instructors});
    }, 5000);
  }
  render() {
    const instructors = this.state.instructors.map((instructor, index) => (
      <li key={index}>
        <h3>{instructor.name}</h3>
        <h4>Hobbies: {instructor.hobbies.join(", ")}</h4>
      </li>
    ));
    return (
      <div className="App">
        <ul>
          {instructors}
        </ul>
      </div>
    );
  }
}

export default App;