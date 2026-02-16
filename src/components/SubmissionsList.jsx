import { useState } from 'react';
import { CheckCircle2, FileText, Calendar, AlertTriangle, Clock, ChevronDown, ChevronUp, MessageSquare, Eye } from 'lucide-react';
import { Card, Button, Badge, EmptyState } from './UI';
import WorksheetDetails from './WorksheetDetails';

function SubmissionsList({ submissions, worksheets, onDispute }) {
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [selectedWorksheet, setSelectedWorksheet] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null); // For showing complaint/works boxes

  const toggleCardExpansion = (submissionId) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(submissionId)) {
        newSet.delete(submissionId);
      } else {
        newSet.add(submissionId);
      }
      return newSet;
    });
  };

  const openWorksheetDetails = (worksheet) => {
    setSelectedWorksheet(worksheet);
    setIsDetailsModalOpen(true);
  };

  const closeWorksheetDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedWorksheet(null);
  };
  // Note: submissions are already filtered by role in the parent component
  const studentSubmissions = submissions;

  const getStatusConfig = (status) => {
    const config = {
      'Graded': { variant: 'success', icon: CheckCircle2, label: 'Graded' },
      'Disputed': { variant: 'danger', icon: AlertTriangle, label: 'Disputed' },
      'Pending': { variant: 'warning', icon: Clock, label: 'Pending' }
    };
    return config[status] || config['Pending'];
  };

  if (studentSubmissions.length === 0) {
    return (
      <Card className="p-8">
        <EmptyState
          icon={FileText}
          title="No submissions yet"
          description="Submit your first assignment to get started with AI-powered grading"
        />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {studentSubmissions.map((sub) => {
        const worksheet = worksheets.find(w => w.id === sub.worksheetId);
        const statusConfig = getStatusConfig(sub.status);
        const StatusIcon = statusConfig.icon;

        return (
          <div key={sub.id} className="space-y-4">
            <div onClick={() => setActiveCard(activeCard === sub.id ? null : sub.id)} className="cursor-pointer">
              <Card 
                className="p-6 transition-all duration-200"
              >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-indigo-50 rounded-lg border border-indigo-100">
                    <FileText size={18} className="text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{worksheet?.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 font-medium">{worksheet?.subject}</span>
                      <Badge variant={statusConfig.variant}>
                        <StatusIcon size={11} className="inline mr-1.5" />
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600 mt-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Submitted 3 days ago</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    {expandedCards.has(sub.id) ? (
                      <>
                        <ChevronUp size={14} />
                        <span className="text-xs">Less details</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown size={14} />
                        <span className="text-xs">More details</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {sub.score !== null && (
                <div className="text-right ml-4 flex-shrink-0">
                  <div className="text-3xl font-bold text-indigo-600">{sub.score}</div>
                  <div className="text-xs text-slate-500 font-medium">/100</div>
                </div>
              )}
            </div>

            {/* Expanded Content */}
            {expandedCards.has(sub.id) && (
              <div className="mt-4 pt-4 border-t border-slate-200 space-y-4 animate-in slide-in-from-top-2 duration-300">
                {sub.aiFeedback && (
                  <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                    <p className="text-xs font-semibold text-indigo-700 mb-2">AI Feedback</p>
                    <p className="text-sm text-indigo-900 leading-relaxed">{sub.aiFeedback}</p>
                  </div>
                )}

                {sub.isDisputed && (
                  <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                    <div className="flex gap-2">
                      <AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-900">Dispute Submitted</p>
                        <p className="text-xs text-red-700 mt-1">{sub.disputeReason}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">
                    {sub.status === 'Graded' && !sub.isDisputed && 'Grade seems incorrect?'}
                  </span>
                  {sub.status === 'Graded' && !sub.isDisputed && (
                    <Button 
                      size="sm" 
                      variant="danger" 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card expansion
                        onDispute(sub);
                      }}
                    >
                      <AlertTriangle size={14} className="inline mr-1.5" />
                      Report Issue
                    </Button>
                  )}
                </div>
              </div>
            )}
          </Card>
          </div>
          
          {/* Complaint and Works Display Boxes */}
          {activeCard === sub.id && (
            <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-300">
              {/* Complaint Submission Box */}
              <Card className="p-4 border-l-4 border-red-500 bg-red-50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <MessageSquare size={16} className="text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-900 mb-2">Submit Complaint</h4>
                    <p className="text-sm text-red-700 mb-3">Report an issue with your assignment grading or feedback</p>
                    <Button 
                      size="sm" 
                      variant="danger" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDispute(sub);
                      }}
                    >
                      <MessageSquare size={14} className="inline mr-1.5" />
                      File Complaint
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* Works Display Box */}
              <Card className="p-4 border-l-4 border-blue-500 bg-blue-50">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Eye size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 mb-2">View Your Work</h4>
                    <p className="text-sm text-blue-700 mb-3">Review your submitted assignment and AI analysis</p>
                    <Button 
                      size="sm" 
                      variant="primary" 
                      onClick={(e) => {
                        e.stopPropagation();
                        openWorksheetDetails(worksheet);
                      }}
                    >
                      <Eye size={14} className="inline mr-1.5" />
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}
          </div>
        );
      })}
      <WorksheetDetails
        worksheet={selectedWorksheet}
        submissions={submissions}
        isOpen={isDetailsModalOpen}
        onClose={closeWorksheetDetails}
        role="student"
      />
    </div>
  );
}

export default SubmissionsList;