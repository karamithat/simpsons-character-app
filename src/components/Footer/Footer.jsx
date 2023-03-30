import React from "react";
import simpsonsLogo from "../../assets/The_logo_simpsons_yellow.png";

const Footer = () => {
  return (
    <footer className="bg-blue-500 p-6 flex flex-col items-center justify-center">
      <img
        src={simpsonsLogo}
        alt="The Simpsons Logo"
        className="w-24 h-auto mb-4"
      />
      <p className="text-primary font-semibold text-lg">
        © 2023 Simpsons. All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
