import React from 'react';
const Footer = () => {
    return (
      <footer className="bg-black-600 text-white py-2 text-center">
        &copy; {new Date().getFullYear()} Library System. All rights reserved.
      </footer>
    );
  };
  
export default Footer;