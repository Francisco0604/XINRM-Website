import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  // CORS Preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    let data: any = {};
    if (event.headers['content-type']?.includes('application/json')) {
      data = JSON.parse(event.body || '{}');
    } else {
      // URL Encoded or multi-part parsed
      const params = new URLSearchParams(event.body || '');
      for (const [key, value] of params.entries()) {
        data[key] = value;
      }
    }

    console.log('=== NEW ADMISSION APPLICATION RECEIVED ===');
    console.log('Reference ID:', data.applicationRefId);
    console.log('Candidate Name:', data.fullName);
    console.log('Email:', data.email);
    console.log('Phone:', data.contactNumber);
    console.log('Category:', data.category);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Application recorded successfully',
        applicationRefId: data.applicationRefId || 'XINRM-CONFIRMED',
        timestamp: new Date().toISOString()
      })
    };
  } catch (error: any) {
    console.error('Submission Processing Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};
