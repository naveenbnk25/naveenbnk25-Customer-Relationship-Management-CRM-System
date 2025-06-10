import React, { useEffect, useState } from 'react';
import { getAllSales, deleteSale } from '../services/salesService';

const SalesPipeline = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await getAllSales();
        console.log("Fetched sales from backend:", response.data);
        setSales(response.data);
      } catch (err) {
        console.error("Sales pipeline error", err);
        setError("Failed to fetch sales.");
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this sale?")) {
      try {
        await deleteSale(id);
        setSales(sales.filter((sale) => sale.id !== id));
      } catch (error) {
        console.error("Error deleting sale:", error);
        alert("Failed to delete sale.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-3">Sales Pipeline</h4>

          {loading && <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>}
          {error && <div className="alert alert-danger">{error}</div>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id}>
                      <td>{sale.id}</td>
                      <td>{sale.customerName}</td>
                      <td>{sale.product}</td>
                      <td>${sale.amount.toLocaleString()}</td>
                      <td>{new Date(sale.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(sale.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesPipeline;
