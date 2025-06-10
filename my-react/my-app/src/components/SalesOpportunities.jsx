// src/components/SalesOpportunities.jsx
import React, { useState, useEffect } from 'react';
import {
  getAllOpportunities,
  addOpportunity,
  deleteOpportunity,
} from '../services/opportunityService';

const SalesOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [form, setForm] = useState({
    customerName: '',
    dealValue: '',
    status: 'New',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const response = await getAllOpportunities();
      setOpportunities(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to load opportunities.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addOpportunity(form);
      setForm({ customerName: '', dealValue: '', status: 'New' });
      setSuccessMessage('Opportunity added successfully!');
      fetchOpportunities();
    } catch (error) {
      setError('Failed to add opportunity.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteOpportunity(id);
      setSuccessMessage('Opportunity deleted successfully!');
      fetchOpportunities();
    } catch (error) {
      setError('Failed to delete opportunity.');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Sales Opportunities</h3>

      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm mb-4">
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            name="customerName"
            placeholder="Enter customer name"
            value={form.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Deal Value</label>
          <input
            type="number"
            className="form-control"
            name="dealValue"
            placeholder="Enter deal value"
            value={form.dealValue}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          Add Opportunity
        </button>
      </form>

      <ul className="list-group">
        {opportunities.map((op) => (
          <li
            key={op.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{op.customerName}</strong> — ${op.dealValue} —{' '}
              <span className="badge bg-secondary">{op.status}</span>
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDelete(op.id)}
              disabled={loading}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesOpportunities;
