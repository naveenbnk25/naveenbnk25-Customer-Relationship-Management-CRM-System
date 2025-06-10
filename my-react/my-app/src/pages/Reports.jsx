import React, { useEffect, useState } from 'react';
import { getReports, createReport, deleteReport } from '../services/reportservice';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [title, setTitle] = useState('');
  const [filtersUsed, setFiltersUsed] = useState('');
  const [reportType, setReportType] = useState('Summary');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get the user role and user ID from localStorage
  const userRole = localStorage.getItem("useRole");
  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  // Fetch all reports from the API
  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getReports();
      setReports(response.data);
    } catch (err) {
      setError('Failed to fetch reports');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Handle report creation
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !filtersUsed || !reportType) {
      alert('Please fill in all fields.');
      return;
    }
  
    // Create the report data
    const newReport = {
      userId: Number(userId),  // Include user object with userId
      title,
      reportType,
      filtersUsed,
    };
  
    try {
      console.log('Submitting report:', newReport); 
      await createReport(newReport);  // Pass the correct structure to the backend
      setTitle('');
      setFiltersUsed('');
      setReportType('Summary');
      fetchReports();  // Re-fetch reports after adding a new one
    } catch (err) {
      console.error('Failed to create report:', err);
      setError('Failed to create report');
    }
  };
  
  // Handle report deletion
  const handleDelete = async (id) => {
    try {
      await deleteReport(id);
      fetchReports();
    } catch (err) {
      console.error('Failed to delete report:', err);
      setError('Failed to delete report');
    }
  };

  // Search functionality
  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.filtersUsed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Reports</h2>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by title or filters..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Only Admin can create reports */}
      {userRole === "admin" && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter report title"
            />
          </div>

          <div className="form-group mt-2">
            <label>Filters Used</label>
            <textarea
              className="form-control"
              value={filtersUsed}
              onChange={(e) => setFiltersUsed(e.target.value)}
              placeholder="Enter filters used"
            />
          </div>

          <div className="form-group mt-2">
            <label>Report Type</label>
            <select
              className="form-control"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
    <option value="performance">Performance</option>
    <option value="sales">Sales</option>
    <option value="interactions">Interactions</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Create Report
          </button>
        </form>
      )}

      {/* Error message */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {/* List of reports */}
      {loading ? (
        <div>Loading reports...</div>
      ) : (
        <ul className="list-group mt-4">
          {filteredReports.map((report) => (
            <li key={report.reportId} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{report.title}</h5>
                <p>Filters: {report.filtersUsed}</p>
                <p>Type: {report.reportType}</p>
                <small>Created At: {new Date(report.createdAt).toLocaleString()}</small>
              </div>
              {userRole === "admin" && (
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(report.reportId)}>
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Report;
