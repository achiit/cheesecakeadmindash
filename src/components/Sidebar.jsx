// import { NavLink } from 'react-router-dom';
// import { Users, Building2, Tags, LogOut } from 'lucide-react';

// const Sidebar = ({ onLogout }) => {
//   const menuItems = [
//     { icon: Users, text: 'Users', path: '/dashboard/users' },
//     { icon: Building2, text: 'Organizations', path: '/dashboard/organizations' },
//     { icon: Tags, text: 'Tags', path: '/dashboard/tags' },
//   ];

//   return (
//     <div className="min-h-screen w-64 bg-[#1E293B] text-white flex flex-col fixed border-r border-gray-800">
//       <div className="p-6 border-b border-gray-800">
//         <h1 className="text-2xl font-bold text-white">Dashboard</h1>
//         <p className="text-sm text-gray-400 mt-1">Admin Portal</p>
//       </div>
      
//       <nav className="flex-1 px-4 py-6">
//         {menuItems.map((item) => (
//           <NavLink
//             key={item.text}
//             to={item.path}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all ${
//                 isActive 
//                   ? 'bg-blue-600 text-white' 
//                   : 'text-gray-300 hover:bg-gray-800'
//               }`
//             }
//           >
//             <item.icon size={20} />
//             <span>{item.text}</span>
//           </NavLink>
//         ))}
//       </nav>

//       <div className="p-4 border-t border-gray-800">
//         <button
//           onClick={onLogout}
//           className="flex items-center gap-3 text-gray-300 hover:text-white w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-all"
//         >
//           <LogOut size={20} />
//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import { NavLink } from 'react-router-dom';
import { Users, Building2, Tags, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const menuItems = [
    { icon: Users, text: 'Users', path: '/dashboard/users' },
    { icon: Building2, text: 'Organizations', path: '/dashboard/organizations' },
    { icon: Tags, text: 'Tags', path: '/dashboard/tags' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-64 bg-[#1E293B] text-white flex flex-col fixed">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Admin Portal</p>
      </div>
      
      <nav className="flex-1 px-4 py-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.text}
            to={item.path}
            end={item.path === '/dashboard/organizations'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.text}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-300 hover:text-white w-full px-4 py-3 rounded-lg hover:bg-gray-800 transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
