import React from "react";
import { Link } from "react-router-dom";

const MainDashboard = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-gray-900 text-white rounded-2xl ">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg rounded-t-2xl">
        <h1 className="text-2xl font-bold">Game Dashboard</h1>
        <nav className="flex gap-6">
          <a href="/" className="hover:text-gray-200 transition-colors">
            Home
          </a>
          <a
            href="https://github.com/Minh20812"
            className="hover:text-gray-200 transition-colors"
          >
            Profile
          </a>
          <a
            href="https://portfolio-chi-sand-96.vercel.app/"
            className="hover:text-gray-200 transition-colors"
          >
            Portfolio
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main
        className="flex-grow p-6 flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://readymadeui.com/cardImg.webp')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Welcome to the Game Dashboard
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed ">
            Discover exciting games to play together with your friends and
            create lasting memories.
          </p>
          <Link
            to="/games"
            className="animated-border-button px-6 py-3 text-white rounded-3xl shadow-md hover:shadow-lg hover:scale-105 transition-transform text-center inline-block"
          >
            Get Started
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-gray-800 text-center text-gray-400 rounded-b-2xl">
        © 2024 Game Dashboard. All rights reserved.
      </footer>
    </div>
  );
};

export default MainDashboard;
