import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Sprout, 
  Search, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Upload,
  Image as ImageIcon,
  MessageCircle,
  ArrowLeft,
  Menu,
  X,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { cn } from './lib/utils';
import { Tender } from './types';

// --- Mock Data ---
const MOCK_TENDERS: Tender[] = [
  {
    id: '1',
    title: 'Supply of 500kg Potatoes for St. Mary\'s School',
    description: 'We are looking for high-quality Irish potatoes for our school cafeteria. Must be fresh and sorted.',
    cropType: 'Potatoes',
    quantity: '500kg',
    deadline: '2026-04-15',
    organizationName: 'St. Mary\'s High School',
    organizationId: 'org1',
    location: 'Nairobi, Central',
    status: 'open',
    createdAt: '2026-03-25'
  },
  {
    id: '2',
    title: 'Maize Supply for Relief Program',
    description: 'Urgent requirement for 2 tons of dry maize for our community relief program. Moisture content must be below 13%.',
    cropType: 'Maize',
    quantity: '2 Tons',
    deadline: '2026-04-10',
    organizationName: 'Community Relief Org',
    organizationId: 'org2',
    location: 'Nakuru, Rift Valley',
    status: 'open',
    createdAt: '2026-03-28'
  },
  {
    id: '3',
    title: 'Fresh Tomatoes for Local Market',
    description: 'Looking for consistent supply of ripe tomatoes. Daily delivery preferred.',
    cropType: 'Tomatoes',
    quantity: '50kg/day',
    deadline: '2026-05-01',
    organizationName: 'City Fresh Markets',
    organizationId: 'org3',
    location: 'Mombasa, Coast',
    status: 'open',
    createdAt: '2026-03-30'
  }
];

