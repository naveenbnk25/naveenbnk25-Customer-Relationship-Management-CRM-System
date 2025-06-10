import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationForm = () => {
  const [form, setForm] = useState({
    userId: '',
    recipientId: '',
    type: 'EMAIL',
    message: '',
    status: 'unread', // Optional, handled by backend default
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/notifications');
      console.log('Fetched notifications:', res.data);
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      alert('Error fetching notifications!');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!form.recipient || !form.message) {
      alert('Please provide both message and recipient details!');
      return;
    }
  
    if (!form.userId || !form.recipientId) {
      alert('Sender ID and Recipient ID are required!');
      return;
    }
  
    // Status validation (you can add more conditions here if needed)
    if (form.type !== 'EMAIL' && form.type !== 'SMS') {
      alert('Invalid notification type!');
      return;
    }
  
    // Data to be sent to the backend
    const data = {
      userId: form.userId,
      recipientId: form.recipientId,
      type: form.type,
      message: form.message,
    };
  
    // Log the data to the console before sending it
    console.log("Sending notification data:", data);
  
    try {
      const response = await axios.post('http://localhost:8080/api/notifications/send', data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        alert('Notification sent successfully!');
        setForm({ userId: '', recipientId: '', type: 'EMAIL', message: '', recipient: '' });
        fetchNotifications();
      }
    } catch (err) {
      console.error('Error sending notification:', err);
      alert('Failed to send notification!');
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/notifications/delete/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Send Notification</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="number"
          name="userId"
          placeholder="Sender ID"
          value={form.userId}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="recipientId"
          placeholder="Recipient ID"
          value={form.recipientId}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="EMAIL">Email</option>
          <option value="SMS">SMS</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="archived">Archived</option>
        </select>
        <button type="submit" className="btn btn-primary mt-2">
          Send Notification
        </button>
      </form>

      <h3>Notifications</h3>
      <ul className="list-group">
        {notifications.map((n) => (
          <li
            key={n.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              <strong>From:</strong> {n.user?.name || n.user?.userId || 'N/A'} <br />
              <strong>To:</strong> {n.recipient?.name || n.recipient?.customerId || 'N/A'} <br />
              <strong>Message:</strong> {n.message} <br />
              <strong>Status:</strong> {n.status} <br />
              <strong>Type:</strong> {n.type} <br />
              <strong>Time:</strong> {new Date(n.createdAt).toLocaleString()}
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(n.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationForm;
