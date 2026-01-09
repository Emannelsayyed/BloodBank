import React, { useState } from 'react';
import { Plus, MapPin, Package, Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import RequestForm from '../components/RequestForm';
import ConfirmDialog from '../components/ConfirmDialog';

const Requests = ({ requests, onAddRequest, onUpdateRequest, onDeleteRequest, onApproveRequest }) => {
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);

  const handleAddClick = () => {
    setSelectedRequest(null);
    setShowRequestForm(true);
  };

  const handleEditClick = (request) => {
    setSelectedRequest(request);
    setShowRequestForm(true);
  };

  const handleDeleteClick = (request) => {
    setRequestToDelete(request);
    setShowDeleteDialog(true);
  };

  const handleFormSubmit = (requestData) => {
    if (selectedRequest) {
      onUpdateRequest(selectedRequest.id, requestData);
    } else {
      onAddRequest(requestData);
    }
  };

  const handleConfirmDelete = () => {
    if (requestToDelete) {
      onDeleteRequest(requestToDelete.id);
    }
  };

  const handleApprove = (request) => {
    onApproveRequest(request.id, 'approved');
  };

  const handleReject = (request) => {
    onApproveRequest(request.id, 'rejected');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h2 className="section-title">Blood Requests</h2>
        <button 
          onClick={handleAddClick}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          New Request
        </button>
      </div>

      <div className="grid gap-4">
        {requests.length === 0 ? (
          <div className="card text-center py-12">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">No blood requests</p>
            <p className="text-slate-500 text-sm">Click "New Request" to add one</p>
          </div>
        ) : (
          requests.map(request => (
            <div key={request.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-slate-900">{request.patient}</h3>
                    <span className="blood-type-badge">{request.bloodType}</span>
                    <span className={`urgency-badge ${
                      request.urgency === 'critical' ? 'critical' :
                      request.urgency === 'high' ? 'high' : 'medium'
                    }`}>
                      {request.urgency} urgency
                    </span>
                    <span className={`status-badge ${
                      request.status === 'completed' ? 'bg-emerald-500' :
                      request.status === 'approved' ? 'bg-blue-500' :
                      request.status === 'rejected' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{request.hospital}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Package className="w-4 h-4" />
                      <span>{request.units} units needed</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>{request.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{request.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="action-btn"
                      onClick={() => handleEditClick(request)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="action-btn text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteClick(request)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {request.status === 'pending' && (
                  <div className="flex gap-2 ml-4">
                    <button 
                      className="btn-primary-sm"
                      onClick={() => handleApprove(request)}
                    >
                      Approve
                    </button>
                    <button 
                      className="btn-secondary-sm"
                      onClick={() => handleReject(request)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <RequestForm
        isOpen={showRequestForm}
        onClose={() => setShowRequestForm(false)}
        onSubmit={handleFormSubmit}
        request={selectedRequest}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Request"
        message={`Are you sure you want to delete the request for ${requestToDelete?.patient}? This action cannot be undone.`}
      />
    </div>
  );
};

export default Requests;
