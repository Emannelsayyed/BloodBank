import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const InventoryUpdateForm = ({ isOpen, onClose, onSubmit, inventoryItem }) => {
  const [units, setUnits] = useState('');

  useEffect(() => {
    if (inventoryItem) {
      setUnits(inventoryItem.units);
    }
  }, [inventoryItem, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inventoryItem) {
      onSubmit(inventoryItem.bloodType, parseInt(units));
      onClose();
    }
  };

  if (!isOpen || !inventoryItem) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Update {inventoryItem.bloodType} Stock</h2>
          <button className="modal-close" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Blood Type</label>
            <input
              type="text"
              value={inventoryItem.bloodType}
              className="form-input"
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Current Units</label>
            <input
              type="text"
              value={inventoryItem.units}
              className="form-input"
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">New Units Count *</label>
            <input
              type="number"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="form-input"
              min="0"
              max="200"
              required
            />
            <p className="form-help">Enter the new total number of units available</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryUpdateForm;
