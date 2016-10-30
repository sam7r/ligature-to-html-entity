import React from 'react';
import { render } from 'react-dom';

const App = () => {
  return(
    <button>
      <i className="material-icons">face</i>
    </button>
  );
}

render(<App />, document.querySelector('#app'));