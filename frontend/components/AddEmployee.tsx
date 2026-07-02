import React, { useState } from 'react';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../services/mockApi';
import { Employee } from '../types';

interface AddEmployeeProps {
  onSuccess: () => void;
}

export const AddEmployee: React.FC<AddEmployeeProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    empId: '',
    firstName: '',
    lastName: '',
    department: 'Engineering',
    address: '',
    salary: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear error on typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!formData.empId || !formData.firstName || !formData.lastName || !formData.salary) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    const salaryNum = parseFloat(formData.salary);
    if (isNaN(salaryNum) || salaryNum <= 0) {
      setError('Please enter a valid salary amount.');
      setIsSubmitting(false);
      return;
    }

    const newEmployeeData = {
      ...formData,
      salary: salaryNum
    };

    const response = await api.createEmployee(newEmployeeData);

    if (response.error) {
      setError(response.error);
    } else {
      setSuccess(true);
      setFormData({ empId: '', firstName: '', lastName: '', department: 'Engineering', address: '', salary: '' });
      setTimeout(() => {
        onSuccess(); // Refresh list and maybe navigate away
      }, 1500);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-sm rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg leading-6 font-medium text-slate-900">Add New Employee</h3>
          <p className="mt-1 text-sm text-slate-500">Create a new employee record in the system.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
              <p className="text-sm text-green-700">Employee created successfully!</p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            <div>
              <label htmlFor="empId" className="block text-sm font-medium text-slate-700">Employee ID *</label>
              <div className="mt-1">
                <input type="text" name="empId" id="empId" value={formData.empId} onChange={handleChange}
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-slate-300 rounded-md p-2 border" placeholder="e.g. EMP-101" />
              </div>
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-slate-700">Department</label>
              <div className="mt-1">
                <select id="department" name="department" value={formData.department} onChange={handleChange}
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-slate-300 rounded-md p-2 border bg-white">
                  <option>Engineering</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                  <option>HR</option>
                  <option>Product</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">First Name *</label>
              <div className="mt-1">
                <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange}
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-slate-300 rounded-md p-2 border" />
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">Last Name *</label>
              <div className="mt-1">
                <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange}
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-slate-300 rounded-md p-2 border" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-slate-700">Address</label>
              <div className="mt-1">
                <input type="text" name="address" id="address" value={formData.address} onChange={handleChange}
                  className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-slate-300 rounded-md p-2 border" placeholder="Full address" />
              </div>
            </div>

            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-slate-700">Annual Salary ($) *</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-500 sm:text-sm">$</span>
                </div>
                <input type="number" name="salary" id="salary" value={formData.salary} onChange={handleChange}
                  className="focus:ring-primary focus:border-primary block w-full pl-7 sm:text-sm border-slate-300 rounded-md p-2 border" placeholder="0.00" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="-ml-1 mr-2 h-4 w-4" />
                  Save Record
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
