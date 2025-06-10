// src/components/NotificationBell.jsx
import React from 'react';
import PropTypes from 'prop-types';

const NotificationBell = ({ count }) => {
  return (
    <div className="position-relative">
      {/* Make sure Bootstrap Icons are loaded in your app */}
      <i className="bi bi-bell" style={{ fontSize: '1.5rem' }}></i>
      {count > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {count}
        </span>
      )}
    </div>
  );
};

NotificationBell.propTypes = {
  count: PropTypes.number.isRequired,
};

export default NotificationBell;
