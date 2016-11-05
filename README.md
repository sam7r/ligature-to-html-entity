# ligature-to-html-entity

[![Build Status](https://travis-ci.org/sam7r/ligature-to-html-entity.svg?branch=master)](https://travis-ci.org/sam7r/ligature-to-html-entity)
[![dependencies Status](https://david-dm.org/sam7r/ligature-to-html-entity/status.svg)](https://david-dm.org/sam7r/ligature-to-html-entity)
[![npm version](https://img.shields.io/npm/v/ligature-to-html-entity.svg)](https://www.npmjs.com/package/ligature-to-html-entity.svg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

This project was created to avoid refactoring the usage of ligatures with [material-design-icons](https://github.com/google/material-design-icons), in a React application where older browser support is required.  

So here is a simple Webpack loader that will target your icons and replace them with the equivalent HTML entities provided by google's Material Design Icons.  

By using the [material-design-icons](https://github.com/google/material-design-icons) package and referencing the codepoints file, we can map all ligature instances to HTML entity values. Works with **Webpack@1** and **Webpack@2**.

```

<i className="material-icons">face</i>   -->   <i className="material-icons">&#xf20e;</i>

```


## Usage
Install as a dev dependency via npm (or yarn).
```
$ yarn add ligature-to-html-entity --dev
```

When inserting this loader into your Webpack configuration, make sure to place it **last in the list** (as below). 

```
# webpack.config.js

  {
    test: /\.js$/,
    loaders: [
      'react-hot',
      'babel?presets[]=es2015,presets[]=react',
-->   'ligature-to-html-entity'
    ]
  }
```

### Default usage
This is the result if run with no query params, targeting the typical material-icons element markup.
```
# 'ligature-to-html-entity

<i className="material-icons">face</i>   -->   <i className="material-icons">&#xf20e;</i>
```

### Custom query
You can add the *tag* and *attr* as a query params. In this example we are setting the tag to *md-icon* and omitting the attribute by using a minus char.  
```
# 'ligature-to-html-entity?tag=md-icon&-attr

<md-icon>face</md-icon>   -->   <md-icon>&#xf20e;</md-icon>
```

### API Summary

| Query         | Default value  | Description                                          | example                                     |
| ------------- |----------------| -----                                                | ------------                                |
| tag           | i              | DOM element tag (`<icon-tag></icon-tag>`)              | `?tag=icon-tag`                             |
| attr          | material-icons | attr/attr val (`<i attr="attr-val"></i>`)  | `?-attr` (false), `?attr=material-icons`     |
| debug         | false          | print affected element details to the console | `?debug` (true)                             |


## Contributing
Contributing is very much welcome! Get setup by downloading all dependencies via yarn.
```
$ yarn 
```

You can run the example Webpack config output using
```
$ npm run example-webpack
```

You can turn debugging on by adding *debug* as a query.
```
# `ligature-to-html-entity?debug`
```

Unit tests are being written using TAPE and Expect which can be run from npm.
```
$ npm test
```



  