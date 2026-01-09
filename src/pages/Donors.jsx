import React, { useState } from 'react';
import { Search, UserPlus, Edit, Trash2, Users } from 'lucide-react';
import DonorForm from '../components/DonorForm';
import ConfirmDialog from '../components/ConfirmDialog';

const Donors = ({ donors, onAddDonor, onUpdateDonor, onDeleteDonor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBloodType, setFilterBloodType] = useState('all');
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [donorToDelete, setDonorToDelete] = useState(null);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.phone.includes(searchTerm);
    const matchesFilter = filterBloodType === 'all' || donor.bloodType === filterBloodType;
    return matchesSearch && matchesFilter;
  });

  const handleAddClick = () => {
    setSelectedDonor(null);
    setShowDonorForm(true);
  };

  const handleEditClick = (donor) => {
    setSelectedDonor(donor);
    setShowDonorForm(true);
  };

  const handleDeleteClick = (donor) => {
    setDonorToDelete(donor);
    setShowDeleteDialog(true);
  };

  const handleFormSubmit = (donorData) => {
    if (selectedDonor) {
      onUpdateDonor(selectedDonor.id, donorData);
    } else {
      onAddDonor(donorData);
    }
  };

  const handleConfirmDelete = () => {
    if (donorToDelete) {
      onDeleteDonor(donorToDelete.id);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="flex-1 w-full max-w-md">
          <div className="search-box">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search donors by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <select 
            value={filterBloodType}
            onChange={(e) => setFilterBloodType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Blood Types</option>
            {bloodTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <button 
            onClick={handleAddClick}
            className="btn-primary"
          >
            <UserPlus className="w-4 h-4" />
            Add Donor
          </button>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Donor Name</th>
                <th>Blood Type</th>
                <th>Contact</th>
                <th>Last Donation</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map(donor => (
                <tr key={donor.id}>
                  <td>
                    <div>
                      <p className="font-medium text-slate-900">{donor.name}</p>
                      <p className="text-sm text-slate-500">{donor.email}</p>
                    </div>
                  </td>
                  <td>
                    <span className="blood-type-tag">{donor.bloodType}</span>
                  </td>
                  <td>
                    <div className="text-sm">
                      <p className="text-slate-700">{donor.phone}</p>
                      <p className="text-slate-500">{donor.address}</p>
                    </div>
                  </td>
                  <td>
                    <span className="text-sm text-slate-600">{donor.lastDonation}</span>
                  </td>
                  <td>
                    <span className={`status-badge ${
                      donor.status === 'eligible' ? 'bg-emerald-500' : 'bg-yellow-500'
                    }`}>
                      {donor.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        className="action-btn"
                        onClick={() => handleEditClick(donor)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="action-btn text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteClick(donor)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredDonors.length === 0 && (
        <div className="empty-state">
          <Users className="w-12 h-12 text-slate-300 mb-3" />
          <p className="text-slate-600 font-medium">No donors found</p>
          <p className="text-slate-500 text-sm">Try adjusting your search or filters</p>
        </div>
      )}

      <DonorForm
        isOpen={showDonorForm}
        onClose={() => setShowDonorForm(false)}
        onSubmit={handleFormSubmit}
        donor={selectedDonor}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Donor"
        message={`Are you sure you want to delete ${donorToDelete?.name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Donors;
