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
    <form onSubmit={handleSubmit}>
      <input
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Customer Name"
        required
      />
      <input
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="Product"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="Closed">Closed</option>
        <option value="Lost">Lost</option>
      </select>
      <button type="submit">Add Sale</button>
    </form>
  );
};

export default AddSaleForm;
