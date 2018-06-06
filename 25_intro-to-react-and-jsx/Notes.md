# Intro to React and JSX

**Objectives:**

* Define front-end framworks
* Describe React at a high level

## Front-end Frameworks

* JavaScript libraries that handle DOM manipulation
* Handles navigations (HTML5 push state)
* State management

The front-end is client side, and the back-end is server side. Client side we are using React obviously, and on the server side we are using Node.js.

The framework is in control of the DOM.

## React

* Released by Facebook in 2013.
* A view library that uses componsable components. Mostly concerned with displaying stuff on the screen.
* Other libraries are commonly used with React
    * React Router
    * Redux

### Composable Components

For example, a message component that is parameterized to be reusable. So it'll have a user's username, message, date posted, etc. And it can be reused for all messages.

They are composable when all the different components are working together. So a message card, and a message list that contains the message cards, then a nav, and finally the app that contains them all.

### First Component

**Objectives:**

* Create a react component
* Use ReactDOM to render the component.

Here is our starter code:

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Component 1</title>
    <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/react-dom-factories@1.0.0/index.js"></script>
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript">
    </script>
</body>
</html>
```

The first thing we will need is a class.

``` html
<div id="app"></div>
<script type="text/javascript">
    class Pet extends React.Component {}
</script>
```

All components will need a render method. The goal of render is to return some HTML that we want to put in the DOM. We will do that by using a factory provided by `react-dom-factories` which can be seen in the head of the file.

The first argument in the factories function is for attributes, the second is what's inside the element.

``` javascript
class Pet extends React.Component {
    render() {
        const h2 = ReactDOMFactories.h2(null, "Moxie");
    }
}
```

Next we will create an image. This time we want to provide attributes, so we will use the first parameter.

``` javascript
class Pet extends React.Component {
    render() {
        const h2 = ReactDOMFactories.h2(null, "Moxie");
        const img = ReactDOMFactories.img({
            src: "https://github.com/tigarcia/Moxie/raw/master/moxie.png",
            alt: "Moxie the cat"
        });
    }
}
```

Now we have our elements, but we want to put it on the screen. With React, you can never return multiple elements next to each other, they all have to be inside one DOM element.

Here we return a div and put the `h2` and `img` inside of it.

``` javascript
class Pet extends React.Component {
    render() {
        const h2 = ReactDOMFactories.h2(null, "Moxie");
        const img = ReactDOMFactories.img({
            src: "https://github.com/tigarcia/Moxie/raw/master/moxie.png",
            alt: "Moxie the cat"
        });

        return ReactDOMFactories.div(null, h2, img);
    }
}
```

If we try to run this, nothing will be there. That's because we created the component, but haven't rendered it to the DOM yet. We have to tell it where to hook our components into the DOM.

``` javascript
class Pet extends React.Component {
    render() {
        const h2 = ReactDOMFactories.h2(null, "Moxie");
        const img = ReactDOMFactories.img({
            src: "https://github.com/tigarcia/Moxie/raw/master/moxie.png",
            alt: "Moxie the cat"
        });

        return ReactDOMFactories.div(null, h2, img);
    }
}

// This first thing we provide is the element we want to render. This 
// creates an HTML element out of the Pet component. The second
// argument is where we want to put it. We have a div with the id of
// "app" for where we will hook it in.
ReactDOM.render(React.createElement(Pet), document.getElementById("app"));
```

This is not how we will typically write react, but this is just an example of React at its lowest level. No extra tools or fancy things going on.

## JSX

**Objectives:**

* Define babel, a transpiler
* Use JSX in our react component


### Babel

Transpiler: converts from one source code version to another.

In React we use Babel to convert JSX to Vanilla JS. With JSX we no longer have to write the verbose `ReactDOMFactories` code.

### Refactoring

Let's use JSX to refactor the last example. Here is our starting code:

``` html
<head>
    <meta charset="UTF-8">
    <title>Component 1</title>
    <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/react-dom-factories@1.0.0/index.js"></script>
</head>
<body>
    <div id="app"></div>
    <script type="text/javascript">
        class Pet extends React.Component {
            render() {
                const h2 = ReactDOMFactories.h2(null, "Moxie");
                const img = ReactDOMFactories.img({
                    src: "https://github.com/tigarcia/Moxie/raw/master/moxie.png",
                    alt: "Moxie the cat"
                });

                return ReactDOMFactories.div(null, h2, img);
            }
        }

        ReactDOM.render(React.createElement(Pet), document.getElementById("app"));
    </script>
