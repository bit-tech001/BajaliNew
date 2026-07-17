import React, { useState, useEffect } from 'react';
import { 
  Lock, LayoutDashboard, Building, FolderGit, Image as ImageIcon, BookOpen, 
  Users, HelpCircle, FileText, Settings, ShieldAlert, Plus, Trash2, Edit2, 
  CheckCircle, RefreshCw, LogOut, Check, ChevronRight, UserCheck, Eye
} from 'lucide-react';
import { Property, Service, Project, GalleryItem, Blog, Testimonial, FAQ, TeamMember, AppSettings, Enquiry } from '../types';

interface AdminPanelProps {
  settings: AppSettings;
  setSettings: (settings: AppSettings) => void;
  properties: Property[];
  setProperties: (props: Property[]) => void;
  services: Service[];
  setServices: (srvs: Service[]) => void;
  projects: Project[];
  setProjects: (projs: Project[]) => void;
  blogs: Blog[];
  setBlogs: (blgs: Blog[]) => void;
  faqs: FAQ[];
  setFaqs: (faqs: FAQ[]) => void;
  team: TeamMember[];
  setTeam: (members: TeamMember[]) => void;
  testimonials: Testimonial[];
  setTestimonials: (tst: Testimonial[]) => void;
}

export default function AdminPanel({
  settings, setSettings,
  properties, setProperties,
  services, setServices,
  projects, setProjects,
  blogs, setBlogs,
  faqs, setFaqs,
  team, setTeam,
  testimonials, setTestimonials
}: AdminPanelProps) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Active Panel Tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'properties' | 'enquiries' | 'blogs' | 'faqs' | 'settings'>('dashboard');

  // Enquiries List & Stats
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [analytics, setAnalytics] = useState({
    visitorCount: 0,
    totalProperties: 0,
    pendingEnquiries: 0,
    totalEnquiries: 0,
    blogsCount: 0,
    projectsCount: 0
  });

  // CRUD Creation Form States
  const [propForm, setPropForm] = useState<Partial<Property>>({
    title: '', type: 'Residential', price: '₹', location: '', status: 'Available',
    image: '', description: '', amenities: []
  });
  const [editingPropId, setEditingPropId] = useState<string | null>(null);

  const [blogForm, setBlogForm] = useState<Partial<Blog>>({
    title: '', category: 'Property Tips', excerpt: '', content: '', image: '', readTime: '5 min read'
  });
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const [faqForm, setFaqForm] = useState<Partial<FAQ>>({
    question: '', answer: '', category: 'General'
  });
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);

  const [settingsForm, setSettingsForm] = useState<AppSettings>({ ...settings });

  // Temporary item storage for adding amenities
  const [tempAmenity, setTempAmenity] = useState('');

  // Fetch admin content on mount & active tab changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
      fetchEnquiries();
    }
  }, [isAuthenticated, activeTab]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('/api/analytics');
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (e) {
      console.error('Failed to sync corporate analytics', e);
    }
  };

  const fetchEnquiries = async () => {
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch (e) {
      console.error('Failed to sync user enquiries', e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        // Save simple token to localStorage for convenience
        localStorage.setItem('balaji_session', data.token);
      } else {
        setAuthError(data.message || 'Invalid staff credentials.');
      }
    } catch {
      setAuthError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('balaji_session');
  };

  // --- ENQUIRY ACTIONS ---
  const handleUpdateEnquiryStatus = async (id: string, newStatus: 'Pending' | 'Contacted' | 'Closed') => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchEnquiries();
        fetchAnalytics();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchEnquiries();
        fetchAnalytics();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- PROPERTIES CRUD ACTIONS ---
  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!propForm.title || !propForm.price || !propForm.location) {
      alert('Please fill out all required fields');
      return;
    }

    const payload = {
      ...propForm,
      priceNumeric: parseInt(propForm.price.replace(/[^0-9]/g, '')) || 1000000,
      specs: propForm.specs || { area: '2,500 Sq.Ft.', furnishing: 'Unfurnished' }
    };

    try {
      const url = editingPropId ? `/api/properties/${editingPropId}` : '/api/properties';
      const method = editingPropId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        // Refresh properties in parent
        const updatedPropsRes = await fetch('/api/properties');
        if (updatedPropsRes.ok) {
          const propsData = await updatedPropsRes.json();
          setProperties(propsData);
        }
        // Reset Form
        setPropForm({
          title: '', type: 'Residential', price: '₹', location: '', status: 'Available',
          image: '', description: '', amenities: []
        });
        setEditingPropId(null);
        alert('Property listing saved successfully.');
        fetchAnalytics();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditProp = (p: Property) => {
    setPropForm(p);
    setEditingPropId(p.id);
  };

  const handleDeleteProp = async (id: string) => {
    if (!window.confirm('Delete this property listing?')) return;
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties(properties.filter(p => p.id !== id));
        fetchAnalytics();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- BLOGS CRUD ACTIONS ---
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) {
      alert('Fill in required fields.');
      return;
    }

    const payload = {
      ...blogForm,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    try {
      const url = editingBlogId ? `/api/blogs/${editingBlogId}` : '/api/blogs';
      const method = editingBlogId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const updatedBlogsRes = await fetch('/api/blogs');
        if (updatedBlogsRes.ok) {
          setBlogs(await updatedBlogsRes.json());
        }
        setBlogForm({ title: '', category: 'Property Tips', excerpt: '', content: '', image: '', readTime: '5 min read' });
        setEditingBlogId(null);
        alert('Blog drafted successfully.');
        fetchAnalytics();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBlogs(blogs.filter(b => b.id !== id));
        fetchAnalytics();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- FAQ CRUD ACTIONS ---
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) {
      alert('Questions and Answers are required.');
      return;
    }

    try {
      const url = editingFaqId ? `/api/faqs/${editingFaqId}` : '/api/faqs';
      const method = editingFaqId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(faqForm)
      });
      if (res.ok) {
        const updatedFaqsRes = await fetch('/api/faqs');
        if (updatedFaqsRes.ok) {
          setFaqs(await updatedFaqsRes.json());
        }
        setFaqForm({ question: '', answer: '', category: 'General' });
        setEditingFaqId(null);
        alert('FAQ updated.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!window.confirm('Delete FAQ?')) return;
    try {
      const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFaqs(faqs.filter(f => f.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- SAVE SYSTEM SETTINGS ---
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsForm)
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        alert('System and communication settings updated globally.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- AMENITIES HELPERS ---
  const addAmenity = () => {
    if (!tempAmenity.trim()) return;
    setPropForm({
      ...propForm,
      amenities: [...(propForm.amenities || []), tempAmenity.trim()]
    });
    setTempAmenity('');
  };

  const removeAmenity = (index: number) => {
    setPropForm({
      ...propForm,
      amenities: (propForm.amenities || []).filter((_, i) => i !== index)
    });
  };

  // Render Login Portal if not logged in
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden" id="admin-login-portal">
        <div className="bg-[#222222] py-8 px-6 text-center border-b border-[#F97316]">
          <div className="bg-[#F97316] w-12 h-12 rounded-xl flex items-center justify-center text-white mx-auto mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="font-sans font-bold text-lg text-white">Balaji Staff Portal</h2>
          <p className="text-xs text-gray-400 mt-1">Authorized personnel only</p>
        </div>
        <form onSubmit={handleLogin} className="p-6 md:p-8 space-y-5">
          {authError && (
            <div className="bg-red-50 text-red-600 text-xs p-3.5 rounded-lg border border-red-100 flex gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Security ID</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Corporate Key</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#F8F8F8] border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:ring-1 focus:ring-[#F97316] focus:border-[#F97316] outline-none"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white py-3 rounded-lg text-sm font-semibold transition-all shadow-md active:translate-y-0.5 focus:outline-none"
          >
            {loading ? 'Authenticating...' : 'Sign In To Portal'}
          </button>
          
          <div className="text-center text-[10px] text-gray-400">
            <span>Corporate Hint: Use ID "admin" and Key "balaji@2026"</span>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-4 py-8" id="admin-management-dashboard">
      
      {/* Sidebar Navigation Column */}
      <div className="lg:col-span-3 bg-[#222222] text-white rounded-2xl p-5 border border-gray-800 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-800 pb-4">
          <div className="bg-[#F97316] p-2 rounded-lg text-white">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="block font-bold text-sm">Balraj Patel</span>
            <span className="block text-[10px] text-gray-400 tracking-wider">Super Administrator</span>
          </div>
        </div>

        <nav className="space-y-1.5 flex flex-col">
          {[
            { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'properties', label: 'Manage Properties', icon: Building },
            { id: 'enquiries', label: 'Incoming Enquiries', icon: FileText },
            { id: 'blogs', label: 'Market Blogs', icon: BookOpen },
            { id: 'faqs', label: 'FAQS Accordions', icon: HelpCircle },
            { id: 'settings', label: 'Global Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left py-2.5 px-4 rounded-lg text-sm font-medium flex items-center gap-3 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#F97316] text-white font-semibold shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" /> {tab.label}
              </button>
            );
          })}
        </nav>

        <button 
          onClick={handleLogout}
          className="w-full text-left py-2.5 px-4 rounded-lg text-sm text-red-400 hover:bg-red-950/20 hover:text-red-300 flex items-center gap-3 border-t border-gray-800 pt-4"
        >
          <LogOut className="w-4 h-4" /> Sign Out Portal
        </button>
      </div>

      {/* Main Board Content Column */}
      <div className="lg:col-span-9 bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
        
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fade-up">
            <div>
              <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight">System Analytics</h2>
              <p className="text-sm text-gray-500 mt-1">Real-time engagement activity for Balaji Consultancy Services.</p>
            </div>

            {/* KPI grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#F8F8F8] border border-gray-100 rounded-xl p-5">
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Page Loads</span>
                <span className="text-3xl font-bold text-[#222222]">{analytics.visitorCount}</span>
                <span className="block text-[10px] text-green-500 mt-1">↑ 14% this month</span>
              </div>
              <div className="bg-[#F8F8F8] border border-gray-100 rounded-xl p-5">
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Properties</span>
                <span className="text-3xl font-bold text-[#222222]">{analytics.totalProperties}</span>
                <span className="block text-[10px] text-gray-500 mt-1">Active corporate assets</span>
              </div>
              <div className="bg-[#F8F8F8] border border-gray-100 rounded-xl p-5 border-l-4 border-l-[#F97316]">
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Pending Leads</span>
                <span className="text-3xl font-bold text-[#F97316]">{analytics.pendingEnquiries}</span>
                <span className="block text-[10px] text-red-500 mt-1">Requires contact back</span>
              </div>
              <div className="bg-[#F8F8F8] border border-gray-100 rounded-xl p-5">
                <span className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Blogs Drafted</span>
                <span className="text-3xl font-bold text-[#222222]">{analytics.blogsCount}</span>
                <span className="block text-[10px] text-gray-500 mt-1">Published insights</span>
              </div>
            </div>

            {/* Core Action Shortcuts */}
            <div className="border border-gray-100 rounded-xl p-6 bg-orange-50/20 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm">Quick Action: Submit New Listing</h3>
                <p className="text-xs text-gray-500 leading-relaxed">Publish a new ultra-premium residential apartment, commercial office space, or Changodar industrial warehousing hub to Balaji website.</p>
                <button 
                  onClick={() => setActiveTab('properties')}
                  className="bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                >
                  Create Listing +
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-gray-900 text-sm">Quick Action: Review Customer Leads</h3>
                <p className="text-xs text-gray-500 leading-relaxed">You have <strong className="text-[#F97316]">{analytics.pendingEnquiries} pending client inquiries</strong> requesting property brochures or scheduled site visits.</p>
                <button 
                  onClick={() => setActiveTab('enquiries')}
                  className="bg-[#222222] hover:bg-black text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all"
                >
                  Review Inquiries
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE PROPERTIES */}
        {activeTab === 'properties' && (
          <div className="space-y-8 animate-fade-up">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-sans font-bold text-2xl text-gray-900">Manage Properties</h2>
                <p className="text-sm text-gray-500 mt-1">Create or remove live real estate listings.</p>
              </div>
              {editingPropId && (
                <button 
                  onClick={() => {
                    setEditingPropId(null);
                    setPropForm({ title: '', type: 'Residential', price: '₹', location: '', status: 'Available', image: '', description: '', amenities: [] });
                  }}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {/* Property Form */}
            <form onSubmit={handleSaveProperty} className="bg-[#F8F8F8] border border-gray-100 p-6 rounded-xl space-y-5">
              <h3 className="font-bold text-gray-800 text-sm border-b border-gray-200 pb-2">
                {editingPropId ? 'Edit Property Listing Details' : 'Create New Premium Property Listing'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Property Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Balaji corporate avenue" 
                    value={propForm.title}
                    onChange={(e) => setPropForm({ ...propForm, title: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Asset Category *</label>
                  <select 
                    value={propForm.type}
                    onChange={(e) => setPropForm({ ...propForm, type: e.target.value as any })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Investment">Investment Advisory Asset</option>
                    <option value="Luxury">Luxury Mansion / Villa</option>
                    <option value="Rental">Premium Rental</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Valuation Outlay *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. ₹5.8 Cr or ₹1.2 Lakh/mo" 
                    value={propForm.price}
                    onChange={(e) => setPropForm({ ...propForm, price: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Location / Sector *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Sindhu Bhavan Road, Bodakdev" 
                    value={propForm.location}
                    onChange={(e) => setPropForm({ ...propForm, location: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Asset Image URL *</label>
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/..." 
                    value={propForm.image}
                    onChange={(e) => setPropForm({ ...propForm, image: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Asset Status *</label>
                  <select 
                    value={propForm.status}
                    onChange={(e) => setPropForm({ ...propForm, status: e.target.value as any })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  >
                    <option value="Available">Available</option>
                    <option value="Sold">Sold</option>
                    <option value="New Launch">New Launch</option>
                    <option value="Under Construction">Under Construction</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Comprehensive Description *</label>
                <textarea 
                  placeholder="Detail the technical specs, corporate lease details, parking basements, RERA certifications..."
                  value={propForm.description}
                  onChange={(e) => setPropForm({ ...propForm, description: e.target.value })}
                  rows={4}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  required
                ></textarea>
              </div>

              {/* Amenities builder */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-600">Premium Amenities / Features</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="e.g. Triple basement parking, Private high-speed lift" 
                    value={tempAmenity}
                    onChange={(e) => setTempAmenity(e.target.value)}
                    className="flex-grow bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={addAmenity}
                    className="bg-[#222222] text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-black"
                  >
                    Add +
                  </button>
                </div>
                {/* Render current amenities */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {(propForm.amenities || []).map((am, i) => (
                    <span key={i} className="bg-orange-50 text-orange-700 text-xs py-1 px-2.5 rounded-lg flex items-center gap-1">
                      {am}
                      <button type="button" onClick={() => removeAmenity(i)} className="text-red-500 hover:text-red-700 font-bold ml-1">×</button>
                    </span>
                  ))}
                </div>
              </div>

              <button 
                type="submit" 
                className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                {editingPropId ? 'Update Listing Details ✓' : 'Publish Property Listing +'}
              </button>
            </form>

            {/* List of active listings */}
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900 text-sm">Active Website Properties ({properties.length})</h3>
              <div className="border border-gray-100 rounded-xl overflow-hidden divide-y divide-gray-100 text-sm">
                {properties.map((p) => (
                  <div key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 hover:bg-gray-50/50 gap-4">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt={p.title} className="w-12 h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                      <div>
                        <span className="font-semibold text-gray-800 block">{p.title}</span>
                        <span className="text-xs text-gray-500">{p.location} • <strong className="text-orange-600">{p.price}</strong></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        p.status === 'Available' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {p.status}
                      </span>
                      <button 
                        onClick={() => handleEditProp(p)} 
                        className="text-gray-500 hover:text-[#F97316] p-1.5 hover:bg-gray-100 rounded"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteProp(p.id)} 
                        className="text-red-500 hover:text-red-700 p-1.5 hover:bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INCOMING ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6 animate-fade-up">
            <div>
              <h2 className="font-sans font-bold text-2xl text-gray-900">Incoming Customer Enquiries</h2>
              <p className="text-sm text-gray-500 mt-1">Manage feedback, scheduled site visits, and consultation requests.</p>
            </div>

            <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
              {enquiries.length === 0 ? (
                <div className="p-8 text-center text-gray-400 text-sm">
                  No active customer enquiries recorded.
                </div>
              ) : (
                enquiries.map((enq) => (
                  <div key={enq.id} className="p-5 hover:bg-gray-50/50 transition-colors text-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-gray-900 block text-base">{enq.name}</span>
                        <span className="text-xs text-gray-500">{enq.email} • {enq.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          enq.status === 'Pending' 
                            ? 'bg-red-50 text-red-700 border border-red-100' 
                            : enq.status === 'Contacted' 
                            ? 'bg-amber-50 text-amber-700 border border-amber-100' 
                            : 'bg-green-50 text-green-700 border border-green-100'
                        }`}>
                          {enq.status}
                        </span>
                        <button 
                          onClick={() => handleDeleteEnquiry(enq.id)}
                          className="text-gray-400 hover:text-red-600 p-1.5 hover:bg-red-50 rounded"
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-100">
                      <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                        Type: {enq.type} {enq.propertyName ? `• Ref: ${enq.propertyName}` : ''}
                      </span>
                      <p className="text-gray-700 leading-relaxed text-xs">"{enq.message}"</p>
                    </div>

                    <div className="flex justify-between items-center text-xs pt-1">
                      <span className="text-gray-400">Date Logged: {enq.date}</span>
                      <div className="flex gap-2">
                        {enq.status !== 'Contacted' && (
                          <button 
                            onClick={() => handleUpdateEnquiryStatus(enq.id, 'Contacted')}
                            className="bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs py-1 px-3 rounded-lg font-medium transition-colors"
                          >
                            Mark contacted
                          </button>
                        )}
                        {enq.status !== 'Closed' && (
                          <button 
                            onClick={() => handleUpdateEnquiryStatus(enq.id, 'Closed')}
                            className="bg-green-50 hover:bg-green-100 text-green-800 text-xs py-1 px-3 rounded-lg font-medium transition-colors"
                          >
                            Mark Closed ✓
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: MARKET BLOGS */}
        {activeTab === 'blogs' && (
          <div className="space-y-8 animate-fade-up">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-sans font-bold text-2xl text-gray-900">Manage Market Insights</h2>
                <p className="text-sm text-gray-500 mt-1">Create or delete published articles for Ahmedabad news and tips.</p>
              </div>
            </div>

            <form onSubmit={handleSaveBlog} className="bg-[#F8F8F8] border border-gray-100 p-6 rounded-xl space-y-4">
              <h3 className="font-bold text-sm text-gray-800">Draft New Insight Article</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Article Title *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Ahmedabad growth vector analysis" 
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
                  <select 
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value as any })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="Property Tips">Property Tips</option>
                    <option value="Investment Advice">Investment Advice</option>
                    <option value="Market Trends">Market Trends</option>
                    <option value="Buying Guide">Buying Guide</option>
                    <option value="Selling Guide">Selling Guide</option>
                    <option value="Ahmedabad Property News">Ahmedabad Property News</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Read Time *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 5 min read" 
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Featured Image URL *</label>
                  <input 
                    type="url" 
                    placeholder="https://images.unsplash.com/..." 
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Short Excerpt (Intro) *</label>
                <input 
                  type="text" 
                  placeholder="Summarize the core focus of this article..." 
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Content (supports formatting) *</label>
                <textarea 
                  placeholder="Draft complete corporate research write-up..."
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  rows={6}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2 rounded-lg text-xs font-bold transition-all"
              >
                Publish Article ✓
              </button>
            </form>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-sm">Active Blog Stream ({blogs.length})</h3>
              <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden text-sm">
                {blogs.map((b) => (
                  <div key={b.id} className="flex justify-between items-center p-4 hover:bg-gray-50/50">
                    <div>
                      <span className="font-semibold block text-gray-800">{b.title}</span>
                      <span className="text-xs text-gray-500">{b.category} • Published {b.date}</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteBlog(b.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: FAQS ACCORDIONS */}
        {activeTab === 'faqs' && (
          <div className="space-y-8 animate-fade-up">
            <div>
              <h2 className="font-sans font-bold text-2xl text-gray-900">Manage FAQs Accordion</h2>
              <p className="text-sm text-gray-500 mt-1">Structure questions for clients searching about RERA, taxations, and valuation support.</p>
            </div>

            <form onSubmit={handleSaveFaq} className="bg-[#F8F8F8] border border-gray-100 p-6 rounded-xl space-y-4">
              <h3 className="font-bold text-sm text-gray-800">Add New Accordion FAQ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Accordion Question *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. What is the standard stamp duty?" 
                    value={faqForm.question}
                    onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Section/Category *</label>
                  <select 
                    value={faqForm.category}
                    onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="General">General FAQ</option>
                    <option value="Legal">Legal & Titles</option>
                    <option value="Investment">Investment advisory</option>
                    <option value="Loan & Valuation">Loan & Valuations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Answer explanation *</label>
                <textarea 
                  placeholder="Provide structured legal or strategic responses here..."
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  rows={3}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                  required
                ></textarea>
              </div>

              <button type="submit" className="bg-[#F97316] text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-[#EA580C]">
                Save FAQ +
              </button>
            </form>

            <div className="space-y-2">
              {faqs.map((f) => (
                <div key={f.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-xl text-sm bg-gray-50/50">
                  <div>
                    <span className="font-semibold block text-gray-800">{f.question}</span>
                    <span className="text-xs text-gray-500">Category: {f.category}</span>
                  </div>
                  <button onClick={() => handleDeleteFaq(f.id)} className="text-red-500 hover:text-red-700 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: GLOBAL SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-6 animate-fade-up">
            <div>
              <h2 className="font-sans font-bold text-2xl text-gray-900">Global Corporate Coordinates</h2>
              <p className="text-sm text-gray-500 mt-1">Modifying these fields will instantly update the Header, Footer, and Contact page widgets globally across the website.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[#F8F8F8] border border-gray-100 p-6 rounded-xl">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Corporate Support Hotline</label>
                <input 
                  type="text" 
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Support WhatsApp Line</label>
                <input 
                  type="text" 
                  value={settingsForm.whatsapp}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Corporate Email Coordinator</label>
                <input 
                  type="email" 
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Business Operating Hours</label>
                <input 
                  type="text" 
                  value={settingsForm.hours}
                  onChange={(e) => setSettingsForm({ ...settingsForm, hours: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Headquarters Street Address</label>
                <textarea 
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  rows={2}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">LinkedIn Page URL</label>
                <input 
                  type="url" 
                  value={settingsForm.linkedin}
                  onChange={(e) => setSettingsForm({ ...settingsForm, linkedin: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Facebook Page URL</label>
                <input 
                  type="url" 
                  value={settingsForm.facebook}
                  onChange={(e) => setSettingsForm({ ...settingsForm, facebook: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md"
            >
              Update Settings Globally ✓
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
