# Create React App & Props

**Objectives:**

* Describe Webpack
* Install Create React App
* Make an application using Create React App

## Webpack

A module bundler for modern JavaScript applications. It's a build tool

* Combines different JS files into a `bundle.js`.
* Has a plugin system to run tools such as babel.
* Also bundles other assets like css, images, etc.

## Create React App Uses Webpack

Priorities:

1. Learn React
2. Learn to configure Webpack

For this part we will use c9.io again. Use the existing project with the todos app, and inside we will make a folder for React separate from everything else.

In our terminal under `workspace` run `mkdir react`, cd into it, run `npm install -g create-react-app`. Go into the folder and run `create-react-app helloworld`.

Follow the suggestion from creating the app and cd into the directory and run `npm start`.

## Create React App: Files

The `public` folder contains files that don't go through the webpack build process. The `index.html` file inside is the base of our website that gets delivered to the client.

In `src/index.js` we see this:

``` javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

The `ReactDOM.render` line should look familiar. We are setting the element with an id of root to the root of our application. That element is in the `index.html` file we just mentioned.

We also see that we are giving it a component called `App`. Where does that component live? It can be found in `src/App.js`.

You'll notice some different syntax.

``` javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```

You'll see some `import` lines that may seem confusing. You'll notice the class is extended by `Component` rather than `React.Component`, which is due to the way we are importing. Let's Change the `h1.App-title` to say "Hello World" so we can see a change.

## JavaScript Import Statement

**Objectives:**

* Import a component from another file.
* Export a component from a file.
* Use export default vs non-default export.

Let's start by looking at `src/App.js` in our project:

``` javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
```

In the first line, `React` is the default export from the file. Component is exported from that file, but not be default.

The last line of our `src/App.js` file is this:

``` javascript
export default App;
```

We are exporting `App` by default. We are importing it in `src/index.js` here:

``` javascript
import App from './App';
```

It's important to notice `App` doesn't have the curly braces around it. That's because it was exported from `App.js` by default. The name when something is exported by default isn't important. it could be `import Pizza from './App';`.

Let's change our export statement so that it no longer is default:

``` javascript
export { App };
```

We should now get the error `export 'default' (imported as 'App') was not found in './App'`. To fix this we have to put the import statement in curly braces as well. It doesn't work because we are trying to import it as a default when we aren't exporting it as one.

``` javascript
import { App } from './App';
```

However, when it comes to renaming, we need to do it differently when it isn't default.

``` javascript
import { App as Pizza } from './App';
```

We have to use the name we export it as first, then use `as` to give it an alias.

Let's bring our Pet component code from earlier into our new react-app project. In the `src` directory, let's add a `Pet.js` file for our component.

``` javascript
class Pet extends React.Component {
    render() {
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
```

The first thing we want to do with this new file is import React.

``` javascript
import React, { Component } from 'react';
```

Notice there is no relative path for 'react'. Anything in your node_modules folder doesn't require a relative path. Now that we import Component directly, we can remove the `React.` portion of the class extension.

``` javascript
class Pet extends Component {
```

Finally export the Pet component. There's two ways of doing this:

1. Inline with the class declaration
2. At the bottom of the file

``` javascript
import React, { Component } from 'react';
// First way
export default class Pet extends Component {
    render() {
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
```

``` javascript
import React, { Component } from 'react';
// Second way
class Pet extends Component {
    render() {
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

export default Pet;
```

Now that is ready, and we can go to `src/index.js` and import our Pet component.

``` javascript
// Before
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

``` javascript
// After
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Pet from './Pet';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Pet />, document.getElementById('root'));
registerServiceWorker();
```

The code will fail to compile because we haven't created our HobbyList component yet. For now let's just remove it from the Pet component. The component now works, but we lost our styling. Let's next bring that over as well. Typically we call the css file for our component by the same name as our component, so in this case we will create `src/Pet.css`. 

It is important that all of the CSS in the `Pet.css` file *only* applies to that component. That will be true for all of the css except for the `#app` selector. There is no more `#app` and it doesn't apply to our component specifically, so it will be relocated to `src/index.css` where it belongs. Then `#app` will be changed to `#root` to properly select the element our project is hooking into.

The next step is to import the CSS into our component. It's not a javascript file and it's not inside of node_modules so we must give it it's relative path and it's file extension.

``` javascript
import React, { Component } from 'react';
import './Pet.css';

class Pet extends Component {
    render() {
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

export default Pet;
```