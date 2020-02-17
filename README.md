# ligature-to-html-entity

[![Build Status](https://travis-ci.org/sam7r/ligature-to-html-entity.svg?branch=master)](https://travis-ci.org/sam7r/ligature-to-html-entity)
[![dependencies Status](https://david-dm.org/sam7r/ligature-to-html-entity/status.svg)](https://david-dm.org/sam7r/ligature-to-html-entity)
[![npm version](https://img.shields.io/npm/v/ligature-to-html-entity.svg)](https://www.npmjs.com/package/ligature-to-html-entity)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

This project was created to avoid refactoring the usage of ligatures with [material-design-icons](https://github.com/google/material-design-icons), in a React application where older browser support is required.  

So here is a simple Webpack loader that will target your icons and replace them with the equivalent HTML entities provided by google's Material Design Icons.  

By using the [material-design-icons](https://github.com/google/material-design-icons) package and referencing the codepoints file, we can map all ligature instances to HTML entity values. 

This is v2 with **Webpack@4** support.<br>
For **Webpack@2** support please use v1.

```html
<i className="material-icons">face</i>   <!---->   <i className="material-icons">&#xf20e;</i>

```


## Usage
Install as a dev dependency via npm.
```
$ npm install ligature-to-html-entity@2 --save-dev
```

When inserting this loader into your Webpack configuration, make sure to place it **last in the list** (as below). 

```javascript
// webpack.config.js

rules: [
  {
    test: /\.js$/,<!-- ligature-to-html-entity -->
    exclude: path.resolve(__dirname, '../', 'node_modules'),
    use: [
      {
        loader: 'babel-loader',
        options: {
          "presets": ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        loader: 'ligature-to-html-entity',  // <--- insert here, last loader in the list
      }
    ]
  },
  ...
]
```

### Default usage
This is the result if run with no query params, targeting the typical material-icons element markup.
```html
<i className="material-icons">face</i>  <!-- becomes  -->  <i className="material-icons">&#xf20e;</i>
```

### Custom query
You can add the *tag* and *attr* as a query params. In this example we are setting the tag to *md-icon* and omitting the attribute by using a minus char.  
```html
<!-- ligature-to-html-entity?tag=md-icon&-attr -->

<md-icon>face</md-icon>   -->   <md-icon>&#xf20e;</md-icon>
```

## Options

| Query         | Default value  | Description                                          | example                                     |
| ------------- |----------------| -----                                                | ------------                                |
| tag           | i              | DOM element tag to target | `?tag=md-icon`                             |
| attr          | material-icons | Element attribute value to target | `?-attr` (false), `?attr=material-icons`     |
| debug         | false          | Print affected element details to the console | `?debug` (true)                             |


## Contributing
Contributing is very much welcome! Get setup by downloading all dependencies.
```sh
$ npm install
```

You can run the example Webpack config output using
```sh
$ npm run example-webpack
```

You can turn debugging on in your webpack config by adding *debug* as a query param.
```js
{ loader: 'ligature-to-html-entity?debug' }
```

Unit tests are being written using TAPE and Expect which can be run from npm.
```sh
$ npm test
```



  
