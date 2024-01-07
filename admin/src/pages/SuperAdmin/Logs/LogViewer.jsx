import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Log.css'

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/api/logs');
        setLogs(response.data.logs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, []);

  const handleSearch = () => {
    const filteredLogs = logs.filter((log) =>
      log.message.toLowerCase().includes(search.toLowerCase())
    );
    setLogs(filteredLogs);
  };

  const handleResetSearch = async () => {
    setSearch('');
    const response = await axios.get('/api/logs');
    setLogs(response.data.logs);
  };

  return (
    <div className="logContainer container mx-auto mt-8">
      <h1 className="logHeading text-3xl font-bold mb-4 text-blue-700">Log Viewer</h1>
      <div className="logBttn flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search logs"
          className="p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded focus:outline-none"
          onClick={handleResetSearch}
        >
          Reset
        </button>
      </div>

      <table className="logTable w-full border border-collapse">
        <thead>
          <tr className="logTableRow bg-blue-200">
            <th className="logTableHead py-2 px-4 border">Message</th>
            <th className="logTableHead py-2 px-4 border">Created By</th>
            <th className="logTableHead py-2 px-4 border">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log._id} className="logTableRow hover:bg-gray-100">
              <td className="logTableData py-2 px-4 border">{log.message}</td>
              <td className="logTableData py-2 px-4 border">{log.createdBy}</td>
              <td className="logTableData py-2 px-4 border">{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogViewer;
