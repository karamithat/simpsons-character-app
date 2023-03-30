import axios from 'axios';

export const mockUrl = 'https://5fc9346b2af77700165ae514.mockapi.io/simpsons';

export const getCharacters = () => {
  return axios.get(mockUrl);
};

export const addCharacter = (character) => {
  const storedCharacters = JSON.parse(localStorage.getItem("characters")) || [];
  const updatedCharacters = [...storedCharacters, character];
  localStorage.setItem("characters", JSON.stringify(updatedCharacters));
  const storedCharacterOrder = JSON.parse(localStorage.getItem("characterOrder")) || [];
  const updatedCharacterOrder = [...storedCharacterOrder, character];
  localStorage.setItem("characterOrder", JSON.stringify(updatedCharacterOrder));
  return updatedCharacters;
};

