export interface Employee {
  id: string;
  empId: string;
  firstName: string;
  lastName: string;
  address: string;
  salary: number;
  department: string;
  createdAt: string;
}

export type ViewState = 'dashboard' | 'directory' | 'add' | 'api-docs';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}
