import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

import RTTCall from './componants/rttcall';

import Footerbar from './componants/footer/Footerbar';

function App() {

  let [start, setStart] = useState('');
  let [end, setEnd] = useState('');

  return(
    <>
      <div className='input-box'>
        <h2>Train Route Traffic Graphs</h2>
        {/* Link to src tiploc list of names */}
        <p>Input CRS OR Tiploc names of stations: https://www.rail-record.co.uk/railway-location-codes/</p>

        <input type="text" placeholder="Start Station" onChange={(e) => setStart(e.target.value)} />
        <input type="text" placeholder="End Station" onChange={(e) => setEnd(e.target.value)} />

      </div>
      
      <RTTCall start={start} end={end} />

      <Footerbar/>
    </>
  )
}

export default App;
