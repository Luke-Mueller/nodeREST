import React, { useState } from 'react';

import Display from './components/Display/Display';
import EditForm from './components/EditForm/EditForm';
import PostForm from './components/PostForm/PostForm';

import './App.css';

const App = () => {
  const [artArr, setArtArr] = useState([]);
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState({});

  const setEditingHandler = data => {
    console.log("D", data)
    setEditing(true);
    setData(data);
  };

  let form;
  let display;
  if (!editing) {
    form = <PostForm artArr={artArr} setArtArr={setArtArr} />;
    display = (
      <Display 
        artArr={artArr} 
        setArtArr={setArtArr}
        setEditing={setEditingHandler} />
    );
  } else {
    form = (
      <EditForm data={data} setEditing={setEditing}/>
    );
    display = null;
  }

  return (
    <div className="App">
      <h1 className="App__h1">DIGITAL ART PROJECT</h1>
      {form}
      {display}
    </div>
  );
};

export default App;
