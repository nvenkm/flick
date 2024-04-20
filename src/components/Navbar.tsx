import React from "react";

const Navbar = () => {
  return (
    <nav className="md:px-10 flex justify-between p-3 font-mono">
      <p className="text-xl font-bold text-gray-700">Flick</p>
      <ul className="flex gap-4">
        <li>Leaderboards</li>
        <li>My flicks</li>
        <li>Account</li>
      </ul>
    </nav>
  );
};

export default Navbar;
