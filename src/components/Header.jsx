import React from 'react';
import { Droplet } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon">
            <Droplet className="w-6 h-6" />
          </div>
          <div className="logo-text">
            <h1> Blood Bank</h1>
            <p>Saving Lives, One Donation at a Time</p>
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
