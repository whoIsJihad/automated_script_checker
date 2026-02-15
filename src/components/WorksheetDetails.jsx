import { useState } from 'react';
import { X, Calendar, Clock, User, FileText, Target, Tag, BookOpen, TrendingUp, Users, AlertTriangle, CheckCircle2, BarChart3 } from 'lucide-react';
import { Card, Button, Badge, Modal } from './UI';

function WorksheetDetails({ worksheet, submissions, isOpen, onClose, role }) {
  if (!worksheet || !isOpen) return null;

  // Calculate stats for teacher view
  const worksheetSubmissions = submissions.filter(sub => sub.worksheetId === worksheet.id);
  const gradedSubmissions = worksheetSubmissions.filter(sub => sub.status === 'Graded');
  const averageScore = gradedSubmissions.length > 0
    ? Math.round(gradedSubmissions.reduce((sum, sub) => sum + sub.score, 0) / gradedSubmissions.length)
    : 0;
  const completionRate = Math.round((worksheetSubmissions.length / (worksheet.expectedSubmissions || worksheetSubmissions.length)) * 100);
  const disputeRate = Math.round((worksheetSubmissions.filter(sub => sub.isDisputed).length / worksheetSubmissions.length) * 100) || 0;

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-800',
      'Intermediate': 'bg-yellow-100 text-yellow-800',
      'Advanced': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Open': 'bg-green-100 text-green-800',
      'Closed': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="p-6">
          <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <BookOpen size={24} className="text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{worksheet.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{worksheet.subject}</Badge>
                  <Badge className={getDifficultyColor(worksheet.difficulty)}>{worksheet.difficulty}</Badge>
                  <Badge className={getStatusColor(worksheet.status)}>{worksheet.status}</Badge>
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Description */}
        <Card className="p-4">
          <h3 className="font-semibold text-slate-900 mb-2">Description</h3>
          <p className="text-slate-700 leading-relaxed">{worksheet.description}</p>
        </Card>

        {/* Instructions */}
        <Card className="p-4">
          <h3 className="font-semibold text-slate-900 mb-2">Instructions</h3>
          <p className="text-slate-700 leading-relaxed">{worksheet.instructions}</p>
        </Card>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-slate-500" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Due Date</p>
                <p className="text-sm font-semibold text-slate-900">
                  {new Date(worksheet.dueDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock size={18} className="text-slate-500" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Estimated Time</p>
                <p className="text-sm font-semibold text-slate-900">{worksheet.estimatedTime} minutes</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Target size={18} className="text-slate-500" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">AI Model</p>
                <p className="text-sm font-semibold text-slate-900">{worksheet.assignedLLM}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <User size={18} className="text-slate-500" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Created By</p>
                <p className="text-sm font-semibold text-slate-900">{worksheet.createdBy}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-slate-500" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">File</p>
                <p className="text-sm font-semibold text-slate-900">
                  {worksheet.file || 'No file attached'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Tag size={18} className="text-slate-500" />
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Tags</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {worksheet.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Teacher Stats */}
        {role === 'teacher' && (
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <BarChart3 size={20} />
              Performance Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">{worksheetSubmissions.length}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Total Submissions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{averageScore}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{disputeRate}%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Dispute Rate</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Submission Progress</span>
                <span>{worksheetSubmissions.length}/{worksheet.expectedSubmissions || worksheetSubmissions.length}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-3 transition-all duration-300"
                  style={{ width: `${Math.min(completionRate, 100)}%` }}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Recent Submissions (Teacher View) */}
        {role === 'teacher' && worksheetSubmissions.length > 0 && (
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Recent Submissions</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {worksheetSubmissions.slice(0, 10).map((submission) => (
                <div key={submission.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-indigo-700">
                        {submission.studentName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{submission.studentName}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(submission.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      submission.status === 'Graded' ? 'success' :
                      submission.status === 'Disputed' ? 'danger' : 'warning'
                    }>
                      {submission.status}
                    </Badge>
                    {submission.score && (
                      <span className="text-sm font-semibold text-slate-900">{submission.score}/100</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Student Submission Details */}
        {role === 'student' && (
          <Card className="p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Your Submission</h3>
            {(() => {
              const studentSubmission = worksheetSubmissions.find(sub => sub.studentName === 'Alice'); // Assuming Alice is current student
              if (!studentSubmission) {
                return (
                  <div className="text-center py-8">
                    <FileText size={48} className="text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">You haven't submitted this worksheet yet.</p>
                  </div>
                );
              }

              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant={
                      studentSubmission.status === 'Graded' ? 'success' :
                      studentSubmission.status === 'Disputed' ? 'danger' : 'warning'
                    }>
                      {studentSubmission.status}
                    </Badge>
                    {studentSubmission.score && (
                      <div className="text-right">
                        <div className="text-3xl font-bold text-indigo-600">{studentSubmission.score}</div>
                        <div className="text-xs text-slate-500">/100</div>
                      </div>
                    )}
                  </div>

                  {studentSubmission.aiFeedback && (
                    <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                      <p className="text-sm font-semibold text-indigo-700 mb-2">AI Feedback</p>
                      <p className="text-sm text-indigo-900 leading-relaxed">{studentSubmission.aiFeedback}</p>
                    </div>
                  )}

                  {studentSubmission.detailedFeedback && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <CheckCircle2 size={18} className="text-green-600 mb-2" />
                        <p className="text-xs font-semibold text-green-700 mb-1">Strengths</p>
                        <ul className="text-xs text-green-800 space-y-1">
                          {studentSubmission.detailedFeedback.strengths.map((strength, index) => (
                            <li key={index}>• {strength}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                        <AlertTriangle size={18} className="text-yellow-600 mb-2" />
                        <p className="text-xs font-semibold text-yellow-700 mb-1">Areas for Improvement</p>
                        <ul className="text-xs text-yellow-800 space-y-1">
                          {studentSubmission.detailedFeedback.weaknesses.map((weakness, index) => (
                            <li key={index}>• {weakness}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <TrendingUp size={18} className="text-blue-600 mb-2" />
                        <p className="text-xs font-semibold text-blue-700 mb-1">Suggestions</p>
                        <ul className="text-xs text-blue-800 space-y-1">
                          {studentSubmission.detailedFeedback.suggestions.map((suggestion, index) => (
                            <li key={index}>• {suggestion}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-slate-600 pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Submitted {new Date(studentSubmission.submittedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{studentSubmission.timeSpent} minutes spent</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </Card>
        )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default WorksheetDetails;