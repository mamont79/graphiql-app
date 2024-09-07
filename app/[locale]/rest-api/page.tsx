'use client';
import { useState } from 'react';

export default function RestApi() {
  const [method, setMethod] = useState('GET');
  const [endpoint, setEndpoint] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [variables, setVariables] = useState([{ key: '', value: '' }]);
  const [activeTab, setActiveTab] = useState('body');

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
      <h1 className="text-3xl mt-8 font-bold text-center">REST Client</h1>
      <div className="flex flex-col items-center justify-center my-4">
        <div className="wrapper flex items-center w-full justify-center gap-4 mt-4">
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
          <div className="flex items-center flex-grow justify-center">
            <label htmlFor="endpoint" className="mr-2 text-lg">
              Endpoint:
            </label>
            <input
              id="endpoint"
              type="text"
              placeholder="https://api.example.com"
              className="w-full p-2 border border-gray-300 rounded w-80"
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
              className="p-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
        <div className="wrapper w-full border mt-4 border-gray-300 rounded">
          {' '}
          <div className="border border-gray-300 border-t-0 border-x-0">
            <button
              onClick={() => setActiveTab('body')}
              className={`p-2 px-6 ${activeTab === 'body' ? 'bg-blue-500 text-white' : ''} `}
            >
              Body
            </button>
            <button
              onClick={() => setActiveTab('headers')}
              className={`p-2 px-6 ${activeTab === 'headers' ? 'bg-blue-500 text-white' : ''} `}
            >
              Headers
            </button>
            <button
              onClick={() => setActiveTab('variables')}
              className={`p-2 px-6 ${activeTab === 'variables' ? 'bg-blue-500 text-white' : ''} `}
            >
              Variables
            </button>
          </div>
          {activeTab === 'body' && (
            <div className="flex flex-col items-center justify-center">
              <textarea
                placeholder="Enter JSON or text here"
                className="w-full wrapper p-2 rounded w-4/5 h-40"
                value={requestBody}
                onChange={handleRequestBodyChange}
              />
            </div>
          )}
          {activeTab === 'headers' && (
            <div className="wrapper w-full flex flex-col items-center justify-center my-4 px-4 w-full">
              {headers.map((header, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between space-x-2 mb-2 w-4/5"
                >
                  <input
                    type="text"
                    placeholder="Header Key"
                    className="p-2 border border-gray-300 rounded w-full"
                    value={header.key}
                    onChange={(e) => handleHeaderChange(index, 'key', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Header Value"
                    className="p-2 border border-gray-300 rounded w-full"
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
                className="self-start p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Header
              </button>
            </div>
          )}
          {activeTab === 'variables' && (
            <div className="wrapper w-full flex flex-col items-center justify-center px-4 my-4 w-full">
              {variables.map((variable, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between space-x-2 mb-2 w-4/5"
                >
                  <input
                    type="text"
                    placeholder="Variable Key"
                    className="p-2 border border-gray-300 rounded w-full"
                    value={variable.key}
                    onChange={(e) => handleVariableChange(index, 'key', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Variable Value"
                    className="p-2 border border-gray-300 rounded w-full"
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
                className="self-start p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Variable
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="wrapper flex flex-col items-center justify-center my-4 mx-auto w-full">
        <h2 className="text-xl font-semibold mb-2">Response</h2>
        <div className="w-full">
          <div className="mb-2">
            <strong>Status:</strong> {responseStatus !== null ? responseStatus : 'N/A'}
          </div>
          <div>
            <strong>Body:</strong>
            <pre className="min-h-20 mt-2 p-2 border border-gray-300 rounded bg-gray-50 whitespace-pre-wrap">
              {responseBody}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
