# webpack-ligature-to-unicode-icons


## Usage
This loader will simply transform all of your google material-icons, replacing ligatures with the older unicode equivalent for older browsers.  
We are pulling the material-design-icons package by google, referencing the codepoints file which keeps a mapping of all ligature to unicode values and doing a replacement. 

This is still a **work in progress** and not available in the NPM registry, so for the moment if you would like to try it out simply include it in your webpack config as you would any custom loader by requiring the file directly. 
```
# webpack.config.js

...

  loaders: [
    'babel?presets[]=es2015,presets[]=react',
    path.resolve(__dirname, 'index.js'),
  ]

...

```

At the moment it would need to be last in your loaders list (run's first) as it will not currently work on transpiled code. 

## Contributing
Contributing is very much welcome! Get setup by downloading all dependencies via yarn.
```
$ yarn 
```

You can run the example webpack config output using
```
$ npm run example-test
```

This loader has been developed and tested against Webpack@2.1.0-beta.25 and is being built for use with React JSX (as per example).

## Testing
Unit tests are being written using TAPE and Expect which can be run from npm.
```
$ npm test
```