</body>
```

First we must incorporate Babel. We can replace the react-dom-factories script with babel.

Then we change the script tag in the body from `type="text/javascript"` to `type="text/babel"`.

``` html
<head>
    <meta charset="UTF-8">
    <title>Component 1</title>
    <script src="https://unpkg.com/react@16.0.0/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16.0.0/umd/react-dom.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
</head>
<body>
    <div id="app"></div>
    <script type="text/babel">
        class Pet extends React.Component {
            render() {
                const h2 = ReactDOMFactories.h2(null, "Moxie");
                const img = ReactDOMFactories.img({
                    src: "https://github.com/tigarcia/Moxie/raw/master/moxie.png",
                    alt: "Moxie the cat"
                });

                return ReactDOMFactories.div(null, h2, img);
            }
        }

        ReactDOM.render(React.createElement(Pet), document.getElementById("app"));
    </script>
</body>
```

Now we can start using JSX.

``` javascript
class Pet extends React.Component {
    render() {
        return (
            <div>
                <h2>Moxie</h2>
                <img src="https://github.com/tigarcia/Moxie/raw/master/moxie.png" alt="Moxie the cat" />
            </div>
        )

        // const h2 = ReactDOMFactories.h2(null, "Moxie");
        // const img = ReactDOMFactories.img({
        //     src: "https://github.com/tigarcia/Moxie/raw/master/moxie.png",
        //     alt: "Moxie the cat"
        // });

        // return ReactDOMFactories.div(null, h2, img);
    }
}

ReactDOM.render(React.createElement(Pet), document.getElementById("app"));
```

We can get rid of the commented code, and refactor the last render line.

``` javascript
class Pet extends React.Component {
    render() {
        return (
            <div>
                <h2>Moxie</h2>
                <img src="https://github.com/tigarcia/Moxie/raw/master/moxie.png" alt="Moxie the cat" />
            </div>
        )
    }
}

ReactDOM.render(<Pet />, document.getElementById("app"));
```

### JSX with JavaScript

**Objectives:**

* Write JavaScript inside JSX
* Use a style attribute in JSX
* Add a className attribute

``` javascript
class Pet extends React.Component {
    render() {
        return (
            <div>
                <h2>Moxie</h2>
                <img src="https://github.com/tigarcia/Moxie/raw/master/moxie.png" alt="Moxie the cat" />
            </div>
        )
    }
}

ReactDOM.render(<Pet />, document.getElementById("app"));
```

Let's start by making our component look a little nicer. First we are adding a css file to the header of the page (not shown).

A problem using JSX is that babel when compiling doesn't know the difference between a regular javascript class, and an html attribute class. So in order to give our div a class name, we use the attribute `className` to get around this, which will compile it to the correct `class` attribute name.

``` javascript
class Pet extends React.Component {
    render() {
        return (
            <div className="card">
                <h2 className="name">Moxie</h2>
                <img src="https://github.com/tigarcia/Moxie/raw/master/moxie.png" alt="Moxie the cat" />
            </div>
        )
    }
}

