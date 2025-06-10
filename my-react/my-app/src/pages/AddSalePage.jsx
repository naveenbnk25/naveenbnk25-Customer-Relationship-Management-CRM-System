// src/components/AddSaleForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddSaleForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName.trim()) {
      alert("Customer name is required.");
      return;
    }

    if (!product.trim() || !amount.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const sale = {
      customerName,
      userId: 1, // Replace with session logic when ready
      product,
      amount: parseFloat(amount),
      status,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/sales/add", sale);
      console.log("Sale added:", response.data);
      alert("Sale added successfully!");

      setCustomerName("");
      setProduct("");
      setAmount("");
      setStatus("Pending");
    } catch (error) {
      console.error("Error adding sale:", error.response?.data || error.message);
      alert("Failed to add sale.");
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Add New Sale</h4>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product</label>
          <input
            type="text"
            className="form-control"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Enter product"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Closed">Closed</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Sale
        </button>
      </form>
    </div>
  );
};

export default AddSaleForm;
