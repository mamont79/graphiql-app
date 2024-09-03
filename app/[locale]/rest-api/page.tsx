'use client';
import { useState } from 'react';

export default function RestApi() {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
  };

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(e.target.value);
  };

  return (
    <main className="flex-1">
      <h1 className="text-3xl my-8 font-bold text-center">REST Client</h1>
      <div className="flex items-center justify-center my-4">
        <label htmlFor="method" className="mr-2 text-lg">
          Method:
        </label>
        <select
          id="method"
          value={method}
          onChange={handleMethodChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
        <div className="flex items-center justify-center my-4">
          <label htmlFor="endpoint" className="mr-2 text-lg">
            Endpoint:
          </label>
          <input
            id="endpoint"
            type="text"
            placeholder="https://api.example.com"
            className="p-2 border border-gray-300 rounded w-80"
            value={endpoint}
            onChange={handleEndpointChange}
          />
        </div>
      </div>
    </main>
  );
}
