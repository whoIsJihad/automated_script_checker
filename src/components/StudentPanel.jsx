import { useState, useEffect } from 'react';
import { CheckCircle2, BookOpen, AlertCircle, Zap } from 'lucide-react';
import { Card, Button, Badge, SectionHeader } from './UI';
import SubmissionsList from './SubmissionsList';
import SubmitWorksheetForm from './SubmitWorksheetForm';
import SubmissionProgressModal from './SubmissionProgressModal';
import DisputeModal from './DisputeModal';

function StudentPanel({ worksheets, submissions, addSubmission, disputeSubmission, curriculum, searchQuery }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [progressStep, setProgressStep] = useState(0);
  const [disputeModal, setDisputeModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [formData, setFormData] = useState(null);

  const progressTexts = [
    'OCR Scanning Handwriting...',
    'Comparing with Marking Scheme...',
    'Finalizing Feedback...'
  ];

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

  // Filter submissions based on search query
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

  // Calculate stats
  const submittedCount = submissions.length;
  const averageScore = submissions.length > 0
    ? Math.round(submissions.reduce((sum, s) => sum + (s.score || 0), 0) / submissions.length)
    : 0;
  const pendingCount = submissions.filter(s => s.status === 'Pending').length;

  useEffect(() => {
    if (submitting && formData) {
      const interval = setInterval(() => {
        setProgressStep((prev) => (prev + 1) % 3);
      }, 1000);
      const timeout = setTimeout(() => {
        const newSubmission = {
          studentName: 'Alice Johnson',
          worksheetId: parseInt(formData.selectedWorksheet),
          status: 'Pending',
          score: Math.floor(Math.random() * 100) + 1,
          aiFeedback: 'Submission received. AI grading in progress.'
        };
        addSubmission(newSubmission);
        setSubmittedData(newSubmission);
        setSubmitting(false);
        setSuccess(true);
        setProgressStep(0);
        setFormData(null);
      }, 4000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [submitting, formData, addSubmission]);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setSubmitting(true);
  };

  const handleDispute = (submission) => {
    setSelectedSubmission(submission);
    setDisputeModal(true);
  };

  const handleDisputeSubmit = (id, reason) => {
    disputeSubmission(id, reason);
    setDisputeModal(false);
    setSelectedSubmission(null);
  };

  const reset = () => {
    setSuccess(false);
    setSubmittedData(null);
  };

  if (success && submittedData) {
    return (
      <Card className="p-12 text-center max-w-lg mx-auto mt-12">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-100 p-4 rounded-full">
            <CheckCircle2 size={40} className="text-emerald-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Submission Successful!</h2>
        <p className="text-slate-600 mb-1">Worksheet submitted at {new Date().toLocaleString()}</p>
        <p className="text-lg font-semibold text-slate-900 mb-6">Estimated Score: <span className="text-indigo-600">{submittedData.score}/100</span></p>
        <Button onClick={reset} variant="primary">
          Submit Another Worksheet
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6" hover>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600 font-semibold mb-2">Submitted</p>
              <p className="text-4xl font-bold text-slate-900">{submittedCount}</p>
              <p className="text-xs text-slate-500 mt-2">Total submissions</p>
            </div>
            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
              <BookOpen size={24} className="text-indigo-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600 font-semibold mb-2">Average Score</p>
              <p className="text-4xl font-bold text-slate-900">{averageScore}%</p>
              <p className="text-xs text-slate-500 mt-2">Across all submissions</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg border border-green-100">
              <Zap size={24} className="text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6" hover>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-600 font-semibold mb-2">Pending</p>
              <p className="text-4xl font-bold text-slate-900">{pendingCount}</p>
              <p className="text-xs text-slate-500 mt-2">Awaiting AI grading</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
              <AlertCircle size={24} className="text-amber-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Submissions */}
        <div className="lg:col-span-2">
          <SectionHeader title="Your Submissions" description="View and manage all your submitted worksheets" />
          <SubmissionsList submissions={filteredSubmissions} worksheets={filteredWorksheets} onDispute={handleDispute} />
        </div>

        {/* Right - Submit New */}
        <div>
          <SectionHeader title="New Submission" />
          <SubmitWorksheetForm worksheets={filteredWorksheets} onSubmit={handleFormSubmit} />
        </div>
      </div>

      {/* Modals */}
      <SubmissionProgressModal submitting={submitting} progressStep={progressStep} progressTexts={progressTexts} />
      <DisputeModal
        open={disputeModal}
        onClose={() => setDisputeModal(false)}
        submission={selectedSubmission}
        onSubmit={handleDisputeSubmit}
      />
    </div>
  );
}

export default StudentPanel;