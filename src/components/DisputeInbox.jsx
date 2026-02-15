import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, User, FileText, MessageSquare, Clock, Flag } from 'lucide-react';
import { Card, Button, Badge, Input } from './UI';

function DisputeInbox({ submissions, worksheets, resolveDispute, reportToAdmin }) {
  const [overrideScores, setOverrideScores] = useState({});

  const handleOverrideChange = (id, score) => {
    setOverrideScores((prev) => ({ ...prev, [id]: score }));
  };

  const disputedSubmissions = submissions.filter((sub) => sub.status === 'Disputed');

  return (
    <Card className="p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-red-100 p-2.5 rounded-lg">
          <AlertTriangle size={20} className="text-red-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Dispute Inbox</h2>
          <p className="text-sm text-slate-600">Review and resolve student grade disputes</p>
        </div>
      </div>

      <div className="space-y-5">
        {disputedSubmissions.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto text-4xl text-slate-300 mb-3">✨</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">No disputes to review</h3>
            <p className="text-sm text-slate-600">All submissions are running smoothly.</p>
          </div>
        ) : (
          disputedSubmissions.map((sub) => {
            const worksheet = worksheets.find((w) => w.id === sub.worksheetId);
            return (
              <div
                key={sub.id}
                className="border border-red-200 rounded-xl p-5 bg-red-50/50 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText size={16} className="text-slate-500" />
                      <h3 className="font-semibold text-slate-900">{worksheet?.title}</h3>
                      <Badge variant="danger" className="text-xs">
                        <AlertTriangle size={12} className="mr-1 inline" />
                        Disputed
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-slate-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{sub.studentName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>2 days ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">{sub.score}/100</div>
                    <div className="text-xs text-slate-600">AI Score</div>
                  </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-4 mb-4 border border-indigo-200">
                  <div className="flex items-start space-x-2 mb-2">
                    <MessageSquare size={14} className="text-indigo-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-900 mb-1">AI Feedback</p>
                      <p className="text-sm text-indigo-700">{sub.aiFeedback}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 rounded-lg p-4 mb-4 border border-red-200">
                  <div className="flex items-start space-x-2">
                    <Flag size={14} className="text-red-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-red-900 mb-1">Dispute Reason</p>
                      <p className="text-sm text-red-700">{sub.disputeReason}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center space-x-3">
                    <label className="text-sm font-semibold text-slate-700">Override Score:</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={overrideScores[sub.id] || ''}
                      onChange={(e) => handleOverrideChange(sub.id, parseInt(e.target.value))}
                      placeholder="0-100"
                      className="w-24 h-10 text-center"
                    />
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => resolveDispute(sub.id, 'approve', overrideScores[sub.id])}
                      className="flex-1 md:flex-auto"
                    >
                      <CheckCircle size={16} className="mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => resolveDispute(sub.id, 'reject', overrideScores[sub.id])}
                      className="flex-1 md:flex-auto"
                    >
                      <XCircle size={16} className="mr-2" />
                      Reject
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => reportToAdmin(sub)}
                      className="flex-1 md:flex-auto"
                    >
                      <Flag size={16} className="mr-2" />
                      Escalate
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

export default DisputeInbox;