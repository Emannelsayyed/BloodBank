import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import InventoryUpdateForm from '../components/InventoryUpdateForm';

const Inventory = ({ inventory, onUpdateInventory }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getInventoryStatus = (units) => {
    if (units < 10) return { label: 'Critical', color: 'bg-red-500' };
    if (units < 20) return { label: 'Low', color: 'bg-yellow-500' };
    return { label: 'Good', color: 'bg-emerald-500' };
  };

  const handleUpdateClick = (item) => {
    setSelectedItem(item);
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = (bloodType, units) => {
    onUpdateInventory(bloodType, units);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="section-title">Blood Inventory Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {inventory.map(item => {
          const status = getInventoryStatus(item.units);
          return (
            <div key={item.bloodType} className="card group hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-bold text-slate-900">{item.bloodType}</h3>
                <span className={`status-badge ${status.color}`}>{status.label}</span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-slate-900">{item.units}</span>
                  <span className="text-slate-500">units</span>
                </div>
                <div className="progress-bar h-3">
                  <div 
                    className={`progress-fill ${status.color}`}
                    style={{ width: `${Math.min((item.units / 60) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                <span>Updated: {item.lastUpdated}</span>
                <button 
                  className="text-red-600 hover:text-red-700 font-medium"
                  onClick={() => handleUpdateClick(item)}
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h3 className="section-title mb-4">Stock Alerts</h3>
        <div className="space-y-3">
          {inventory.filter(item => item.units < 20).length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500">No stock alerts at this time. All inventory levels are adequate.</p>
            </div>
          ) : (
            inventory.filter(item => item.units < 20).map(item => (
              <div key={item.bloodType} className="alert-item">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <div className="flex-1">
                  <p className="font-medium text-slate-900">
                    Low stock for {item.bloodType}
                  </p>
                  <p className="text-sm text-slate-600">
                    Only {item.units} units remaining. Consider organizing a blood drive.
                  </p>
                </div>
                <button 
                  className="btn-secondary-sm"
                  onClick={() => handleUpdateClick(item)}
                >
                  Update Stock
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <InventoryUpdateForm
        isOpen={showUpdateForm}
        onClose={() => setShowUpdateForm(false)}
        onSubmit={handleUpdateSubmit}
        inventoryItem={selectedItem}
      />
    </div>
  );
};

export default Inventory;
