import React, { useEffect, useState } from 'react';
import { getNotifications, deleteNotification } from '../services/notificationService';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications()
      .then((res) => {
        // Check if res.data is an array before setting it
        setNotifications(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Notifications error", err);
        setNotifications([]); // Make sure to set an empty array on error
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    deleteNotification(id)
      .then(() => {
        setNotifications(notifications.filter((note) => note.id !== id));
      })
      .catch((err) => console.error("Error deleting notification", err));
  };

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div>
      <h4>Notifications</h4>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul className="list-group">
          {notifications.map((note) => (
            <li key={note.id} className="list-group-item">
              <strong>Sender:</strong> {note.user?.name || "Unknown"} <br />
              <strong>Recipient:</strong> {note.recipient?.name || "Unknown"} <br />
              {note.message} <br />
              <small>{new Date(note.createdAt).toLocaleString()}</small>
              <br />
              <button
                onClick={() => handleDelete(note.id)}
                className="btn btn-danger btn-sm mt-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
