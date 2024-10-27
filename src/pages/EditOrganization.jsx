// src/pages/EditOrganization.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, AlertCircle, Loader2, Building2, Globe, 
  Users, MessageCircle, Check, ChevronDown, X 
} from 'lucide-react';
import { Combobox, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const EditOrganization = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [tags, setTags] = useState([]);
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const [isLoadingOrg, setIsLoadingOrg] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    niche: [],
    twitter: '',
    poc1: '',
    poc2: '',
    poc3: '',
    website_link: '',
    telegram: '',
    discord: '',
  });

  // Fetch organization details
  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const res = await fetch(`https://cheesecake-df01eceba95f.herokuapp.com/api/auth/organizations/${id}`, {
          headers: {
            'x-access-code': '1234567890'
          }
        });
        if (!res.ok) throw new Error('Failed to fetch organization');
        const data = await res.json();
        
        // Convert niche string to array for multi-select
        setFormData({
          ...data,
          niche: data.niche ? data.niche.split(', ').map(item => item.trim()) : []
        });
      } catch (err) {
        setError('Failed to fetch organization details');
      } finally {
        setIsLoadingOrg(false);
      }
    };

    fetchOrganization();
  }, [id]);

  // Fetch tags for the dropdown
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('https://cheesecake-df01eceba95f.herokuapp.com/api/auth/tags', {
          headers: {
            'x-access-code': '1234567890'
          }
        });
        const data = await res.json();
        setTags(data);
      } catch (err) {
        console.error('Error fetching tags:', err);
      } finally {
        setIsLoadingTags(false);
      }
    };

    fetchTags();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        niche: formData.niche.join(', ') // Join array into comma-separated string
      };

      const res = await fetch(`https://cheesecake-df01eceba95f.herokuapp.com/api/auth/admin/organizations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-code': '1234567890'
        },
        body: JSON.stringify(submitData)
      });

      if (!res.ok) throw new Error('Failed to update organization');

      navigate('/dashboard/organizations');
    } catch (err) {
      setError('Failed to update organization. Please try again.');
      window.scrollTo(0, 0); // Scroll to top to show error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoadingOrg) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // MultiSelect component for tags
  const MultiSelectTags = ({ tags, value, onChange }) => {
    const [query, setQuery] = useState('');

    const filteredTags = query === ''
      ? tags
      : tags.filter((tag) =>
          tag.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

    return (
      <div className="relative">
        <Combobox value={value} onChange={onChange} multiple>
          <div className="relative">
            <div className="relative w-full">
              <div className="w-full min-h-[42px] border border-gray-300 rounded-lg bg-white px-3 py-2 flex flex-wrap gap-2">
                {value.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        onChange(value.filter((t) => t !== tag));
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <Combobox.Input
                  className="border-none p-0 focus:ring-0 text-sm flex-1 min-w-[120px]"
                  placeholder={value.length === 0 ? "Select niches..." : ""}
                  onChange={(event) => setQuery(event.target.value)}
                  displayValue={() => ""}
                />
              </div>
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2">
                <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery('')}
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                {filteredTags.length === 0 && query !== '' ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredTags.map((tag) => (
                    <Combobox.Option
                      key={tag.id}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-blue-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={tag.name}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {tag.name}
                          </span>
                          {selected && (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? 'text-white' : 'text-blue-600'
                              }`}
                            >
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/dashboard/organizations')}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Organization</h1>
          <p className="text-gray-500 mt-1">Update organization details</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Organization Details</h2>
                  <p className="text-sm text-gray-500">Basic information about the organization</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter organization name"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter organization description"
                  />
                </div>

                {/* Niche/Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Niche *
                  </label>
                  {isLoadingTags ? (
                    <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 animate-pulse">
                      <div className="h-6 bg-gray-200 rounded"></div>
                    </div>
                  ) : (
                    <MultiSelectTags
                      tags={tags}
                      value={formData.niche}
                      onChange={(selectedTags) => setFormData(prev => ({ ...prev, niche: selectedTags }))}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Social Links Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Social Links</h2>
                  <p className="text-sm text-gray-500">Organization's social media presence</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Twitter Link
                  </label>
                  <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://twitter.com/handle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="text"
                    name="website_link"
                    value={formData.website_link}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Side Section */}
          <div className="space-y-6">
            {/* POCs Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Points of Contact</h2>
                  <p className="text-sm text-gray-500">Key team members</p>
                </div>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((num) => (
                  <div key={num}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      POC {num}
                    </label>
                    <input
                      type="text"
                      name={`poc${num}`}
                      value={formData[`poc${num}`]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`@username`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Communication Channels */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Communication</h2>
                  <p className="text-sm text-gray-500">Community channels</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telegram
                  </label>
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="@channel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discord
                  </label>
                  <input
                    type="text"
                    name="discord"
                    value={formData.discord}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="discord/channel"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard/organizations')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Updating...
              </>
            ) : (
              'Update Organization'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrganization;