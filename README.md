# ligature-to-html-entity

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

ligature-to-html-entity is a webpack loader that will target your google material-icons, replacing ligatures with the equivalent HTML entities.  
We are using the material-design-icons package by google and referencing the codepoints file which keeps a mapping of all ligature to HTML entity values and doing a replacement. 

```
# before

    <button>
      <i className="material-icons">face</i>
    </button>

# after

    <button>
      <i className="material-icons">&#xf20e;</i>
    </button>

```


## Usage
This is still a work in progress and not available in the NPM registry, if you would like to try it out you can clone it into your project and require manually from webpack.config.  
To use insert into your webpack.config loaders array, make sure to place it last in your list as below. 

```
# webpack.config.js

...

  loaders: [
    'react-hot',
    'babel?presets[]=es2015,presets[]=react',
    path.resolve(__dirname, 'ligature-to-html-entity', 'index.js'),
  ]

...

```

## Contributing
Contributing is very much welcome! Get setup by downloading all dependencies via yarn.
```
$ yarn 
```

You can run the example webpack config output using
```
$ npm run example-webpack
```

This loader has been developed and tested against Webpack@2.1.0-beta.25 and is being built for use with React JSX (as per example).

## Testing
Unit tests are being written using TAPE and Expect which can be run from npm.
```
$ npm test
```
