# State

Everything we have done with React so far can be done with HTML and CSS, possibly making you wonder why we are learning React. Now with state we will learn how react handles changing data.

**Objectives:**

* Define state in react.
* Create a component with a constructor and state.
* Describe what happens when setState is called.

**Stateful Data** - Data in our application that can change.

This is different from props in that we can never change props.

## State Example

``` javascript
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {favColor: 'red'};
    }

    render() {
        return (
            <div>
                My Favorite Color:
                {this.state.favColor}
            </div>
        )
    }
}
```

For every component you create with a constructor, you want to pass it `props` and run `super(props)`. Remember from the ES2015 part of the course that `super()` runs the contents of the parent class's function by the same name in your function where it's being called. This is boilerplate whenever your component has a constructor function.

After that we are defining state in the constructor. We use state to define data that we care about that we might want to change.

## setState

The correct way to change state in your application.

Simplest Usage: `setState` accepts an object with new properties and values for `this.state`.

``` javascript
this.setState({   });
```

**NEVER** modify the state property directly. To make changes to state you must use the `setState` method.

An example of changing state:

``` javascript
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {favColor: 'red'};

        setTimeout(this.setState({favColor: 'blue'}), 3000);
    }

    render() {
        return (
            <div>
                My Favorite Color:
                {this.state.favColor}
            </div>
        );
    }
}
```

When `setState` is used, it invokes the `render` method at the end. That means if the component is using the state and it's changed, it is rerendered and displays the change. So after 3 seconds, when `this.state.favColor` is changed to blue, it will be reflected in the application in the view where it is rendered.

## Pure Functions

**Objectives:**

* Define a pure function

A **pure function** is a function without side-effects. It does not modify its inputs. It's repeatable--same inputs get the same outputs.

Not a pure function:

``` javascript
function doubleVals(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i] * 2;
    }
    return arr;
}
```

This violates the rule by modifying its input. If we ran this function multiple times, the array would keep changing to different values each time. The first element in the array might be 1, then 2, then 4, etc.

Pure function:

``` javascript
function doubleVars(arr) {
    return arr.map(n => n * 2);
}
```

Not pure:

``` javascript
let person = {id: 53, name: "Tim"};
function addJob(job) {
    person.job = job;
}
addJob('Instructor');
```

In this case we are modifying the global state. This is a classic example of having a side-effect (modifying a global variable).

Pure:

``` javascript
var person = {id: 53, name: "Tim"};
function addJob(personObj, job) {
    return Object.assign({}, personObj, {job});
}
addJob(person, 'Instructor');
```

This doesn't have side-effects because we are assigning a new object by joining a copy of the person object with an object created out of the job.

We can also write it using object spread.

``` javascript
var person = {id: 53, name: "Tim"};
function addJob(personObj, job) {
    return {...personObj, job};
}
addJob(person, 'Instructor');
```

Also notice we are using shorthand notation for job. The key is job and the variable is job for the value so instead of `job: job` we can use shorthand `job`.

### What does this have to do with React?

All changes to `this.state` should be pure. `this.state` should never be modified, always use `this.setState()` and give it a *new* object.

## State Exercise

Go to directory 1 for an exercise on modifying state purely.

One thing to be *extremely careful* about when updating state in the exercise, is when we make a copy of an object(or array), the inner arrays/objects are not copies too. We have to make a copy for each level we go down if there are objects/arrays inside, otherwise we will be modifying state directly, which we cannot do.

The solution we learn can actually be improved to be less complicated:

``` javascript
setTimeout(() => {
    randInst = Math.floor(Math.random() * this.state.instructors.length);
    randHobby = Math.floor(Math.random() * this.state.instructors[randInst].length);

    const instructors = this.state.instructors.map((inst, i) => {
        if (i === randInst) {
            const hobbies = [...inst.hobbies].splice(randHobby, 1);
            return {
                ...inst,
                hobbies
            }
        }

        return randInst;
    });

    this.setState({instructors});
}, 5000);
```

What's happening above is we are now using `map` to go through the instructors, as map makes a copy of an array. Then we go through each instructor, and if that instructor's index matches the one we want to change, we make a copy of it's hobbies and return a new instructor with its properties and a spliced version of hobbies to overwrite the old one. Otherwise, we return the instructor in its original form.

## React Component Architecture