ReactDOM.render(<Pet />, document.getElementById("app"));
```

We added a couple classNames, now let's add some new content to the card as well as inline styling. Keep in mind that inline styles in React isn't actually such a bad thing because of the way it is all bundled together.

``` javascript
class Pet extends React.Component {
    render() {
        const liStyle = {fontSize: '1.5em'};

        return (
            <div className="card">
                <h2 className="name">Moxie</h2>
                <img src="https://github.com/tigarcia/Moxie/raw/master/moxie.png" alt="Moxie the cat" />
                <h5 style={{fontSize: '2em', margin: '2px'}}>Hobbies:</h5>
                <ul>
                    <li style={liStyle}>Sleep</li>
                    <li style={liStyle}>Eat</li>
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<Pet />, document.getElementById("app"));
```

When we include curly braces in JSX it means "I want to evaluate JavaScript here". In the style attribute it accepts an object, and to evaluate that object we put it inside curly braces again.

## Multiple Components

**Objectives:**

* Render an array of JSX.
* Use a React component inside of another component.

This will use our first-component with the cat once again.

``` javascript
class Pet extends React.Component {
    render() {
        const liStyle = {fontSize: '1.5em'};

        return (
            <div className="card">
                <h2 className="name">Moxie</h2>
                <img src="https://github.com/tigarcia/Moxie/raw/master/moxie.png" alt="Moxie the cat" />
                <h5 style={{fontSize: '2em', margin: '2px'}}>Hobbies:</h5>
                <ul>
                    <li style={liStyle}>Sleep</li>
                    <li style={liStyle}>Eat</li>
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<Pet />, document.getElementById("app"));
```

Let's do another refactor. Maybe we don't want to list out hobbies by hand. One thing we can do is create a javascript array of the hobbies. Then we can use curly braces to loop through.

``` javascript
class Pet extends React.Component {
    render() {
        const liStyle = {fontSize: '1.5em'};
        const hobbies = ["Sleeping", "Eating", "Cuddling"];

        return (
            <div className="card">
                <h2 className="name">Moxie</h2>
                <img src="https://github.com/tigarcia/Moxie/raw/master/moxie.png" alt="Moxie the cat" />
                <h5 style={{fontSize: '2em', margin: '2px'}}>Hobbies:</h5>
                <ul>
                    {hobbies.map(h => {
                        return <li style={liStyle}>{h}</li>
                    })}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<Pet />, document.getElementById("app"));
```

Although this will work, the console will give us an error of `Warning: Each child in an array or iterator should have a unique "key" prop.`. This is because of the function we are using. `.map` returns an array, and any time you return an array in React, each element must have a unique key, which is important for React's rendering.

For now we will use the index, but that isn't the best because if we are adding or removing elements, the index can change and sometimes overlap.

``` javascript
class Pet extends React.Component {
    render() {
        const liStyle = {fontSize: '1.5em'};
        const hobbies = ["Sleeping", "Eating", "Cuddling"];

        return (
            <div className="card">
                <h2 className="name">Moxie</h2>
                <img src="https://github.com/tigarcia/Moxie/raw/master/moxie.png" alt="Moxie the cat" />
                <h5 style={{fontSize: '2em', margin: '2px'}}>Hobbies:</h5>
                <ul>
                    {hobbies.map((h, i) => {
                        return <li key={i} style={liStyle}>{h}</li>
                    })}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<Pet />, document.getElementById("app"));
```

Next, we will refactor this to use 2 components instead of 1. We will simplify the Pet component and add a new component that the Pet component uses.

Let's start by adding a new component above.

``` javascript
class HobbyList extends React.Component {
    render() {
        const hobbies = ["Sleeping", "Eating", "Cuddling"];

        return (
            <ul>
                {hobbies.map((h, i) => {
                    return <li key={i} style={liStyle}>{h}</li>
                })}
            </ul>
        )
    }
}

class Pet extends React.Component {
    render() {
        const liStyle = {fontSize: '1.5em'};
        
        return (
            <div className="card">
                <h2 className="name">Moxie</h2>
                <img src="https://github.com/tigarcia/Moxie/raw/master/moxie.png" alt="Moxie the cat" />
                <h5 style={{fontSize: '2em', margin: '2px'}}>Hobbies:</h5>
            </div>
        )
    }
}

ReactDOM.render(<Pet />, document.getElementById("app"));
```

So now we have our 2 separate components, but right now Pet doesn't render the HobbyList component.

We do that by simple using the HobbyList component in the Pet component's JSX.

``` javascript
class HobbyList extends React.Component {
    render() {
        const hobbies = ["Sleeping", "Eating", "Cuddling"];

        return (
            <ul>
                {hobbies.map((h, i) => {
                    return <li key={i} style={liStyle}>{h}</li>
                })}
            </ul>
        )
    }
}

class Pet extends React.Component {
    render() {
        const liStyle = {fontSize: '1.5em'};
        
        return (
            <div className="card">
                <h2 className="name">Moxie</h2>
                <img src="https://github.com/tigarcia/Moxie/raw/master/moxie.png" alt="Moxie the cat" />
                <h5 style={{fontSize: '2em', margin: '2px'}}>Hobbies:</h5>
                <HobbyList />
            </div>
        )
    }
}

ReactDOM.render(<Pet />, document.getElementById("app"));
```