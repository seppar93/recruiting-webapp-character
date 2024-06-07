import { useState , useEffect} from 'react';
import './styles/App.css';

import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import { useCharacterApi } from './hooks/useCharacterApi';


function App() {
  const [characters, setCharacters] = useState([]);
  const { characters: fetchedCharacters, isLoading, error, saveCharacter } = useCharacterApi();

  useEffect(() => {
    if (fetchedCharacters) {
      setCharacters(fetchedCharacters);
    }
  }, [fetchedCharacters]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          {fetchedCharacters.message}
        </div>
      </section>
    </div>
  );
}

export default App;
