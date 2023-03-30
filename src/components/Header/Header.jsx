import React from "react";
import simpsonsLogo from "../../assets/The_logo_simpsons_yellow.png";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const isAddPage = location.pathname === "/add";
  const buttonText = isAddPage ? "Back Home" : "Add Character";
  const buttonLink = isAddPage ? "/" : "/add";

  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={simpsonsLogo}
              alt="The Simpsons Logo"
              className="w-24 cursor-pointer"
            />
          </Link>
        </div>
        <button className="space-x-4">
          <Link
            to={buttonLink}
            className="mt-8 py-2 px-4 bg-primary text-white text-lg rounded-lg hover:bg-secondary focus:outline-none"
          >
            {buttonText}
          </Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
