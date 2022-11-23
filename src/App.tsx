import React from 'react';
import './App.css';
import Bridge from './Bridge/Bridge';
import Nav from './Nav/Nav';

function App() {
  return (
    <>
      <Nav />
      <div style={{ marginTop: 80 }}>
        <Bridge />
      </div>
    </>
  );
}

export default App;
