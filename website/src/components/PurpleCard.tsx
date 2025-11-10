import React from 'react';

interface PurpleCardProps {
  title?: string;
  description?: string;
}

export const PurpleCard: React.FC<PurpleCardProps> = ({
  title = "Welcome",
  description = "This is a component with a purple background"
}) => {
  return (
    <main style={{ minHeight: 'calc(100vh - 200px)' }} className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="bg-purple-600 rounded-lg shadow-2xl p-8 max-w-md w-full text-white">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-purple-100 mb-6">{description}</p>
        <button className="w-full bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105 cursor-pointer">
          Click Me
        </button>
      </div>
    </main>
  );
};
