# NexusHR API List

Based on the application code (specifically `services/mockApi.ts` and `components/ApiDocumentation.tsx`), here is the list of available APIs:

### 1. Retrieve All Employees
* **Method:** `GET`
* **Endpoint:** `/api/v1/employees`
* **Description:** Retrieves a list of all employee records.
* **Response:** Array of Employee objects.

### 2. Retrieve Single Employee
* **Method:** `GET`
* **Endpoint:** `/api/v1/employees/:id`
* **Description:** Retrieves details of a specific employee by their internal ID.
* **Response:** Single Employee object.

### 3. Create Employee
* **Method:** `POST`
* **Endpoint:** `/api/v1/employees`
* **Description:** Creates a new employee record.
* **Request Body:**
  ```json
  {
    "empId": "string",
    "firstName": "string",
    "lastName": "string",
    "address": "string",
    "department": "string",
    "salary": "number"
  }
  ```
* **Response:** The created Employee object including generated `id` and `createdAt` timestamp.
