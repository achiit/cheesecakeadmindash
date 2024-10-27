// src/pages/Dashboard.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { OrganizationList, OrganizationDetails } from '../components/organizations';
import AddOrganization from './AddOrganization';
import EditOrganization from './EditOrganization';
import Tags from '../components/Tags';
import Users from '../components/Users';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <main>
          <Routes>
            <Route path="users" element={<Users />} />
            <Route path="organizations" element={<OrganizationList />} />
            <Route path="organizations/new" element={<AddOrganization />} />
            <Route path="organizations/:id/edit" element={<EditOrganization />} />
            <Route path="organizations/:id" element={<OrganizationDetails />} />
            <Route path="tags" element={<Tags />} />
            <Route path="" element={<Navigate to="users" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;