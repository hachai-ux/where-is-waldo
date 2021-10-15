import Canvas from './components/Canvas';
import togepi from './images/Togepi.png';
import wobbuffet from './images/Wobbuffet.png';
import horsea from './images/Horsea.png';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
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
      <Canvas db={db} />
    </div>
  );
}

export default App;
