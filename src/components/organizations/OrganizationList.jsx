// src/components/organizations/OrganizationList.jsx
// src/components/organizations/OrganizationList.jsx
import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { Building2, Globe, Users, Plus, Pencil, Trash2, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import OrganizationForm from './OrganizationForm';

const OrganizationList = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const res = await fetch('https://cheesecake-df01eceba95f.herokuapp.com/api/auth/organizations', {
        headers: {
          'x-access-code': '1234567890'
        }
      });
      const data = await res.json();
      setOrganizations(data);
    } catch (err) {
      setError('Failed to fetch organizations');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedOrg(null);
    setIsSubmitting(false);
    setError('');
  };

  const handleCreate = async (formData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('https://cheesecake-df01eceba95f.herokuapp.com/api/auth/admin/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': '1234567890'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to create organization');

      await fetchOrganizations();
      handleCloseModals();
    } catch (err) {
      setError('Failed to create organization');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (formData) => {
    if (!selectedOrg) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`https://cheesecake-df01eceba95f.herokuapp.com/api/auth/admin/organizations/${selectedOrg.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': '1234567890'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Failed to update organization');

      await fetchOrganizations();
      handleCloseModals();
    } catch (err) {
      setError('Failed to update organization');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedOrg) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`https://cheesecake-df01eceba95f.herokuapp.com/api/auth/admin/organizations/${selectedOrg.id}`, {
        method: 'DELETE',
        headers: {
          'x-access-code': '1234567890'
        }
      });

      if (!res.ok) throw new Error('Failed to delete organization');

      setOrganizations(orgs => orgs.filter(org => org.id !== selectedOrg.id));
      setIsDeleteModalOpen(false);
      setSelectedOrg(null);
      setIsSubmitting(false);
    } catch (err) {
      setError('Failed to delete organization');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="fade-in p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
          <p className="text-gray-500 mt-1">Manage organization profiles</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/organizations/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          <span>Add Organization</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      {/* Organizations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{org.name}</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                  {org.niche}
                </span>
              </div>
              
              {/* Action Buttons */}
              <div className="ml-auto flex items-center gap-2">
              <button
  onClick={(e) => {
    e.stopPropagation();
    navigate(`/dashboard/organizations/${org.id}/edit`);
  }}
  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
>
  <Pencil size={16} />
</button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOrg(org);
                    setIsDeleteModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {org.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {org.description}
              </p>
            )}

            <div className="space-y-3">
              {org.twitter && (
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <a 
                    href={org.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {org.twitter.replace('https://twitter.com/', '@')}
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
              
              {(org.poc1 || org.poc2 || org.poc3) && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    POC: {[org.poc1, org.poc2, org.poc3].filter(Boolean).join(', ')}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <button 
                onClick={() => navigate(`/dashboard/organizations/${org.id}`)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1"
              >
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      <Transition appear show={isCreateModalOpen || isEditModalOpen} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-50" 
          onClose={handleCloseModals}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <OrganizationForm
                    initialData={selectedOrg}
                    onSubmit={isEditModalOpen ? handleUpdate : handleCreate}
                    isSubmitting={isSubmitting}
                    onClose={handleCloseModals}
                    title={isEditModalOpen ? 'Edit Organization' : 'Create Organization'}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Delete Confirmation Modal */}
      <Transition appear show={isDeleteModalOpen} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-50" 
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedOrg(null);
            setIsSubmitting(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold text-gray-900"
                      >
                        Delete Organization
                      </Dialog.Title>
                      <p className="mt-2 text-sm text-gray-500">
                        Are you sure you want to delete "{selectedOrg?.name}"? This action cannot be undone.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDeleteModalOpen(false);
                        setSelectedOrg(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 size={16} />
                          Delete Organization
                        </>
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default OrganizationList;

// src/components/organizations/OrganizationList.jsx
// import { useState, useEffect, Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Dialog, Transition } from '@headlessui/react';
// import { 
//   Building2, 
//   Plus, 
//   Pencil, 
//   Trash2, 
//   AlertCircle, 
//   Loader2, 
//   Globe, 
//   Users, 
//   ExternalLink, 
//   ChevronRight 
// } from 'lucide-react';
// import OrganizationForm from './OrganizationForm';

// const OrganizationList = () => {
//   const navigate = useNavigate();
//   const [organizations, setOrganizations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
  
//   // Modal states
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [selectedOrg, setSelectedOrg] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     fetchOrganizations();
//   }, []);

//   const fetchOrganizations = async () => {
//     try {
//       const res = await fetch('https://cheesecake-df01eceba95f.herokuapp.com/api/auth/organizations', {
//         headers: {
//           'x-access-code': '1234567890'
//         }
//       });
//       if (!res.ok) throw new Error('Failed to fetch organizations');
//       const data = await res.json();
//       setOrganizations(data);
//     } catch (err) {
//       setError('Failed to fetch organizations');
//       console.error('Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreate = async (formData) => {
//     setIsSubmitting(true);
//     try {
//       const res = await fetch('https://cheesecake-df01eceba95f.herokuapp.com/api/auth/admin/organizations', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-access-code': '1234567890'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!res.ok) throw new Error('Failed to create organization');

//       await fetchOrganizations();
//       setIsCreateModalOpen(false);
//     } catch (err) {
//       setError('Failed to create organization');
//       console.error('Error:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdate = async (formData) => {
//     if (!selectedOrg) return;
    
//     setIsSubmitting(true);
//     try {
//       const res = await fetch(`https://cheesecake-df01eceba95f.herokuapp.com/api/auth/admin/organizations/${selectedOrg.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-access-code': '1234567890'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!res.ok) throw new Error('Failed to update organization');

//       await fetchOrganizations();
//       setIsEditModalOpen(false);
//       setSelectedOrg(null);
//     } catch (err) {
//       setError('Failed to update organization');
//       console.error('Error:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedOrg) return;
    
//     setIsSubmitting(true);
//     try {
//       const res = await fetch(`https://cheesecake-df01eceba95f.herokuapp.com/api/auth/admin/organizations/${selectedOrg.id}`, {
//         method: 'DELETE',
//         headers: {
//           'x-access-code': '1234567890'
//         }
//       });

//       if (!res.ok) throw new Error('Failed to delete organization');

//       setOrganizations(orgs => orgs.filter(org => org.id !== selectedOrg.id));
//       setIsDeleteModalOpen(false);
//       setSelectedOrg(null);
//     } catch (err) {
//       setError('Failed to delete organization');
//       console.error('Error:', err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="fade-in">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Organizations</h1>
//           <p className="text-gray-500 mt-1">Manage organization profiles</p>
//         </div>
//         <button 
//           onClick={() => setIsCreateModalOpen(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
//         >
//           <Plus size={20} />
//           <span>Add Organization</span>
//         </button>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2">
//           <AlertCircle size={20} />
//           <span>{error}</span>
//         </div>
//       )}

//       {/* Organizations Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {organizations.map((org) => (
//           <div key={org.id} 
//                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 relative group">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
//                 <Building2 className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">{org.name}</h3>
//                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
//                   {org.niche}
//                 </span>
//               </div>
              
//               {/* Action Buttons */}
//               <div className="ml-auto flex items-center gap-2">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedOrg(org);
//                     setIsEditModalOpen(true);
//                   }}
//                   className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
//                   title="Edit organization"
//                 >
//                   <Pencil size={16} />
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     setSelectedOrg(org);
//                     setIsDeleteModalOpen(true);
//                   }}
//                   className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
//                   title="Delete organization"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             </div>

//             {org.description && (
//               <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                 {org.description}
//               </p>
//             )}

//             <div className="space-y-3">
//               {org.twitter && (
//                 <div className="flex items-center gap-2 text-sm">
//                   <Globe className="h-4 w-4 text-gray-400" />
//                   <a 
//                     href={org.twitter}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline flex items-center gap-1"
//                   >
//                     {org.twitter.replace('https://twitter.com/', '@')}
//                     <ExternalLink size={12} />
//                   </a>
//                 </div>
//               )}
              
//               {org.website_link && (
//                 <div className="flex items-center gap-2 text-sm">
//                   <Globe className="h-4 w-4 text-gray-400" />
//                   <a 
//                     href={org.website_link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:underline flex items-center gap-1"
//                   >
//                     {org.website_link.replace(/(^\w+:|^)\/\//, '')}
//                     <ExternalLink size={12} />
//                   </a>
//                 </div>
//               )}
              
//               {(org.poc1 || org.poc2 || org.poc3) && (
//                 <div className="flex items-center gap-2 text-sm">
//                   <Users className="h-4 w-4 text-gray-400" />
//                   <span className="text-gray-600">
//                     POC: {[org.poc1, org.poc2, org.poc3].filter(Boolean).join(', ')}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <div className="mt-4 pt-4 border-t border-gray-100">
//               <button
//                 onClick={() => navigate(`/dashboard/organizations/${org.id}`)}
//                 className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center gap-1 transition-colors"
//               >
//                 View Details
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Create/Edit Modal */}
//       <Transition appear show={isCreateModalOpen || isEditModalOpen} as={Fragment}>
//         <Dialog 
//           as="div" 
//           className="relative z-50" 
//           onClose={() => {
//             setIsCreateModalOpen(false);
//             setIsEditModalOpen(false);
//             setSelectedOrg(null);
//           }}
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
//                   <OrganizationForm
//                     initialData={selectedOrg}
//                     onSubmit={isEditModalOpen ? handleUpdate : handleCreate}
//                     isSubmitting={isSubmitting}
//                     onClose={() => {
//                       setIsCreateModalOpen(false);
//                       setIsEditModalOpen(false);
//                       setSelectedOrg(null);
//                     }}
//                     title={isEditModalOpen ? 'Edit Organization' : 'Create Organization'}
//                   />
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>

//       {/* Delete Confirmation Modal */}
//       <Transition appear show={isDeleteModalOpen} as={Fragment}>
//         <Dialog 
//           as="div" 
//           className="relative z-50" 
//           onClose={() => setIsDeleteModalOpen(false)}
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
//                   <div className="flex items-start gap-4">
//                     <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
//                       <AlertCircle className="h-6 w-6 text-red-600" />
//                     </div>
//                     <div>
//                       <Dialog.Title
//                         as="h3"
//                         className="text-lg font-semibold text-gray-900"
//                       >
//                         Delete Organization
//                       </Dialog.Title>
//                       <p className="mt-2 text-sm text-gray-500">
//                         Are you sure you want to delete "{selectedOrg?.name}"? This action cannot be undone.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex justify-end gap-3">
//                     <button
//                       type="button"
//                       onClick={() => setIsDeleteModalOpen(false)}
//                       className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleDelete}
//                       disabled={isSubmitting}
//                       className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <Loader2 size={16} className="animate-spin" />
//                           Deleting...
//                         </>
//                       ) : (
//                         <>
//                           <Trash2 size={16} />
//                           Delete Organization
//                         </>
//                       )}
//                       </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>

//       {/* Success/Error Toast Messages */}
//       <div className="fixed bottom-4 right-4 flex flex-col gap-2">
//         {/* Success Toast */}
//         <Transition
//           show={!!error}
//           enter="transition ease-out duration-300"
//           enterFrom="transform translate-y-2 opacity-0"
//           enterTo="transform translate-y-0 opacity-100"
//           leave="transition ease-in duration-200"
//           leaveFrom="transform translate-y-0 opacity-100"
//           leaveTo="transform translate-y-2 opacity-0"
//         >
//           <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
//             <AlertCircle size={20} />
//             <p>{error}</p>
//             <button
//               onClick={() => setError('')}
//               className="ml-4 text-red-400 hover:text-red-500"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         </Transition>
//       </div>
//     </div>
//   );
// };

// export default OrganizationList;