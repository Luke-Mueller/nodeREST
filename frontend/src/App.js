import React, { useState } from 'react';

import Display from './components/Display/Display';
import PostForm from './components/PostForm/PostForm';

import './App.css';

const App = () => {
  const [artArr, setArtArr] = useState([]);

  return (
    <div className="App">
      <h3>Add:</h3>
      <PostForm artArr={artArr} setArtArr={setArtArr} />
      <hr />
      <Display artArr={artArr} setArtArr={setArtArr} />
    </div>
  );
};

export default App;
