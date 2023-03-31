import './App.css';
import React, { useState } from 'react';
import Sidebar from './Sidebar';

function App() {
  const [side, setSide] = useState(false);
  console.log("Test");
  return (
    <div className="App">
      {
        side ?
          <Sidebar setSide={setSide} />
          : null
      }
      <div id='main'>
        <button id='savebtn' onClick={() => setSide(!side)}>Save segment</button>
      </div>
    </div>

  );
}

export default App;
