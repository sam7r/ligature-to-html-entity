import React from 'react';
import { render } from 'react-dom';

const App = () => {
  return(
    <button>
      <i className="material-icons">face</i>
      <i className="material-icons">zoom_in</i>
      <i className="material-icons">zoom_out</i>
      <i className="material-icons">zoom_out_map</i>
    </button>
  );
}

render(<App />, document.querySelector('#app'));