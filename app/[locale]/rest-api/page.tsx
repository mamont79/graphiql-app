'use client';
import { useState } from 'react';

export default function RestApi() {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [variables, setVariables] = useState([{ key: '', value: '' }]);

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
  };

  const handleEndpointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoint(e.target.value);
  };

  const handleRequestBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequestBody(e.target.value);
  };

  const handleHeaderChange = (index: number, field: 'key' | 'value', value: string) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index][field] = value;
    setHeaders(updatedHeaders);
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const removeHeader = (index: number) => {
    const updatedHeaders = headers.filter((_, i) => i !== index);
    setHeaders(updatedHeaders);
  };

  const handleVariableChange = (index: number, field: 'key' | 'value', value: string) => {
    const updatedVariables = [...variables];
    updatedVariables[index][field] = value;
    setVariables(updatedVariables);
  };

  const addVariable = () => {
    setVariables([...variables, { key: '', value: '' }]);
  };

  const removeVariable = (index: number) => {
    const updatedVariables = variables.filter((_, i) => i !== index);
    setVariables(updatedVariables);
  };

  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>('');

  const handleSendRequest = async () => {
    try {
      const response = await fetch(endpoint, {
        method,
        headers: headers.reduce(
          (acc, header) => {
            if (header.key && header.value) {
              acc[header.key] = header.value;
            }
            return acc;
          },
          {} as Record<string, string>
        ),
        body: ['POST', 'PUT', 'PATCH'].includes(method) ? requestBody : null,
      });

      setResponseStatus(response.status);
      const responseText = await response.text();
      setResponseBody(responseText);
    } catch (error) {
      setResponseStatus(null);
      setResponseBody('An error occurred while sending the request.');
    }
  };
  return (
    <main className="flex-1">
      <h1 className="text-3xl my-8 font-bold text-center">REST Client</h1>
      <div className="flex flex-col items-center justify-center my-4">
        <div className="flex items-center justify-center my-4 space-y-4">
          <div className="flex items-center justify-center">
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
          </div>
          <div className="flex items-center justify-center">
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
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                console.log(`Sending ${method} request to ${endpoint}`);
                handleSendRequest();
              }}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center my-4 w-full">
          <label htmlFor="requestBody" className="mb-2 text-lg">
            Request Body:
          </label>
          <textarea
            id="requestBody"
            placeholder="Enter JSON or text here"
            className="p-2 border border-gray-300 rounded w-4/5 h-40"
            value={requestBody}
            onChange={handleRequestBodyChange}
          />
        </div>
        <div className="flex flex-col items-center justify-center my-4 w-full">
          <label className="mb-2 text-lg">Headers:</label>
          {headers.map((header, index) => (
            <div
              key={index}
              className="flex items-center justify-center space-x-2 mb-2 w-4/5"
            >
              <input
                type="text"
                placeholder="Header Key"
                className="p-2 border border-gray-300 rounded w-2/5"
                value={header.key}
                onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
              />
              <input
                type="text"
                placeholder="Header Value"
                className="p-2 border border-gray-300 rounded w-2/5"
                value={header.value}
                onChange={(e) => handleHeaderChange(index, 'value', e.target.value)}
              />
              <button
                onClick={() => removeHeader(index)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={addHeader}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Header
          </button>
          <label className="mb-2 text-lg">Variables:</label>
          {variables.map((variable, index) => (
            <div
              key={index}
              className="flex items-center justify-center space-x-2 mb-2 w-4/5"
            >
              <input
                type="text"
                placeholder="Variable Key"
                className="p-2 border border-gray-300 rounded w-2/5"
                value={variable.key}
                onChange={(e) => handleVariableChange(index, 'key', e.target.value)}
              />
              <input
                type="text"
                placeholder="Variable Value"
                className="p-2 border border-gray-300 rounded w-2/5"
                value={variable.value}
                onChange={(e) => handleVariableChange(index, 'value', e.target.value)}
              />
              <button
                onClick={() => removeVariable(index)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addVariable}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add Variable
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center my-4 w-full">
        <h2 className="text-xl font-semibold mb-2">Response</h2>
        <div className="w-4/5">
          <div className="mb-2">
            <strong>Status:</strong> {responseStatus !== null ? responseStatus : 'N/A'}
          </div>
          <div>
            <strong>Body:</strong>
            <pre className="p-2 border border-gray-300 rounded bg-gray-50 whitespace-pre-wrap">
              {responseBody}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
