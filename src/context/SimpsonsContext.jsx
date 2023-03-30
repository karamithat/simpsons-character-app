import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCharacters, addCharacter } from "../api/api.js";

export const SimpsonsContext = createContext();

const SimpsonsContextProvider = ({ children }) => {
  const navigate = useNavigate();
  
  const [characters, setCharacters] = useState(
    JSON.parse(localStorage.getItem("characters")) || []
  );
  const [characterOrder, setCharacterOrder] = useState(
    JSON.parse(localStorage.getItem("characterOrder")) || []
  );

  useEffect(() => {
    if (characters.length === 0 && characterOrder.length === 0) {
      getCharacters().then((response) => {
        setCharacters(response.data);
        setCharacterOrder(response.data);
        localStorage.setItem("characters", JSON.stringify(response.data));
        localStorage.setItem("characterOrder", JSON.stringify(response.data));
      });
    }
  }, [characters]);

  const addNewCharacter = (character) => {
    const updatedCharacters = addCharacter(character);
    setCharacters(updatedCharacters);
    navigate("/");
  };

  const deleteExistingCharacter = (id) => {
    const updatedCharacters = characters.filter(
      (character) => character.id !== id
    );
    setCharacters(updatedCharacters);
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));
  };

  const resetCharacters = async () => {
    const response = await getCharacters();
    setCharacters(response.data);
    localStorage.removeItem("characterOrder");
  };

  return (
    <SimpsonsContext.Provider
      value={{
        characters,
        getCharacters,
        addNewCharacter,
        deleteExistingCharacter,
        resetCharacters,
      }}
    >
      {children}
    </SimpsonsContext.Provider>
  );
};

export default SimpsonsContextProvider;
