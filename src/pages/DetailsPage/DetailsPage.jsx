import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SimpsonsContext } from "../../context/SimpsonsContext.jsx";
import { cleanURL } from "../../utils";

const DetailsPage = () => {
  const { characters } = useContext(SimpsonsContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  const foundCharacter = useMemo(() => {
    return characters.find((char) => char.id === id);
  }, [characters, id]);
  
  useEffect(() => {
    setCharacter(foundCharacter);
  }, [foundCharacter]);

  if (!character) {
    return <div>Loading...</div>;
  }

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
        <button
          onClick={handleBackClick}
          className="mb-4 py-2 px-4 bg-primary text-white text-lg rounded-lg hover:bg-secondary focus:outline-none "
        >
          Go Back
        </button>
        <div className="flex flex-col items-center">
          <img
            src={cleanURL(character.avatar)}
            alt={character.name}
            className="w-48 h-48 object-contain mb-4"
          />
          <h1 className="text-4xl font-bold mb-4">{character.name}</h1>
          <h2 className="text-2xl font-semibold mb-6">{character.job}</h2>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Description:</h3>
          <p className="text-gray-700">{character.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
