import React from 'react';
import { Users, Droplet, Activity, Package, Download, MapPin } from 'lucide-react';

const Dashboard = ({ donors, inventory, requests }) => {
  const totalDonors = donors.length;
  const eligibleDonors = donors.filter(d => d.status === 'eligible').length;
  const totalUnits = inventory.reduce((sum, item) => sum + item.units, 0);
  const criticalTypes = inventory.filter(item => item.units < 10).length;

  const getInventoryStatus = (units) => {
    if (units < 10) return { label: 'Critical', color: 'bg-red-500' };
    if (units < 20) return { label: 'Low', color: 'bg-yellow-500' };
    return { label: 'Good', color: 'bg-emerald-500' };
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card group">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Total Donors</p>
              <p className="stat-value">{totalDonors}</p>
              <p className="stat-change positive">+{eligibleDonors} eligible</p>
            </div>
            <div className="stat-icon bg-gradient-to-br from-rose-500 to-red-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="stat-card group">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Blood Units</p>
              <p className="stat-value">{totalUnits}</p>
              <p className="stat-change neutral">8 types available</p>
            </div>
            <div className="stat-icon bg-gradient-to-br from-red-500 to-rose-700">
              <Droplet className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="stat-card group">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Pending Requests</p>
              <p className="stat-value">{requests.filter(r => r.status === 'pending').length}</p>
              <p className="stat-change warning">{requests.filter(r => r.urgency === 'critical').length} critical</p>
            </div>
            <div className="stat-icon bg-gradient-to-br from-amber-500 to-orange-600">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="stat-card group">
          <div className="flex items-start justify-between">
            <div>
              <p className="stat-label">Critical Stock</p>
              <p className="stat-value">{criticalTypes}</p>
              <p className="stat-change warning">Need replenishment</p>
            </div>
            <div className="stat-icon bg-gradient-to-br from-purple-500 to-violet-600">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">Blood Inventory</h2>
          <button className="btn-secondary">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {inventory.map(item => {
            const status = getInventoryStatus(item.units);
            return (
              <div key={item.bloodType} className="inventory-card group">
                <div className="flex items-center justify-between mb-3">
                  <span className="blood-type-badge">{item.bloodType}</span>
                  <span className={`status-badge ${status.color}`}>{status.label}</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="inventory-units">{item.units}</span>
                  <span className="inventory-label">units</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${status.color}`}
                    style={{ width: `${Math.min((item.units / 60) * 100, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Requests */}
      <div className="card">
        <h2 className="section-title mb-6">Recent Blood Requests</h2>
        <div className="space-y-3">
          {requests.slice(0, 3).map(request => (
            <div key={request.id} className="request-item group">
              <div className="flex items-center gap-4 flex-1">
                <div className={`urgency-indicator ${
                  request.urgency === 'critical' ? 'bg-red-500' :
                  request.urgency === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="request-patient">{request.patient}</p>
                    <span className="blood-type-tag">{request.bloodType}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {request.hospital}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      {request.units} units
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`request-status ${request.status === 'completed' ? 'completed' : 'pending'}`}>
                  {request.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
