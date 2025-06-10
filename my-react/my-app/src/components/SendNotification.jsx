import React, { useState } from 'react';
import axios from 'axios';

const SendNotification = () => {
  const [formData, setFormData] = useState({
    userId: '',
    recipientId: '',
    message: '',
    status: 'unread',
    type: 'EMAIL', // or 'SMS'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      // Log the data to be sent
      console.log("Sending notification data:", formData);
      
      const response = await axios.post('http://localhost:8080/api/notifications/send', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        alert('Notification sent successfully!');
        // Reset the form after successful submission
        setFormData({
          userId: '',
          recipientId: '',
          message: '',
          status: 'unread',
          type: 'EMAIL',
        });
      }
    } catch (err) {
      console.error('Sending notification failed', err);
      setError('Failed to send notification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
      <h4 className="mb-3">Send Notification</h4>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <input
          type="number"
          name="userId"
          className="form-control"
          placeholder="Sender User ID"
          onChange={handleChange}
          value={formData.userId}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="number"
          name="recipientId"
          className="form-control"
          placeholder="Recipient User ID"
          onChange={handleChange}
          value={formData.recipientId}
          required
        />
      </div>

      <div className="mb-3">
        <textarea
          name="message"
          className="form-control"
          placeholder="Message"
          onChange={handleChange}
          value={formData.message}
          required
        />
      </div>

      <div className="mb-3">
        <select
          name="type"
          className="form-select"
          onChange={handleChange}
          value={formData.type}
        >
          <option value="EMAIL">Email</option>
          <option value="SMS">SMS</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default SendNotification;
