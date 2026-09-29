import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold text-white">AMPOULE PICK</div>
        <div className="text-center md:text-left">
          <p>© {new Date().getFullYear()} AMPOULE PICK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
