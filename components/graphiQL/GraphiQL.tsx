'use client';

import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { JSONTree } from 'react-json-tree';
import { useTranslations } from 'next-intl';

interface Header {
  key: string;
  value: string;
}

interface GraphQLResponse {
  status: number;
  body: unknown;
}

interface GraphiQLClientProps {
  initialEndpoint?: string;
  initialSDLUrl?: string;
}

export const GraphiQL = ({
  initialEndpoint = 'https://swapi.dev/api',
  initialSDLUrl = '',
}: GraphiQLClientProps) => {
  const t = useTranslations('Graph');

  const [endpointUrl, setEndpointUrl] = useState<string>(initialEndpoint);
  const [sdlUrl, setSdlUrl] = useState<string>(initialSDLUrl || `${initialEndpoint}?sdl`);
  const [headers, setHeaders] = useState<Header[]>([]);
  const [query, setQuery] = useState<string>('');
  const [variables, setVariables] = useState<string>('');
  const [response, setResponse] = useState<GraphQLResponse | null>(null);

  const handleExecute = async () => {
    try {
      const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers.reduce(
            (acc, header) => ({ ...acc, [header.key]: header.value }),
            {}
          ),
        },
        body: JSON.stringify({
          query,
          variables: JSON.parse(variables || '{}'),
        }),
      });

      const data = await response.json();

      setResponse({
        status: response.status,
        body: data,
      });
    } catch (error) {
      setResponse({
        status: 500,
        body: { error: 'Something went wrong' },
      });
      console.error('Error executing GraphQL query:', error);
    }
  };

  const addHeader = () => setHeaders([...headers, { key: '', value: '' }]);

  return (
    <div className="graphql-client m-auto w-[80%]">
      <div>
        <div>
          <label>Endpoint URL:</label>
          <input
            type="text"
            value={endpointUrl}
            onChange={(e) => setEndpointUrl(e.target.value)}
            placeholder="Enter GraphQL Endpoint URL"
          />
        </div>
        <div>
          <label>SDL URL:</label>
          <input
            type="text"
            value={sdlUrl}
            onChange={(e) => setSdlUrl(e.target.value)}
            placeholder="Enter SDL URL"
          />
        </div>
        <div>
          <label>{t('headers')}:</label>
          {headers.map((header, index) => (
            <div key={index}>
              <input
                type="text"
                value={header.key}
                placeholder="Header Key"
                onChange={(e) => {
                  const newHeaders = [...headers];
                  newHeaders[index].key = e.target.value;
                  setHeaders(newHeaders);
                }}
              />
              <input
                type="text"
                value={header.value}
                placeholder="Header Value"
                onChange={(e) => {
                  const newHeaders = [...headers];
                  newHeaders[index].value = e.target.value;
                  setHeaders(newHeaders);
                }}
              />
            </div>
          ))}
          <button className="btn btn-accent-secondary" onClick={addHeader}>
            {t('addHead')}
          </button>
        </div>
        <div>
          <label>{t('query')}:</label>
          <MonacoEditor
            height="200px"
            language="graphql"
            value={query}
            onChange={(newValue) => setQuery(newValue || '')}
            data-testid="query-editor"
          />
        </div>
        <div>
          <label>{t('var')}:</label>
          <MonacoEditor
            height="100px"
            language="json"
            value={variables}
            onChange={(newValue) => setVariables(newValue || '')}
            data-testid="variables-editor"
          />
        </div>
        <div>
          <button className="btn btn-accent-secondary" onClick={handleExecute}>
            {t('exec')}
          </button>
        </div>
      </div>
      <div>
        <label>{t('res')}:</label>
        {response && (
          <div>
            <p>Status: {response.status}</p>
            <JSONTree data={response.body} />
          </div>
        )}
      </div>
    </div>
  );
};
