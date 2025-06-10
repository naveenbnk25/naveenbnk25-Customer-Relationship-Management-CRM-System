import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InteractiveDemo = () => {
  // State management
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showModal, setShowModal] = useState(false);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/submit', formData);
      console.log('Form submitted successfully:', response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="interactive-demo">
      <h2>Interactive Demo</h2>
      
      {/* Form Interaction */}
      <form onSubmit={handleSubmit} className="demo-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {/* Data Display */}
      <div className="data-display">
        <h3>Fetched Data</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal Interaction */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Success!</h3>
            <p>Your form has been submitted successfully.</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveDemo; 