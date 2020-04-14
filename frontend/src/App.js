import React, { useState } from 'react';

import Display from './components/Display/Display';
import PostForm from './components/PostForm/PostForm';

import './App.css';

const App = () => {
  const [artArr, setArtArr] = useState([]);

  return (
    <div className="App">
      <h1 className="App__h1">DIGITAL ART PROJECT</h1>
      <PostForm artArr={artArr} setArtArr={setArtArr} />
      <Display artArr={artArr} setArtArr={setArtArr} />
    </div>
  );
};

export default App;
