// src/pages/NotificationDashboard.js
import React from 'react';
import NotificationList from '../components/NotificationList';
import SendNotification from '../components/SendNotification';

const NotificationDashboard = () => (
  <div>
    <h2>Notification Center</h2>
    <SendNotification />
    <NotificationList />
  </div>
);

export default NotificationDashboard;
