'use server';

export async function handleRequest(
  method: string,
  endpoint: string,
  headers: Record<string, string>,
  requestBody?: string
) {
  try {
    const response = await fetch(endpoint, {
      method,
      headers,
      body: ['POST', 'PUT', 'PATCH'].includes(method) ? requestBody : null,
    });

    const responseStatus = response.status;
    const responseBody = await response.text();

    return {
      status: responseStatus,
      body: responseBody,
    };
  } catch (error) {
    console.error('Error in handleRequest:', error);
    return {
      status: null,
      body: 'An error occurred while sending the request.',
    };
  }
}
