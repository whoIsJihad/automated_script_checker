import { useState } from 'react';
import { CheckCircle2, X, Plus, BookOpen, AlertTriangle, Settings } from 'lucide-react';
import WorksheetForm from './WorksheetForm';
import AISettings from './AISettings';
import ActiveWorksheetsList from './ActiveWorksheetsList';
import DisputeInbox from './DisputeInbox';

function TeacherPanel({ worksheets, addWorksheet, submissions, resolveDispute, reportToAdmin, searchQuery }) {
  const [model, setModel] = useState('GPT-4o (Standard)');
  const [showAI, setShowAI] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [latestWorksheetId, setLatestWorksheetId] = useState(null);
  const [activeTab, setActiveTab] = useState('create');

  // Filter worksheets based on search query
  const filteredWorksheets = worksheets.filter(worksheet => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      worksheet.title.toLowerCase().includes(query) ||
      worksheet.subject.toLowerCase().includes(query) ||
      worksheet.description.toLowerCase().includes(query) ||
      worksheet.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  // Filter submissions based on search query (for disputes)
  const filteredSubmissions = submissions.filter(sub => {
    if (!searchQuery) return true;
    
    const worksheet = worksheets.find(w => w.id === sub.worksheetId);
    if (!worksheet) return false;
    
    const query = searchQuery.toLowerCase();
    return (
      worksheet.title.toLowerCase().includes(query) ||
      worksheet.subject.toLowerCase().includes(query) ||
      worksheet.description.toLowerCase().includes(query) ||
      worksheet.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  const handleAddWorksheet = (data) => {
    const newWorksheet = {
      id: Date.now(),
      title: data.title,
      subject: data.subject,
      status: 'Open',
      assignedLLM: data.model.split(' ')[0],
      file: data.file ? data.file.name : null
    };
    addWorksheet(newWorksheet);
    setLatestWorksheetId(newWorksheet.id);
    
    // Show success message
    setSuccessMessage(`"${data.title}" worksheet created successfully!`);
    setShowSuccess(true);
    
    // Auto-hide after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const dismissSuccess = () => {
    setShowSuccess(false);
  };

  const tabs = [
    { id: 'create', label: 'Create Worksheet', icon: Plus },
    { id: 'manage', label: 'Manage Worksheets', icon: BookOpen },
    { id: 'disputes', label: 'Dispute Inbox', icon: AlertTriangle },
    { id: 'settings', label: 'AI Settings', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      {/* Success Notification */}
      {showSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-emerald-600" />
            <span className="text-emerald-800 font-medium">{successMessage}</span>
          </div>
          <button
            onClick={dismissSuccess}
            className="text-emerald-600 hover:text-emerald-800 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'create' && (
          <WorksheetForm onSubmit={handleAddWorksheet} />
        )}
        {activeTab === 'manage' && (
          <ActiveWorksheetsList worksheets={filteredWorksheets} submissions={submissions} latestWorksheetId={latestWorksheetId} />
        )}
        {activeTab === 'disputes' && (
          <DisputeInbox submissions={filteredSubmissions} worksheets={worksheets} resolveDispute={resolveDispute} reportToAdmin={reportToAdmin} />
        )}
        {activeTab === 'settings' && (
          <AISettings showAI={showAI} setShowAI={setShowAI} model={model} setModel={setModel} />
        )}
      </div>
    </div>
  );
}

export default TeacherPanel;