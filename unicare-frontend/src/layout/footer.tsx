import React from 'react';

interface FooterProps {
  children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="sticky bottom-0 flex h-16 items-center justify-between border-t border-stroke bg-white px-4 py-3 dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {currentYear} UniCare. All rights reserved.
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <nav className="flex gap-4">
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;