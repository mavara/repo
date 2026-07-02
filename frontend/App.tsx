import React, { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, Users, UserPlus, TerminalSquare, Menu, X } from 'lucide-react';
import { ViewState, Employee } from './types';
import { api } from './services/mockApi';
import { Dashboard } from './components/Dashboard';
import { EmployeeDirectory } from './components/EmployeeDirectory';
import { AddEmployee } from './components/AddEmployee';
import { ApiDocumentation } from './components/ApiDocumentation';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    const response = await api.getAllEmployees();
    if (response.data) {
      setEmployees(response.data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEmployeeAdded = () => {
    fetchEmployees();
    setCurrentView('directory');
  };

  const NavItem = ({ view, icon, label }: { view: ViewState, icon: React.ReactNode, label: string }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => { setCurrentView(view); setIsMobileMenuOpen(false); }}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive 
            ? 'bg-primary text-white' 
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
        }`}
      >
        <span className={`mr-3 ${isActive ? 'text-white' : 'text-slate-400'}`}>{icon}</span>
        {label}
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center text-primary font-bold text-xl">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-2">
            <span className="text-white text-lg">N</span>
          </div>
          NexusHR
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-500">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isMobileMenuOpen ? 'block' : 'hidden'} 
        md:block w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0
        fixed md:sticky top-[73px] md:top-0 h-[calc(100vh-73px)] md:h-screen z-10 overflow-y-auto
      `}>
        <div className="p-6 hidden md:flex items-center text-primary font-bold text-2xl border-b border-slate-100">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mr-3 shadow-sm">
            <span className="text-white text-xl">N</span>
          </div>
          NexusHR
        </div>
        <nav className="p-4 space-y-1">
          <NavItem view="dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem view="directory" icon={<Users size={20} />} label="Directory" />
          <NavItem view="add" icon={<UserPlus size={20} />} label="Add Employee" />
          
          <div className="pt-6 mt-6 border-t border-slate-100">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Developers</p>
            <NavItem view="api-docs" icon={<TerminalSquare size={20} />} label="API Documentation" />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto">
          {currentView === 'dashboard' && <Dashboard employees={employees} isLoading={isLoading} />}
          {currentView === 'directory' && <EmployeeDirectory employees={employees} isLoading={isLoading} />}
          {currentView === 'add' && <AddEmployee onSuccess={handleEmployeeAdded} />}
          {currentView === 'api-docs' && <ApiDocumentation />}
        </div>
      </main>
    </div>
  );
};

export default App;
