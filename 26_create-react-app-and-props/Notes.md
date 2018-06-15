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

As an exercise, implement the HobbyList component on your own.

**Solution:**

Create new file `src/HobbyList.js` and put the component inside. Then import React and Component and do the same as we did with Pet.

``` javascript
import React, { Component } from 'react';

class HobbyList extends Component {
    render() {
        const liStyle = {fontSize: '1.5em'};
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

export default HobbyList;
```

Then import HobbyList in `src/Pet.js` and put it back where we had it before.

``` javascript
import React, { Component } from 'react';
import HobbyList from './HobbyList';
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

## Props

**Objectives:**

* Define props
* Use props inside of a component

**Props** are immutable data passed to your components. Accessible in your component as an object called `this.props`

``` javascript
class ShowText extends Component {
  render() {
    // Inside the render method we have access to
    // this.props ("this" refers to the ShowText instance).
    return <div>{this.props.text}</div>;
  }
}
```

### Passing in Props to a Component

When we render ShowText with JSX, we pass in props as attributes.

``` javascript
<ShowText
  text="This is a prop named text"
/>
```

### Props are Immutable

``` javascript
class ShowText extends Component {
  render() {
    // Never ever change this.props

    this.props.text = "WRONG!!"; // Causes a TypeError

    this.props = {}; // Never do this!!

    this.props.newProp = "Also Wrong"; // Use default props

    return <div>{this.props.text}</div>;
  }
}
```

### Recipe app with props

We will create this in on our own in `Sites/Practice/recipe-app`.

**Objectives:**

* Use props in an application


Start by creating the app `create-react-app recipe-app`. Then cd into the project and do `npm start` to get it running.

In our new project, the first thing we will do is rename `src/App.js` to `src/RecipeApp.js` and `src/App.css` to `src/RecipeApp.css`. Then go ahead and fix the relevant imports in `src/RecipeApp.js` and `src/index.js`. Don't forget to also change the class and export names in `src/RecipeApp.js`.

Next we want a component for a single recipe, so create a new file for one called `src/Recipe.js`. Also give it a CSS file `src/Recipe.css` and import it in the js file.

Now in `RecipeApp` let's remove all of that JSX and give it a `Recipe` component instead.

``` javascript
import React, { Component } from 'react';
// import logo from './logo.svg';
import Recipe from './Recipe';
import './RecipeApp.css';

class RecipeApp extends Component {
  render() {
    return (
      <div className="App">
        <Recipe />
      </div>
    );
  }
}

export default RecipeApp;
```

Next let's build out or `Recipe` component and give it a name, instructions, ingredients, etc. The way we want to pass it that information is in the `RecipeApp` component where we are using the `Recipe` component.

``` javascript
import React, { Component } from 'react';
// import logo from './logo.svg';
import Recipe from './Recipe';
import './RecipeApp.css';

class RecipeApp extends Component {
  render() {
    return (
      <div className="App">
        <Recipe 
            title="Pasta"
        />
      </div>
    );
  }
}

export default RecipeApp;
```

Then in recipe we can use our new prop.

``` javascript
import React, {Component} from 'react';
import './Recipe.css';

class Recipe extends Component {
    render() {
        return (
            <div>{this.props.title}</div>
        );
    }
}

export default Recipe;
```

A common practice is actually to destructure the props object.

``` javascript
import React, {Component} from 'react';
import './Recipe.css';

class Recipe extends Component {
    render() {
        const {title} = this.props;

        return (
            <div>{title}</div>
        );
    }
}

export default Recipe;
```

Next we might want to add a prop for ingredients. In this case we can give it an array.

``` javascript
<Recipe 
    title="Pasta"
    ingredients={['flour', 'water']}
/>
```

Now let's handle our new ingredients in `src/Recipe.js`.

``` javascript
class Recipe extends Component {
    render() {
        const {title} = this.props;
        const ingredients = this.props.ingredients.map((ing, ind) => (
            <li key={ind}>{ing}</li>
        ));

        return (
            <div>
                <div>Recipe {title}</div>
                <ul>
                    {ingredients}
                </ul>
            </div>
        );
    }
}
```

We create an ingredients variable where we map each ingredient to an `li`. We then add a `ul` element and put the array inside it to render it. Remember `render` has to return a single element so we will wrap the `div` and `ul` in another parent `div`.

Let's add the remaining data. We can assume the recipe will have instructions and an image given to it as well.

``` javascript
class Recipe extends Component {
    render() {
        const {title, instructions, img} = this.props;
        const ingredients = this.props.ingredients.map((ing, ind) => (
            <li key={ind}>{ing}</li>
        ));

        return (
            <div>
                <div>Recipe {title}</div>
                <ul>
                    {ingredients}
                </ul>
                <p>{instructions}</p>
                <img src={img} alt={title} />
            </div>
        );
    }
}
```

Now in the `RecipeApp` we can add the new props. In the `public` folder we saved an image that we will use for the `img` prop.

``` javascript
class RecipeApp extends Component {
  render() {
    return (
      <div className="App">
        <Recipe 
          title="Pasta"
          ingredients={['flour', 'water']}
          instructions="Add flour to water and mix"
          img="spaghetti.jpg"
        />
      </div>
    );
  }
}
```

The next step is to style this so it looks reasonable. We can start by rewriting the JSX into a proper layout.

``` javascript
class Recipe extends Component {
    render() {
        const {title, instructions, img} = this.props;
        const ingredients = this.props.ingredients.map((ing, ind) => (
            <li key={ind}>{ing}</li>
        ));

        return (
            <div className="recipe-card">
                <div className="recipe-card-img">
                    <img src={img} alt={title} />
                </div>

                <div className="recipe-card-content">
                    <h2 className="recipe-card-title">{title}</h2>

                    <h3>Ingredients:</h3>
                    <ul>
                        {ingredients}
                    </ul>

                    <h3>Instructions:</h3>
                    <p>{instructions}</p>
                </div>
            </div>
        );
    }
}
```

We then add the CSS to style it in `src/Recipe.css`

``` css
.recipe-card {
    width: 31%;
    min-width: 240px;
    margin: 1%;
    
    box-shadow: 2px 2px 5px #888;
    border-radius: 0 0 3px 3px;
    background: #fff;
}

.recipe-card-img img {
    width: 100%;
    max-height: 250px;
}

.recipe-card .recipe-card-content {
    padding: 20px;
}

.recipe-card-title {
    margin: 0;
}
```

You can also go ahead and delete all the styling in `src/App.css` or `src/RecipeApp.css`. Let's also add the Roboto font to our project. Add the link to `public/index.html`. Then in `src/index.css` change the body's font family to Roboto.

## defaultProps and propTypes

**Objectives:**
* Use `defaultProps` to give props a default value.
* Use `propTypes` to specify what props a component is expecting

### defaultProps

Default values for props in a component.

``` javascript
class IngredientsList extends Component {
    static defaultProps = {
        ingredients: []
    }

    render() {
        return (
            <ul>
                {this.props.ingredients.map((ing, ind) => (
                    <li key={ind}>{ing}</li>
                ))}
            </ul>
        );
    }
}
```

If we weren't given any ingredients, and we didn't have our `defaultProps` set, `this.props.ingredients` would be undefined and `.map` would return an error, breaking our project.

This syntax also works:

``` javascript
class IngredientsList extends Component {
    render() {
        return (
            <ul>
                {this.props.ingredients.map((ing, ind) => (
                    <li key={ind}>{ing}</li>
                ))}
            </ul>
        );
    }
}

IngredientsList.defaultProps = {
    ingredients: []
};
```

Here's an example of it in use:

``` javascript
class App extends Component {
    static defaultProps = {
        recipes: [{
            title: "Pasta",
            ingredients: ["flour", "water"],
            instructions: "Add flour to water and mix",
            img: "spaghetti.jpg"
        }]
    }

    render() {
        return (
            <div>
                {this.props.recipes.map((r, index) => (
                    <Recipe key={index} title={r.title}
                        ingredients={r.ingredients}
                        img={r.img} instructions={r.instructions}
                    />
                ))}
            </div>
        );
    }
}
```

We can also write it this way:

``` javascript
class App extends Component {
    static defaultProps = {
        recipes: [{
            title: "Pasta",
            ingredients: ["flour", "water"],
            instructions: "Add flour to water and mix",
            img: "spaghetti.jpg"
        }]
    }

    render() {
        return (
            <div>
                {this.props.recipes.map((r, index) => (
                    <Recipe key={index} {...r} />
                ))}
            </div>
        );
    }
}
```

This is using the spread(rest) operator to make each key/value pair in the object a prop. This isn't always the best answer because sometimes it can be sloppy when you have props you don't mean to pass.

### propTypes

Development time type checker for your props.

Installation: `npm install --save prop-types`