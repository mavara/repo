import React from 'react';
import { Code, Server, Globe, Shield } from 'lucide-react';

export const ApiDocumentation: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start">
          <Server className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-2">Developer API Access</h2>
            <p className="text-blue-800 mb-4">
              NexusHR provides a RESTful API for external consumers to integrate employee data into other systems. 
              <strong> Note:</strong> In this demonstration environment, the API is simulated within the browser. In a production deployment, these endpoints would be hosted on a secure backend server (e.g., Node.js, Python) accessible via the internet.
            </p>
            <div className="flex items-center text-sm text-blue-700 font-medium">
              <Globe className="h-4 w-4 mr-1" /> Base URL: <code className="ml-2 bg-blue-100 px-2 py-1 rounded">https://api.nexushr.example.com/v1</code>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-slate-800 border-b pb-2">Endpoints</h3>

        {/* GET All */}
        <EndpointCard 
          method="GET" 
          path="/employees" 
          description="Retrieve a list of all employees."
          response={`{
  "status": 200,
  "data": [
    {
      "id": "1",
      "empId": "EMP-001",
      "firstName": "Sarah",
      "lastName": "Connor",
      "department": "Engineering",
      "salary": 125000,
      "createdAt": "2023-10-27T10:00:00Z"
    }
  ]
}`}
        />

        {/* GET Single */}
        <EndpointCard 
          method="GET" 
          path="/employees/:id" 
          description="Retrieve details of a specific employee by their internal ID."
          response={`{
  "status": 200,
  "data": {
    "id": "1",
    "empId": "EMP-001",
    "firstName": "Sarah",
    "lastName": "Connor",
    "address": "123 Tech Blvd, SF",
    "department": "Engineering",
    "salary": 125000,
    "createdAt": "2023-10-27T10:00:00Z"
  }
}`}
        />

        {/* POST Create */}
        <EndpointCard 
          method="POST" 
          path="/employees" 
          description="Create a new employee record."
          request={`{
  "empId": "EMP-006",
  "firstName": "Alex",
  "lastName": "Wong",
  "address": "999 Data Dr, NY",
  "department": "Data Science",
  "salary": 140000
}`}
          response={`{
  "status": 201,
  "data": {
    "id": "abc123x",
    "empId": "EMP-006",
    "firstName": "Alex",
    "lastName": "Wong",
    "address": "999 Data Dr, NY",
    "department": "Data Science",
    "salary": 140000,
    "createdAt": "2023-10-27T10:05:00Z"
  }
}`}
        />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mt-8">
        <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-slate-600" /> Authentication
        </h3>
        <p className="text-slate-600 text-sm">
          All API requests require an API key to be included in the header.
          <br/><br/>
          <code className="bg-slate-200 px-2 py-1 rounded text-slate-800">Authorization: Bearer YOUR_API_KEY</code>
        </p>
      </div>
    </div>
  );
};

const EndpointCard = ({ method, path, description, request, response }: { method: string, path: string, description: string, request?: string, response: string }) => {
  const methodColor = method === 'GET' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-blue-100 text-blue-800 border-blue-200';
  
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center bg-slate-50">
        <span className={`px-3 py-1 rounded-md text-xs font-bold border ${methodColor} mr-4`}>{method}</span>
        <code className="text-slate-800 font-mono font-semibold">{path}</code>
      </div>
      <div className="p-6">
        <p className="text-slate-600 mb-4">{description}</p>
        
        {request && (
          <div className="mb-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
              <Code className="h-3 w-3 mr-1" /> Request Body
            </h4>
            <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{request}</code>
            </pre>
          </div>
        )}

        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
            <Code className="h-3 w-3 mr-1" /> Example Response
          </h4>
          <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{response}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