const YIELD_DATA = [
  { month: 'Jan', potatoes: 400, maize: 240, tomatoes: 200 },
  { month: 'Feb', potatoes: 300, maize: 139, tomatoes: 221 },
  { month: 'Mar', potatoes: 200, maize: 980, tomatoes: 229 },
  { month: 'Apr', potatoes: 278, maize: 390, tomatoes: 200 },
  { month: 'May', potatoes: 189, maize: 480, tomatoes: 218 },
  { month: 'Jun', potatoes: 239, maize: 380, tomatoes: 250 },
  { month: 'Jul', potatoes: 349, maize: 430, tomatoes: 210 },
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-emerald-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">AgriMarket</span>
          </Link>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link to="/" className="hover:text-emerald-300 transition-colors">Dashboard</Link>
              <Link to="/analytics" className="hover:text-emerald-300 transition-colors">Yield Analytics</Link>
              <Link to="/post-tender" className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg font-medium transition-colors">
                Post Tender
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-emerald-800 border-t border-emerald-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md hover:bg-emerald-700">Dashboard</Link>
              <Link to="/analytics" className="block px-3 py-2 rounded-md hover:bg-emerald-700">Yield Analytics</Link>
              <Link to="/post-tender" className="block px-3 py-2 rounded-md bg-emerald-500 text-center">Post Tender</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const YieldChart = () => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Regional Crop Yield Trends</h3>
          <p className="text-sm text-gray-500">Monthly yield data across major crops (in Tons)</p>
        </div>
        <div className="bg-emerald-50 p-2 rounded-lg">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={YIELD_DATA}>
            <defs>
              <linearGradient id="colorPotatoes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorMaize" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" />
            <Area 
              type="monotone" 
              dataKey="potatoes" 
              stroke="#10b981" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPotatoes)" 
              name="Potatoes"
            />
            <Area 
              type="monotone" 
              dataKey="maize" 
              stroke="#f59e0b" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorMaize)" 
              name="Maize"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredTenders = MOCK_TENDERS.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.cropType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Dashboard</h1>
        <p className="text-gray-600">Real-time market insights and tender opportunities.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <YieldChart />
        </div>
        <div className="space-y-6">
          <div className="bg-emerald-600 p-6 rounded-3xl text-white shadow-lg shadow-emerald-100">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="h-8 w-8 opacity-80" />
              <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">LIVE</span>
            </div>
            <h4 className="text-sm font-medium opacity-80 mb-1">Total Market Value</h4>
            <p className="text-3xl font-bold">$1.2M</p>
            <div className="mt-4 flex items-center text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-4">Quick Stats</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Active Tenders</span>
                <span className="font-bold text-emerald-600">124</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">New This Week</span>
                <span className="font-bold text-emerald-600">18</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Avg. Payout</span>
                <span className="font-bold text-emerald-600">$450</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Available Tenders</h2>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search tenders..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTenders.map((tender, index) => (
          <motion.div
            key={tender.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {tender.cropType}
                </span>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{format(new Date(tender.deadline), 'MMM d, yyyy')}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{tender.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{tender.description}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                  {tender.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FileText className="h-4 w-4 mr-2 text-emerald-500" />
                  Quantity: {tender.quantity}
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{tender.organizationName}</span>
              <Link 
                to={`/tender/${tender.id}`}
                className="text-emerald-600 font-bold text-sm flex items-center hover:text-emerald-700"
              >
                View Details <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Analytics = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Yield Analytics</h1>
        <p className="text-gray-600">Detailed performance metrics for your farm produce.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Monthly Production (Tons)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={YIELD_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="potatoes" fill="#10b981" radius={[4, 4, 0, 0]} name="Potatoes" />
                <Bar dataKey="maize" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Maize" />
                <Bar dataKey="tomatoes" fill="#ef4444" radius={[4, 4, 0, 0]} name="Tomatoes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Price Volatility Index</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={YIELD_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="potatoes" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} name="Potatoes" />
                <Line type="monotone" dataKey="maize" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} name="Maize" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const TenderDetails = () => {
  const { id } = useParams();
  const tender = MOCK_TENDERS.find(t => t.id === id);
  const navigate = useNavigate();

  if (!tender) return <div className="p-8 text-center">Tender not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-emerald-600 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </button>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-emerald-900 p-8 text-white">
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              {tender.cropType}
            </span>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              ID: {tender.id}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{tender.title}</h1>
          <div className="flex flex-wrap gap-4 text-emerald-100 text-sm">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" /> {tender.location}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" /> Deadline: {format(new Date(tender.deadline), 'MMMM d, yyyy')}
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Requirement Description</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{tender.description}</p>
              
              <h2 className="text-xl font-bold text-gray-900 mb-4">Specific Requirements</h2>
              <ul className="space-y-3">
                {['High quality produce', 'Clean and sorted', 'Timely delivery', 'Proper packaging'].map((req, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mr-3 mt-0.5" />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Tender Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Quantity</p>
                  <p className="font-medium text-gray-900">{tender.quantity}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Organization</p>
                  <p className="font-medium text-gray-900">{tender.organizationName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Posted On</p>
                  <p className="font-medium text-gray-900">{format(new Date(tender.createdAt), 'MMM d, yyyy')}</p>
                </div>
              </div>

              <Link 
                to={`/apply/${tender.id}`}
                className="w-full mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center shadow-lg shadow-emerald-200"
              >
                Apply for Tender
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplyForm = () => {
  const { id } = useParams();
  const tender = MOCK_TENDERS.find(t => t.id === id);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cropDetails: '',
    phone: '',
    idDoc: null as File | null,
    cropImg: null as File | null
  });

  if (!tender) return <div>Tender not found</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const message = `*New Tender Application*%0A%0A` +
        `*Tender:* ${tender.title}%0A` +
        `*Farmer:* ${formData.name}%0A` +
        `*Phone:* ${formData.phone}%0A` +
        `*Crop Details:* ${formData.cropDetails}%0A%0A` +
        `_Sent via AgriMarket Connect_`;
      
      const whatsappUrl = `https://wa.me/254712345678?text=${message}`;
      alert('Application submitted successfully! Redirecting to WhatsApp.');
      window.open(whatsappUrl, '_blank');
      navigate('/');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tender Application</h1>
        <p className="text-gray-600">Applying for: <span className="font-bold text-emerald-600">{tender.title}</span></p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            placeholder="Your full name" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Phone Number</label>
          <input 
            type="tel" 
            required
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
            placeholder="+254..." 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Crop Quality & Details</label>
          <textarea 
            required
            rows={4}
            value={formData.cropDetails}
            onChange={e => setFormData({...formData, cropDetails: e.target.value})}
            placeholder="Describe your crop quality, variety, and harvest date..." 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Identity Document (ID/Passport)</label>
            <div className="relative group">
              <input 
                type="file" 
                required
                onChange={e => setFormData({...formData, idDoc: e.target.files?.[0] || null})}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className={cn(
                "border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all",
                formData.idDoc ? "border-emerald-500 bg-emerald-50" : "border-gray-200 group-hover:border-emerald-400"
              )}>
                <Upload className={cn("h-6 w-6 mb-2", formData.idDoc ? "text-emerald-500" : "text-gray-400")} />
                <span className="text-xs font-medium text-gray-500 text-center">
                  {formData.idDoc ? formData.idDoc.name : "Upload ID Document"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Sample Crop Pictures</label>
            <div className="relative group">
              <input 
                type="file" 
                required
                onChange={e => setFormData({...formData, cropImg: e.target.files?.[0] || null})}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className={cn(
                "border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-all",
                formData.cropImg ? "border-emerald-500 bg-emerald-50" : "border-gray-200 group-hover:border-emerald-400"
              )}>
                <ImageIcon className={cn("h-6 w-6 mb-2", formData.cropImg ? "text-emerald-500" : "text-gray-400")} />
                <span className="text-xs font-medium text-gray-500 text-center">
                  {formData.cropImg ? formData.cropImg.name : "Upload Yield Samples"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center shadow-lg shadow-emerald-200"
        >
          {isSubmitting ? (
            <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>Submit Application & Notify via WhatsApp <MessageCircle className="h-5 w-5 ml-2" /></>
          )}
        </button>
      </form>
    </div>
  );
};

const PostTender = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cropType: 'Potatoes',
    quantity: '',
    location: '',
    deadline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Tender posted successfully!');
      navigate('/');
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Tender</h1>
        <p className="text-gray-600">Reach out to local farmers for your produce needs.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Tender Title</label>
          <input 
            type="text" 
            required
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
            placeholder="e.g., Supply of 100kg Maize" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Crop Type</label>
            <select 
              value={formData.cropType}
              onChange={e => setFormData({...formData, cropType: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-white"
            >
              <option>Potatoes</option>
              <option>Maize</option>
              <option>Tomatoes</option>
              <option>Beans</option>
              <option>Onions</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Quantity Needed</label>
            <input 
              type="text" 
              required
              value={formData.quantity}
              onChange={e => setFormData({...formData, quantity: e.target.value})}
              placeholder="e.g., 500kg" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
          <input 
            type="text" 
            required
            value={formData.location}
            onChange={e => setFormData({...formData, location: e.target.value})}
            placeholder="e.g., Nairobi, Central" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Deadline Date</label>
          <input 
            type="date" 
            required
            value={formData.deadline}
            onChange={e => setFormData({...formData, deadline: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Detailed Description</label>
          <textarea 
            required
            rows={4}
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            placeholder="Describe your quality requirements, delivery terms, etc..." 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center shadow-lg shadow-emerald-200"
        >
          {isSubmitting ? (
            <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>Post Tender Requirement <FileText className="h-5 w-5 ml-2" /></>
          )}
        </button>
      </form>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/tender/:id" element={<TenderDetails />} />
            <Route path="/apply/:id" element={<ApplyForm />} />
            <Route path="/post-tender" element={<PostTender />} />
          </Routes>
        </main>
        
        <footer className="bg-emerald-950 text-emerald-200 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sprout className="h-6 w-6 text-emerald-500" />
              <span className="font-bold text-white text-xl">AgriMarket</span>
            </div>
            <p className="text-sm max-w-md mx-auto mb-8">
              Connecting local farmers with sustainable markets. Empowering agriculture through technology.
            </p>
            <div className="border-t border-emerald-900 pt-8 text-xs">
              &copy; 2026 AgriMarket Connect. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
