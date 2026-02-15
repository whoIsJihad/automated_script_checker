import { useState } from 'react';
import { BookOpen, Users, Calendar, Zap, Clock } from 'lucide-react';
import { Card, Badge, EmptyState } from './UI';
import WorksheetDetails from './WorksheetDetails';

function ActiveWorksheetsList({ worksheets, submissions, latestWorksheetId }) {
  const [selectedWorksheet, setSelectedWorksheet] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const activeWorksheets = worksheets.filter((w) => w.status === 'Open');

  const openWorksheetDetails = (worksheet) => {
    setSelectedWorksheet(worksheet);
    setIsDetailsModalOpen(true);
  };

  const closeWorksheetDetails = () => {
    setIsDetailsModalOpen(false);
    setSelectedWorksheet(null);
  };

  if (activeWorksheets.length === 0) {
    return (
      <Card className="p-8">
        <EmptyState
          icon={BookOpen}
          title="No active worksheets"
          description="Create your first worksheet to get started"
        />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {activeWorksheets.map((worksheet) => (
        <div onClick={() => openWorksheetDetails(worksheet)} className="cursor-pointer">
          <Card 
            key={worksheet.id} 
            className={`p-6 transition-all duration-300 ${
              worksheet.id === latestWorksheetId 
                ? 'ring-2 ring-emerald-500 ring-opacity-50 bg-emerald-50/30 animate-in slide-in-from-bottom-2' 
                : ''
            }`}
          >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">{worksheet.title}</h3>
              <p className="text-sm text-slate-600 mb-3">{worksheet.subject}</p>

              <div className="flex items-center gap-3 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{worksheet.submissions || 0} submissions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{worksheet.deadline || 'No deadline'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={14} />
                  <span>{worksheet.assignedLLM}</span>
                </div>
              </div>
            </div>

            <Badge variant="success" className="ml-4 flex-shrink-0">
              Active
            </Badge>
          </div>

          {worksheet.submissions > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex justify-between text-xs text-slate-600 mb-2">
                <span className="font-medium">Progress</span>
                <span>{worksheet.submissions}/{worksheet.expectedSubmissions || worksheet.submissions}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 transition-all duration-300"
                  style={{ width: `${Math.min((worksheet.submissions / (worksheet.expectedSubmissions || worksheet.submissions)) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </Card>
        </div>
      ))}
      <WorksheetDetails
        worksheet={selectedWorksheet}
        submissions={submissions}
        isOpen={isDetailsModalOpen}
        onClose={closeWorksheetDetails}
        role="teacher"
      />
    </div>
  );
}

export default ActiveWorksheetsList;