import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Donors from './pages/Donors';
import Inventory from './pages/Inventory';
import Requests from './pages/Requests';
import './styles/main.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Donors State
  const [donors, setDonors] = useState([
    { id: 1, name: 'Ahmed Hassan', bloodType: 'O+', phone: '+20 123 456 7890', lastDonation: '2024-11-15', status: 'eligible', email: 'ahmed@email.com', age: 28, address: 'Cairo, Egypt' },
    { id: 2, name: 'Sara Mohamed', bloodType: 'A+', phone: '+20 123 456 7891', lastDonation: '2024-12-20', status: 'pending', email: 'sara@email.com', age: 32, address: 'Alexandria, Egypt' },
    { id: 3, name: 'Omar Ali', bloodType: 'B+', phone: '+20 123 456 7892', lastDonation: '2024-10-05', status: 'eligible', email: 'omar@email.com', age: 25, address: 'Giza, Egypt' },
    { id: 4, name: 'Fatima Ibrahim', bloodType: 'AB+', phone: '+20 123 456 7893', lastDonation: '2024-09-12', status: 'eligible', email: 'fatima@email.com', age: 30, address: 'Cairo, Egypt' },
  ]);

  // Inventory State
  const [inventory, setInventory] = useState([
    { bloodType: 'A+', units: 45, lastUpdated: '2025-01-09' },
    { bloodType: 'A-', units: 12, lastUpdated: '2025-01-09' },
    { bloodType: 'B+', units: 38, lastUpdated: '2025-01-08' },
    { bloodType: 'B-', units: 8, lastUpdated: '2025-01-09' },
    { bloodType: 'AB+', units: 15, lastUpdated: '2025-01-08' },
    { bloodType: 'AB-', units: 5, lastUpdated: '2025-01-09' },
    { bloodType: 'O+', units: 52, lastUpdated: '2025-01-09' },
    { bloodType: 'O-', units: 18, lastUpdated: '2025-01-08' },
  ]);

  // Requests State
  const [requests, setRequests] = useState([
    { id: 1, patient: 'Khaled Mahmoud', bloodType: 'O+', units: 2, urgency: 'high', hospital: 'Cairo University Hospital', date: '2025-01-09', status: 'pending' },
    { id: 2, patient: 'Mona Sayed', bloodType: 'A-', units: 1, urgency: 'critical', hospital: 'Alexandria Medical Center', date: '2025-01-09', status: 'pending' },
    { id: 3, patient: 'Hassan Ahmed', bloodType: 'B+', units: 3, urgency: 'medium', hospital: 'Giza General Hospital', date: '2025-01-08', status: 'completed' },
  ]);

  // Donor CRUD Operations
  const handleAddDonor = (donorData) => {
    const newDonor = {
      ...donorData,
      id: donors.length > 0 ? Math.max(...donors.map(d => d.id)) + 1 : 1
    };
    setDonors([...donors, newDonor]);
    alert('Donor added successfully!');
  };

  const handleUpdateDonor = (id, donorData) => {
    setDonors(donors.map(donor => 
      donor.id === id ? { ...donorData, id } : donor
    ));
    alert('Donor updated successfully!');
  };

  const handleDeleteDonor = (id) => {
    setDonors(donors.filter(donor => donor.id !== id));
    alert('Donor deleted successfully!');
  };

  // Inventory Operations
  const handleUpdateInventory = (bloodType, units) => {
    setInventory(inventory.map(item =>
      item.bloodType === bloodType
        ? { ...item, units, lastUpdated: new Date().toISOString().split('T')[0] }
        : item
    ));
    alert(`${bloodType} inventory updated to ${units} units!`);
  };

  // Request CRUD Operations
  const handleAddRequest = (requestData) => {
    const newRequest = {
      ...requestData,
      id: requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1
    };
    setRequests([...requests, newRequest]);
    alert('Blood request submitted successfully!');
  };

  const handleUpdateRequest = (id, requestData) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...requestData, id } : request
    ));
    alert('Request updated successfully!');
  };

  const handleDeleteRequest = (id) => {
    setRequests(requests.filter(request => request.id !== id));
    alert('Request deleted successfully!');
  };

  const handleApproveRequest = (id, status) => {
    const request = requests.find(r => r.id === id);
    
    if (status === 'approved' && request) {
      // Check if we have enough inventory
      const inventoryItem = inventory.find(item => item.bloodType === request.bloodType);
      
      if (inventoryItem && inventoryItem.units >= request.units) {
        // Deduct from inventory
        setInventory(inventory.map(item =>
          item.bloodType === request.bloodType
            ? { ...item, units: item.units - request.units, lastUpdated: new Date().toISOString().split('T')[0] }
            : item
        ));
        
        // Update request status
        setRequests(requests.map(r =>
          r.id === id ? { ...r, status } : r
        ));
        
        alert(`Request approved! ${request.units} units of ${request.bloodType} allocated.`);
      } else {
        alert(`Insufficient inventory! Only ${inventoryItem?.units || 0} units of ${request.bloodType} available.`);
      }
    } else if (status === 'rejected') {
      setRequests(requests.map(r =>
        r.id === id ? { ...r, status } : r
      ));
      alert('Request rejected.');
    }
  };

  return (
    <div className="app-container">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard 
            donors={donors}
            inventory={inventory}
            requests={requests}
          />
        )}
        {activeTab === 'donors' && (
          <Donors
            donors={donors}
            onAddDonor={handleAddDonor}
            onUpdateDonor={handleUpdateDonor}
            onDeleteDonor={handleDeleteDonor}
          />
        )}
        {activeTab === 'inventory' && (
          <Inventory
            inventory={inventory}
            onUpdateInventory={handleUpdateInventory}
          />
        )}
        {activeTab === 'requests' && (
          <Requests
            requests={requests}
            onAddRequest={handleAddRequest}
            onUpdateRequest={handleUpdateRequest}
            onDeleteRequest={handleDeleteRequest}
            onApproveRequest={handleApproveRequest}
          />
        )}
      </main>
    </div>
  );
}

export default App;
