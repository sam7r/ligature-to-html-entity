# webpack-ligature-to-unicode-icons


## Usage
This loader will simply transform all of your google material-icons replacing the newer ligatures with the older unicode equivalent for older browsers.

This is still a **work in progress** so for the moment if you would like to try it out, simply include it in your webpack config as you would any custom loader. 
```
# webpack.config.js

...

  loaders: [
    'babel?presets[]=es2015,presets[]=react',
    path.resolve(__dirname, 'ligatureToUnicode.js'),
  ]

...

```

Please put last in your loaders list (run's first) as ligature-to-unicode will not currently work on transpiled code. 



## Contributing
Contributing is welcome! Get setup by download all dependencies using yarn.
```
$ yarn 
```

You can run the example webpack config output using
```
$ npm run example-test
```

This loader has been developed and tested against Webpack@2.1.0-beta.25 and is being built for use with React JSX (as per example).
