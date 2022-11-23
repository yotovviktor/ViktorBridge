import React, { useEffect, useState } from 'react';
import './App.css';
import Bridge from './Bridge/Bridge';
import Nav from './Nav/Nav';
import { useStoreActions } from './Store/Hooks';
import { WindowSize } from './Store/models';

function App() {

  const { setWindowSize } = useStoreActions((store) => store)
  setWindowSize(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <Nav />
      <div style={{ marginTop: 80 }}>
        <Bridge />
      </div>
    </>
  );

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { width: innerWidth, height: innerHeight } as WindowSize;
  }
}

export default App;
