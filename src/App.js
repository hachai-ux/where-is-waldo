import Canvas from './components/Canvas';
import togepi from './images/Togepi.png';
import wobbuffet from './images/Wobbuffet.png';
import horsea from './images/Horsea.png';

function App() {
  return (
    <div className="App">
      <h1>Find and click on the 3 pokemon to win</h1>
            <div>
                <img className='pokemon-display' alt="Togepi" src={togepi} />
                <img className='pokemon-display' alt="Wobbuffett" src={wobbuffet} />
                <img className='pokemon-display' alt="Horsea" src={horsea}/>
            </div>
      <Canvas />
    </div>
  );
}

export default App;
