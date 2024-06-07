import { useState, useCallback, useEffect } from "react";
import "./styles/App.css";

import { useCharacterApi } from "./hooks/useCharacterApi";

import Attributes from "./components/Attributes";
import Classes from "./components/Classes";

const defaultCharacter = {
  id: 1,
  attributes: {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  },
  skills: {},
};

function App() {
  const [characters, setCharacters] = useState([defaultCharacter]);
  const { characters: fetchedCharacters, isLoading, error } = useCharacterApi();

  useEffect(() => {
    if (fetchedCharacters && fetchedCharacters.length > 0) {
      setCharacters(fetchedCharacters);
    }
  }, [fetchedCharacters]);

  const calculateModifier = useCallback(
    (value) => Math.floor((value - 10) / 2),
    []
  );

  const updateAttributes = (index, name, value) => {
    const updatedCharacters = characters.map((char, i) => {
      if (i === index) {
        return {
          ...char,
          attributes: {
            ...char.attributes,
            [name]: value,
          },
        };
      }
      return char;
    });
    setCharacters(updatedCharacters);
  };

  const incrementAttribute = (index, name) => {
    updateAttributes(index, name, characters[index].attributes[name] + 1);
  };

  const decrementAttribute = (index, name) => {
    updateAttributes(index, name, characters[index].attributes[name] - 1);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading characters</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        React Coding Exercise - Sepehr Parirokh
      </h1>
      <div className="flex justify-between mb-4"></div>
      {characters.map((character, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-xl font-bold mb-4">Character {character.id}</h2>
          <div className="flex">
            <Attributes
              attributes={character.attributes}
              onIncrement={(name) => incrementAttribute(index, name)}
              onDecrement={(name) => decrementAttribute(index, name)}
              calculateModifier={calculateModifier}
            />
            <Classes attributes={character.attributes} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
