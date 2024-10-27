// // src/components/organizations/OrganizationForm.jsx
// import { useState, useEffect } from 'react';
// import { X, Loader2 } from 'lucide-react';

// const OrganizationForm = ({ 
//   initialData = {}, 
//   onSubmit, 
//   isSubmitting, 
//   onClose, 
//   title 
// }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     niche: '',
//     twitter: '',
//     poc1: '',
//     poc2: '',
//     poc3: '',
//     website_link: '',
//     telegram: '',
//     discord: '',
//     ...initialData
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData(prev => ({ ...prev, ...initialData }));
//     }
//   }, [initialData]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h3 className="text-lg font-semibold text-gray-900">
//           {title}
//         </h3>
//         <button
//           type="button"
//           onClick={onClose}
//           className="text-gray-400 hover:text-gray-500"
//         >
//           <X size={20} />
//         </button>
//       </div>

//       <div className="grid grid-cols-1 gap-6">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Organization Name *
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Enter organization name"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Description *
//           </label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             rows={3}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Enter organization description"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Niche *
//           </label>
//           <input
//             type="text"
//             name="niche"
//             value={formData.niche}
//             onChange={handleChange}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//             placeholder="e.g., Technology, AI, DeFi"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Twitter Link
//             </label>
//             <input
//               type="text"
//               name="twitter"
//               value={formData.twitter}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="https://twitter.com/handle"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Website
//             </label>
//             <input
//               type="text"
//               name="website_link"
//               value={formData.website_link}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="https://example.com"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               POC 1
//             </label>
//             <input
//               type="text"
//               name="poc1"
//               value={formData.poc1}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="@username"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               POC 2
//             </label>
//             <input
//               type="text"
//               name="poc2"
//               value={formData.poc2}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="@username"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               POC 3
//             </label>
//             <input
//               type="text"
//               name="poc3"
//               value={formData.poc3}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="@username"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Telegram
//             </label>
//             <input
//               type="text"
//               name="telegram"
//               value={formData.telegram}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="@channel"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Discord
//             </label>
//             <input
//               type="text"
//               name="discord"
//               value={formData.discord}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
//               placeholder="discord/channel"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end gap-3">
//         <button
//           type="button"
//           onClick={onClose}
//           className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//         >
//           {isSubmitting ? (
//             <>
//               <Loader2 size={16} className="animate-spin" />
//               {initialData.id ? 'Updating...' : 'Creating...'}
//             </>
//           ) : (
//             initialData.id ? 'Update Organization' : 'Create Organization'
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default OrganizationForm;

// src/components/organizations/OrganizationForm.jsx
import { useState, useEffect } from 'react';
import { X, Loader2, AlertCircle } from 'lucide-react';

const OrganizationForm = ({ 
  initialData = {}, 
  onSubmit, 
  isSubmitting, 
  onClose, 
  title 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    niche: '',
    twitter: '',
    poc1: '',
    poc2: '',
    poc3: '',
    website_link: '',
    telegram: '',
    discord: '',
    ...initialData
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return !value ? 'Organization name is required' : value.length < 3 ? 'Name must be at least 3 characters' : '';
      case 'description':
        return !value ? 'Description is required' : value.length < 10 ? 'Description must be at least 10 characters' : '';
      case 'niche':
        return !value ? 'Niche is required' : '';
      case 'twitter':
        return value && !value.startsWith('https://twitter.com/') ? 'Twitter link must start with https://twitter.com/' : '';
      case 'website_link':
        return value && !value.startsWith('http') ? 'Website must start with http:// or https://' : '';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Fields marked with * are required
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Organization Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Organization Name *
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 ${
                errors.name && touched.name
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Enter organization name"
            />
            {errors.name && touched.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.name}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <div className="mt-1">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 ${
                errors.description && touched.description
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Enter organization description"
            />
            {errors.description && touched.description && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.description}
              </p>
            )}
          </div>
        </div>

        {/* Niche */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Niche *
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="niche"
              value={formData.niche}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 ${
                errors.niche && touched.niche
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="e.g., Technology, AI, DeFi"
            />
            {errors.niche && touched.niche && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle size={14} />
                {errors.niche}
              </p>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Twitter Link
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 ${
                  errors.twitter && touched.twitter
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="https://twitter.com/handle"
              />
              {errors.twitter && touched.twitter && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.twitter}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="website_link"
                value={formData.website_link}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-0 ${
                  errors.website_link && touched.website_link
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
                placeholder="https://example.com"
              />
              {errors.website_link && touched.website_link && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.website_link}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* POCs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              POC 1
            </label>
            <input
              type="text"
              name="poc1"
              value={formData.poc1}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="@username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              POC 2
            </label>
            <input
              type="text"
              name="poc2"
              value={formData.poc2}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="@username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              POC 3
            </label>
            <input
              type="text"
              name="poc3"
              value={formData.poc3}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="@username"
            />
          </div>
        </div>

        {/* Communication Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telegram
            </label>
            <input
              type="text"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="@channel"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discord
            </label>
            <input
              type="text"
              name="discord"
              value={formData.discord}
              onChange={handleChange}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="discord/channel"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              {initialData.id ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            initialData.id ? 'Update Organization' : 'Create Organization'
          )}
        </button>
      </div>
    </form>
  );
};

export default OrganizationForm;