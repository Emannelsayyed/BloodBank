import React from 'react';
import { Activity, Users, Package, Droplet } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="nav-container">
      <nav className="navigation">
        <button 
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <Activity className="w-4 h-4" />
          Dashboard
        </button>
        <button 
          className={`nav-btn ${activeTab === 'donors' ? 'active' : ''}`}
          onClick={() => setActiveTab('donors')}
        >
          <Users className="w-4 h-4" />
          Donors
        </button>
        <button 
          className={`nav-btn ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          <Package className="w-4 h-4" />
          Inventory
        </button>
        <button 
          className={`nav-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <Droplet className="w-4 h-4" />
          Requests
        </button>
      </nav>
    </div>
  );
};

export default Navigation;
