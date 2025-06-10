// src/components/SalesForecast.jsx
import React, { useEffect, useState } from 'react';
import { getSalesForecast } from '../services/salesService';

const SalesForecast = () => {
  const [forecast, setForecast] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await getSalesForecast();
        setForecast(response.data); // Assuming response.data is just a number
      } catch (error) {
        console.error('Error fetching forecast:', error);
        setError('Failed to load forecast data.');
      } finally {
        setLoading(false);
      }
    };
    fetchForecast();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title">Sales Forecast</h4>
          {loading && <div className="alert alert-info">Loading forecast...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && (
            <p className="fs-5">
              Estimated Forecast: <strong>${forecast.toLocaleString()}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesForecast;
