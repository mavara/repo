import { Employee, ApiResponse } from '../types';

const DB_KEY = 'nexushr_employees_db';

// Initial mock data to populate the "database" if empty
const INITIAL_DATA: Employee[] = [
  { id: '1', empId: 'EMP-001', firstName: 'Sarah', lastName: 'Connor', address: '123 Tech Blvd, SF', salary: 125000, department: 'Engineering', createdAt: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: '2', empId: 'EMP-002', firstName: 'John', lastName: 'Smith', address: '456 Market St, NY', salary: 95000, department: 'Marketing', createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: '3', empId: 'EMP-003', firstName: 'Emily', lastName: 'Chen', address: '789 Innovation Way, Austin', salary: 110000, department: 'Product', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: '4', empId: 'EMP-004', firstName: 'Michael', lastName: 'Johnson', address: '321 Corporate Dr, Chicago', salary: 85000, department: 'Sales', createdAt: new Date().toISOString() },
  { id: '5', empId: 'EMP-005', firstName: 'Jessica', lastName: 'Davis', address: '654 Startup Ln, Seattle', salary: 135000, department: 'Engineering', createdAt: new Date().toISOString() },
];

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize DB
const initDB = () => {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_DATA));
  }
};

initDB();

/**
 * Simulated API Client
 * In a real application, these would be fetch() calls to a Node.js/Python backend.
 */
export const api = {
  /**
   * GET /api/v1/employees
   * Retrieves all employee records.
   */
  getAllEmployees: async (): Promise<ApiResponse<Employee[]>> => {
    await delay(400); // Simulate network
    try {
      const data = localStorage.getItem(DB_KEY);
      const employees: Employee[] = data ? JSON.parse(data) : [];
      return { data: employees, status: 200 };
    } catch (error) {
      return { error: 'Failed to fetch employees', status: 500 };
    }
  },

  /**
   * GET /api/v1/employees/:id
   * Retrieves a single employee record by internal ID.
   */
  getEmployeeById: async (id: string): Promise<ApiResponse<Employee>> => {
    await delay(300);
    try {
      const data = localStorage.getItem(DB_KEY);
      const employees: Employee[] = data ? JSON.parse(data) : [];
      const employee = employees.find(e => e.id === id);
      
      if (employee) {
        return { data: employee, status: 200 };
      }
      return { error: 'Employee not found', status: 404 };
    } catch (error) {
      return { error: 'Internal server error', status: 500 };
    }
  },

  /**
   * POST /api/v1/employees
   * Creates a new employee record.
   */
  createEmployee: async (employeeData: Omit<Employee, 'id' | 'createdAt'>): Promise<ApiResponse<Employee>> => {
    await delay(600);
    try {
      const data = localStorage.getItem(DB_KEY);
      const employees: Employee[] = data ? JSON.parse(data) : [];
      
      // Basic validation simulation
      if (!employeeData.empId || !employeeData.firstName || !employeeData.lastName) {
        return { error: 'Missing required fields', status: 400 };
      }

      // Check for duplicate Emp ID
      if (employees.some(e => e.empId === employeeData.empId)) {
        return { error: 'Employee ID already exists', status: 409 };
      }

      const newEmployee: Employee = {
        ...employeeData,
        id: Math.random().toString(36).substring(2, 9), // Generate simple ID
        createdAt: new Date().toISOString(),
      };

      employees.push(newEmployee);
      localStorage.setItem(DB_KEY, JSON.stringify(employees));

      return { data: newEmployee, status: 201 };
    } catch (error) {
      return { error: 'Failed to create employee', status: 500 };
    }
  }
};
