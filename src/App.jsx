import { useState, useEffect } from 'react';
import { useMockData } from './hooks/useMockData';
import Layout from './components/Layout';

function App() {
  const [role, setRole] = useState(() => localStorage.getItem('role') || 'teacher');
  const mockData = useMockData();

  useEffect(() => {
    localStorage.setItem('role', role);
  }, [role]);

  return (
    <Layout role={role} setRole={setRole} mockData={mockData} />
  );
}

export default App;
