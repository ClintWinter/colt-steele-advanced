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
        // get the random values for instructor and hobby
        randInst = Math.floor(Math.random() * this.state.instructors.length);
        randHobby = Math.floor(Math.random() * this.state.instructors[randInst].length);

        // make a copy of instructors
        const instructors = [...this.state.instructors];
        // make a copy of the instructor in instructors
        instructors[randInst] = Object.assign({}, instructors[randInst]);
        // make a copy of the hobbies array in the instructor
        instructors[randInst].hobbies = [...instructor[randInst].hobbies];

        // splice out the random hobby
        instructors[randInst].hobbies.splice(randHobby, 1);

        // update state with new instructors
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