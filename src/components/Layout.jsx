import { useState } from 'react';
import { GraduationCap, Search, Bell, Menu, X, LogOut } from 'lucide-react';
import TeacherPanel from './TeacherPanel';
import StudentPanel from './StudentPanel';
import AdminPanel from './AdminPanel';

// ========== NAVBAR COMPONENT ==========
function Navbar({ role, setRole, searchQuery, setSearchQuery, notifications, onNotificationClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roleConfig = {
    teacher: { color: 'emerald', label: 'Teacher' },
    student: { color: 'blue', label: 'Student' },
    admin: { color: 'purple', label: 'Admin' }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-md">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-indigo-600">EduAI</h1>
            </div>
          </div>

          {/* Desktop Center - Search */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Desktop Right - Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Notifications */}
            <div className="relative group">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-all duration-200 hover:-translate-y-0.5">
                <Bell size={20} className="text-slate-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-md">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 mt-1 w-80 bg-white rounded-xl shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900 text-sm">Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto scrollbar-hide">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">No notifications</div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-3 border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-b-0 cursor-pointer text-sm">
                        <div className="flex gap-2">
                          <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-700 text-xs leading-relaxed">{n.message}</p>
                            <p className="text-slate-400 text-xs mt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Role Badge */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100">
              <span className="text-xs font-medium text-slate-600">
                {roleConfig[role].label}
              </span>
            </div>

            {/* Role Switcher */}
            <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
              {Object.entries(roleConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setRole(key)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    role === key
                      ? `bg-white text-${config.color}-700 shadow-sm`
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>

            {/* Logout */}
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600">
              <LogOut size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-sm py-4 px-4 space-y-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
            <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
              {Object.entries(roleConfig).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => { setRole(key); setMobileMenuOpen(false); }}
                  className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    role === key ? `bg-white text-${config.color}-700 shadow-sm` : 'text-slate-600'
                  }`}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ========== MAIN LAYOUT ==========
function Layout({ role, setRole, mockData }) {
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, message: 'Teacher approved your dispute on Math worksheet', time: '2 min ago', unread: true },
    { id: 2, message: 'New worksheet "Physics Fundamentals" assigned', time: '1 hour ago', unread: true },
    { id: 3, message: 'Your submission for Biology has been graded', time: '3 hours ago', unread: false },
    { id: 4, message: 'Admin updated the AI model settings', time: '1 day ago', unread: false }
  ];

  const dashboardTitles = {
    teacher: { title: 'Teacher Dashboard', desc: 'Manage worksheets, review submissions, and handle disputes' },
    student: { title: 'Student Dashboard', desc: 'Submit assignments, track progress, and learn with AI' },
    admin: { title: 'Admin Dashboard', desc: 'Monitor system performance and manage AI models' }
  };

  const currentDashboard = dashboardTitles[role];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar
        role={role}
        setRole={setRole}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{currentDashboard.title}</h1>
          <p className="text-slate-600 text-lg">{currentDashboard.desc}</p>
        </div>

        {/* Content Panels */}
        <div className="space-y-6">
          {role === 'teacher' ? (
            <TeacherPanel
              worksheets={mockData.worksheets}
              addWorksheet={mockData.addWorksheet}
              submissions={mockData.submissions}
              resolveDispute={mockData.resolveDispute}
              reportToAdmin={mockData.reportToAdmin}
              searchQuery={searchQuery}
            />
          ) : role === 'student' ? (
            <StudentPanel
              worksheets={mockData.worksheets}
              submissions={mockData.getSubmissionsForRole('student')}
              addSubmission={mockData.addSubmission}
              disputeSubmission={mockData.disputeSubmission}
              curriculum={mockData.curriculum}
              searchQuery={searchQuery}
            />
          ) : (
            <AdminPanel
              worksheets={mockData.worksheets}
              submissions={mockData.submissions}
              adminReports={mockData.adminReports}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default Layout;