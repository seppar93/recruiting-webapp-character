import { useState, useCallback, useEffect } from "react";
import "./styles/App.css";

import { useCharacterApi } from "./hooks/useCharacterApi";

import Attributes from "./components/Attributes";
import Classes from "./components/Classes";
import Skills from "./components/Skills";
import SkillCheck from "./components/SkillCheck";

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

const App = () => {
  const [characters, setCharacters] = useState([defaultCharacter]);
  const {
    characters: fetchedCharacters,
    isLoading,
    error,
    saveCharacter,
  } = useCharacterApi();

  useEffect(() => {
    if (fetchedCharacters && fetchedCharacters.length > 0) {
      setCharacters(fetchedCharacters);
    }
  }, [fetchedCharacters]);

  const calculateModifier = useCallback(
    (value) => Math.floor((value - 10) / 2),
    []
  );

  const handleAddCharacter = () => {
    setCharacters([
      ...characters,
      { ...defaultCharacter, id: characters.length + 1 },
    ]);
  };

  const handleResetCharacters = () => {
    setCharacters([defaultCharacter]);
  };

  const handleSaveCharacters = () => {
    saveCharacter(characters);
  };

  // TODO: would have moved to a useAttrabute context given more time decided to keep in parent
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
    const totalAttributes = Object.values(characters[index].attributes).reduce(
      (sum, val) => sum + val,
      0
    );
    if (totalAttributes < 70) {
      updateAttributes(index, name, characters[index].attributes[name] + 1);
    }
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
      <div className="flex justify-between mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2"
          onClick={handleAddCharacter}
        >
          Add New Character
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2"
          onClick={handleResetCharacters}
        >
          Reset All Characters
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={handleSaveCharacters}
        >
          Save All Characters
        </button>
      </div>
      {characters.map((character, index) => (
        // TODO: set unique Ids for keys for the diff algo
        <div key={index} className="mb-8">
          <h2 className="text-xl font-bold mb-4">Character {character.id}</h2>
          <div className="flex space-x-4">
            <Attributes
              attributes={character.attributes}
              onIncrement={(name) => incrementAttribute(index, name)}
              onDecrement={(name) => decrementAttribute(index, name)}
              calculateModifier={calculateModifier}
            />
            <Classes attributes={character.attributes} />
            <Skills attributes={character.attributes} />
            <SkillCheck
              attributes={character.attributes}
              calculateSkillTotal={(skill, attribute) => {
                const modifier = calculateModifier(
                  character.attributes[attribute]
                );
                const points = character.skills[skill] || 0;
                return modifier + points;
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
