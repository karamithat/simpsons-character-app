import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SimpsonsContext } from "../../context/SimpsonsContext";
import { cleanURL } from "../../utils";
import { TbArrowBigUpFilled, TbArrowBigDownFilled } from "react-icons/tb";

const ListPage = () => {
  const { characters, deleteExistingCharacter, resetCharacters } =
    useContext(SimpsonsContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortedCharacters, setSortedCharacters] = useState(characters);
  const [sortOrder, setSortOrder] = useState(0);

  const getOrderFromLocalStorage = () => {
    const storedOrder = localStorage.getItem("characterOrder");
    if (storedOrder) {
      setSortedCharacters(JSON.parse(storedOrder));
    } else {
      setSortedCharacters(characters);
    }
  };

  useEffect(() => {
    getOrderFromLocalStorage();
  }, [characters]);
  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
    localStorage.setItem("characterOrder", JSON.stringify(sortedCharacters));
  }, [characters, sortedCharacters]);

  const sortCharacters = () => {
    let sorted;
    switch (sortOrder) {
      case 0: // A-Z
        sorted = [...sortedCharacters].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setSortOrder(1);
        break;
      case 1: // Last letter
        sorted = [...sortedCharacters].sort(
          (a, b) => a.name.localeCompare(b.name) * -1
        );
        setSortOrder(2);
        break;
      default:
        sorted = characters;
        setSortOrder(0);
    }
    setSortedCharacters(sorted);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCharacters = sortedCharacters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const moveCharacter = (index, direction) => {
    const newSortedCharacters = [...sortedCharacters];
    const temp = newSortedCharacters[index + direction];
    newSortedCharacters[index + direction] = newSortedCharacters[index];
    newSortedCharacters[index] = temp;
    setSortedCharacters(newSortedCharacters);
    saveOrderToLocalStorage(newSortedCharacters);
  };

  const saveOrderToLocalStorage = (sortedCharacters) => {
    localStorage.setItem("characterOrder", JSON.stringify(sortedCharacters));
  };

  const handleDelete = (id) => {
    deleteExistingCharacter(id);
    const updatedSortedCharacters = sortedCharacters.filter(
      (character) => character.id !== id
    );
    setSortedCharacters(updatedSortedCharacters);
    saveOrderToLocalStorage(updatedSortedCharacters);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center max-w-3xl w-full mb-5">
        <div className="w-full mb-4 flex items-center justify-between sm:flex mt-7 px-5">
          <input
            value={searchTerm}
            onChange={handleSearch}
            type="text"
            placeholder="Search characters..."
            className="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          {sortedCharacters.length === 0 && (
            <button
              onClick={resetCharacters}
              className="py-2 px-4 bg-primary text-white text-lg rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              ReFetch Characters
            </button>
          )}
          <button
            onClick={sortCharacters}
            className="py-2 px-4 bg-primary text-white text-lg rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Sort A-Z
          </button>
        </div>
        <ul className="grid grid-cols-1 gap-4  min-w-[150px]">
          {filteredCharacters.length > 0 ? (
            filteredCharacters.map((character, index) => (
              <li
                key={character.id}
                className="bg-white rounded-lg overflow-hidden shadow-md relative transform hover:scale-105 transition-all ease-in duration-300"
              >
                <Link to={`/characters/${character.id}`} className="block">
                  <img
                    src={cleanURL(character.avatar)}
                    alt={character.name}
                    className="w-full h-36 object-contain"
                  />
                  <div className="px-4 py-2">
                    <h2 className="text-lg text-center font-bold mb-2">
                      {character.name}
                    </h2>
                  </div>
                </Link>
                <button
                  onClick={() => handleDelete(character.id)}
                  className="absolute top-0 right-0 p-2 bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  X
                </button>
                <div className="absolute top-1/2 left-0 p-2 flex flex-col items-center">
                  {index > 0 && sortedCharacters.length > 1 && (
                    <button
                      onClick={() => moveCharacter(index, -1)}
                      className="mb-2 text-primary text-lg hover:text-secondary focus:outline-none"
                    >
                      <TbArrowBigUpFilled />
                    </button>
                  )}
                  {index < sortedCharacters.length - 1 && (
                    <button
                      onClick={() => moveCharacter(index, 1)}
                      className="text-primary text-lg hover:text-secondary focus:outline-none"
                    >
                      <TbArrowBigDownFilled />
                    </button>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-lg text-gray-700">
              Character not found.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ListPage;
