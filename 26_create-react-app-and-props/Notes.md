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