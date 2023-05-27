import React, { useState } from 'react';
import {BsFillArrowRightSquareFill} from 'react-icons/bs';

function App() {
  const [location, setlocation] = useState('');
  return (
    <>
    <div className="box">
      <div className="main">
      <h1>WEATHER APP</h1>
      <div className="form">
        <input type="text" name="location" value={location} placeholder='Search for a city . . .' onChange={(e) => setlocation(e.target.value)} />
        <a href={`/${location}`}><BsFillArrowRightSquareFill /></a>
      </div>
      </div>
    </div>
    </>
  );
}

export default App;
