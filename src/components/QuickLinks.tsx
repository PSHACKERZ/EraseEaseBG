import React from 'react';
import { Link } from 'react-router-dom';

const QuickLinks: React.FC = () => {
  const links = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
      <div className="flex flex-col space-y-2">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
