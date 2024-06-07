import { useState , useEffect} from 'react';
import './styles/App.css';

import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts.js';
import { useCharacterApi } from './hooks/useCharacterApi';

import Attributes from './components/Attributes';


function App() {
  const [characters, setCharacters] = useState([]);
  const { characters: fetchedCharacters, isLoading, error } = useCharacterApi();

  useEffect(() => {
    if (fetchedCharacters) {
      setCharacters(fetchedCharacters);
    }
  }, [fetchedCharacters]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading characters</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <div>
          {fetchedCharacters.message}
          <Attributes />

        </div>
      </section>
    </div>
  );
}

export default App;
