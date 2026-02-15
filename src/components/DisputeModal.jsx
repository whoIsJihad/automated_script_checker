import { useState } from 'react';
import { AlertTriangle, MessageSquare, X, Flag } from 'lucide-react';
import { Card, Button } from './UI';

function DisputeModal({ open, onClose, onSubmit, submission }) {
  const [disputeReason, setDisputeReason] = useState('');

  const handleSubmit = () => {
    if (disputeReason.trim() && submission) {
      onSubmit(submission.id, disputeReason.trim());
      setDisputeReason('');
      onClose();
    }
  };

  if (!open || !submission) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-2 rounded-lg">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Report Issue</h3>
              <p className="text-xs text-slate-500">Current Grade: {submission?.score}/100</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <label className="block text-sm font-medium text-slate-700 mb-3">
            <MessageSquare size={16} className="inline mr-2" />
            Describe the issue
          </label>
          <textarea
            value={disputeReason}
            onChange={(e) => setDisputeReason(e.target.value)}
            placeholder="Explain why you believe this grade is incorrect..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
            rows="4"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-slate-200">
          <Button variant="ghost" onClick={onClose} size="sm">
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleSubmit}
            disabled={!disputeReason.trim()}
            size="sm"
          >
            <Flag size={14} className="inline mr-1" />
            Submit
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default DisputeModal;