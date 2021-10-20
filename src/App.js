import Canvas from './components/Canvas';
import togepi from './images/Togepi.png';
import wobbuffet from './images/Wobbuffet.png';
import horsea from './images/Horsea.png';

import { useState } from 'react';
import Leaderboard from './components/Leaderboard';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import RecordPopup from './components/RecordPopup';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8g6UntQhQ1hH0R8HwUwwDaSEg4_JsnLA",
  authDomain: "where-is-waldo-2430d.firebaseapp.com",
  projectId: "where-is-waldo-2430d",
  storageBucket: "where-is-waldo-2430d.appspot.com",
  messagingSenderId: "658647515173",
  appId: "1:658647515173:web:71e694060b8041e5b5ffcc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {

  const [searchEnd, setSearchEnd] = useState(false);
  const [timestampEndLoaded, setTimestampEndLoaded] = useState(false);
  const [docRef, setDocRef] = useState(null);
  const [leaderboardActive, setLeaderboardActive] = useState(false);
  const [time, setTime] = useState(null);

  const setSearchEndTrue = () => {
    setSearchEnd(true);
  }
  const setSearchEndFalse = () => {
    setSearchEnd(false);
  }

  const assignLeaderboardActive = (bool) => {
    setLeaderboardActive(bool);
  } 

  const assignTime = (tempTime) => {
    setTime(tempTime);
  }

  const assignDocRef = (tempDocRef) => {
    setDocRef(tempDocRef);
    console.log(tempDocRef);
  };

   const assignTimestampEndLoaded = () => {
    setTimestampEndLoaded(true);
    
   };
  
   const assignTimestampEndLoadedFalse = () => {
    setTimestampEndLoaded(false);
    
  };

 const EndingPopups = () => {
  
   console.log(searchEnd);
    console.log(timestampEndLoaded);
   if (searchEnd === true && timestampEndLoaded === true) {
    
            return <RecordPopup assignLeaderboardActive={assignLeaderboardActive} time={time} assignTime={assignTime}  setSearchEndFalse={setSearchEndFalse} assignTimestampEndLoadedFalse={assignTimestampEndLoadedFalse}  db={db} docRefID={docRef.id} />
        }
   else if (leaderboardActive === true) {
            return <Leaderboard db={db} />;
        }
        else return null;
    }



  return (
    <div className="App">
      
      <h1>Find and click on the 3 pokemon to win</h1>
            <div className='display-container'>
              <div>
                <img className='pokemon-display' alt="Togepi" src={togepi} />
                <p>Togepi</p> 
        </div>
        <div>
          <img className='pokemon-display' alt="Wobbuffet" src={wobbuffet} />
          <p>Wobbuffet</p>
        </div>
        <div>
          <img className='pokemon-display' alt="Horsea" src={horsea} />
          <p>Horsea</p>
        </div>
                
              
      </div>
      <Canvas time={time} assignTime={assignTime} assignTimestampEndLoadedFalse={assignTimestampEndLoadedFalse} timestampEndLoaded={timestampEndLoaded} docRef={docRef} assignTimestampEndLoaded={assignTimestampEndLoaded} assignDocRef={assignDocRef} searchEnd={searchEnd} setSearchEndTrue={setSearchEndTrue} setSearchEndFalse={setSearchEndFalse} db={db} />
      <EndingPopups />
    </div>
  );
}

export default App;
