import React, { Component } from 'react';
import './App.css';

class InstructorItem extends Component {
    static propTypes = {
        name: PropTypes.string,
        hobbies: PropTypes.arrayOf(PropTypes.string)
    }
    render() {
        return (
            <li>
                <h3>{this.props.name}</h3>
                <h4>
                Hobbies: {this.props.hobbies.join(", ")}
                </h4>
            </li>
        );
    }
}

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