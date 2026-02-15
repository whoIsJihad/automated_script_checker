import { useState, useMemo } from 'react';
import { Activity, BarChart3, FileText, Zap, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, Button, SectionHeader, StatCard } from './UI';

function AdminPanel({ worksheets, submissions, adminReports, searchQuery }) {
  const [globalPrompt, setGlobalPrompt] = useState(
    'Grade student submissions based on accuracy, logic, and completeness. Provide constructive feedback.'
  );

  // Filter admin reports based on search query
  const filteredReports = adminReports.filter(report => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const worksheet = worksheets.find(w => w.id === report.worksheetId);
    return (
      report.studentName.toLowerCase().includes(query) ||
      report.subject.toLowerCase().includes(query) ||
      worksheet?.title.toLowerCase().includes(query) ||
      report.llmUsed.toLowerCase().includes(query) ||
      report.disputeReason.toLowerCase().includes(query)
    );
  });

  // Calculate model stats
  const modelStats = useMemo(() => {
    const stats = {};
    submissions.forEach(sub => {
      const worksheet = worksheets.find(w => w.id === sub.worksheetId);
      const llm = worksheet?.assignedLLM || 'Unknown';
      if (!stats[llm]) {
        stats[llm] = { total: 0, disputed: 0 };
      }
      stats[llm].total += 1;
      if (sub.status === 'Disputed' || sub.isDisputed) {
        stats[llm].disputed += 1;
      }
    });
    return Object.entries(stats).map(([model, data]) => ({
      model,
      total: data.total,
      disputed: data.disputed,
      disputeRate: data.total > 0 ? ((data.disputed / data.total) * 100).toFixed(1) : 0
    }));
  }, [submissions, worksheets]);

  const tokenUsage = useMemo(() => {
    return modelStats.reduce((acc, stat) => acc + stat.total * 1000, 0);
  }, [modelStats]);

  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 size={24} className="text-blue-600" />
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Total</p>
            </div>
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">AI Gradings</h3>
          <p className="text-4xl font-bold text-blue-600 mb-1">{submissions.length}</p>
          <p className="text-sm text-slate-600">Submissions processed</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-100 p-3 rounded-lg">
              <Zap size={24} className="text-amber-600" />
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Average</p>
            </div>
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Token Usage</h3>
          <p className="text-4xl font-bold text-amber-600 mb-1">{(tokenUsage / 1000).toFixed(1)}K</p>
          <p className="text-sm text-slate-600">Per grading session</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <TrendingUp size={24} className="text-emerald-600" />
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Platform</p>
            </div>
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Dispute Rate</h3>
          <p className="text-4xl font-bold text-emerald-600 mb-1">
            {modelStats.length > 0 ? (modelStats.reduce((sum, s) => sum + parseFloat(s.disputeRate), 0) / modelStats.length).toFixed(1) : '0'}%
          </p>
          <p className="text-sm text-slate-600">Average across all models</p>
        </Card>
      </div>

      {/* Model Performance Table */}
      <Card className="p-6">
        <SectionHeader title="AI Model Performance" description="Accuracy metrics and dispute rates by model" />
        <div className="overflow-x-auto">
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 text-sm">AI Model</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 text-sm">Gradings</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 text-sm">Dispute Rate</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 text-sm">Reports</th>
                </tr>
              </thead>
              <tbody>
                {modelStats.map((stat) => (
                  <tr key={stat.model} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {stat.model.split(' ')[0][0]}
                          </span>
                        </div>
                        <span className="font-medium text-slate-900">{stat.model}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-900">{stat.total}</span>
                      <span className="text-slate-500 text-sm ml-1">gradings</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-24">
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min(stat.disputeRate * 10, 100)}%` }}
                            />
                          </div>
                        </div>
                        <span className={`text-sm font-medium ${
                          stat.disputeRate < 5 ? 'text-green-600' :
                          stat.disputeRate < 15 ? 'text-amber-600' : 'text-red-600'
                        }`}>
                          {stat.disputeRate}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-900">{stat.disputed}</span>
                      <span className="text-slate-500 text-sm ml-1">reports</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Teacher Reports */}
      <Card className="p-6">
        <SectionHeader title="Teacher Reports" description="Feedback and issues reported by instructors" />
        <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto text-4xl text-slate-300 mb-3">📋</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">No reports yet</h3>
              <p className="text-sm text-slate-600">Teacher feedback will appear here</p>
            </div>
          ) : (
            filteredReports.map((report, index) => {
              const worksheet = worksheets.find(w => w.id === report.worksheetId);
              return (
                <div key={index} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-all duration-200 hover:border-slate-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <AlertTriangle size={16} className="text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 text-lg">{worksheet?.title || 'Unknown Worksheet'}</h3>
                          <p className="text-sm text-slate-600">{report.subject} • {report.studentName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <FileText size={12} />
                          {report.llmUsed}
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity size={12} />
                          {new Date(report.timestamp).toLocaleDateString()} at {new Date(report.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                        Teacher Report
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Issue Reported */}
                    <div className="bg-gradient-to-r from-red-50 to-red-100/50 rounded-xl p-4 border border-red-200/50">
                      <div className="flex items-start gap-3">
                        <div className="bg-red-100 p-2 rounded-lg flex-shrink-0">
                          <AlertTriangle size={16} className="text-red-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-red-800 mb-2 flex items-center gap-2">
                            Issue Reported
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          </h4>
                          <p className="text-sm text-red-700 leading-relaxed">{report.disputeReason}</p>
                        </div>
                      </div>
                    </div>

                    {/* AI Feedback Given */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-xl p-4 border border-blue-200/50">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                          <FileText size={16} className="text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-blue-800 mb-2">AI Feedback Given</h4>
                          <div className="bg-white/60 rounded-lg p-3 border border-blue-200/30">
                            <p className="text-sm text-blue-700 leading-relaxed italic">"{report.aiFeedback}"</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recommended Action */}
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50/50 rounded-xl p-4 border border-emerald-200/50">
                      <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg flex-shrink-0">
                          <TrendingUp size={16} className="text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-emerald-800 mb-2 flex items-center gap-2">
                            Recommended Action
                            <div className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">
                              Priority
                            </div>
                          </h4>
                          <p className="text-sm text-emerald-700 leading-relaxed">{report.recommendedAction}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* Global Prompt Editor */}
      <Card className="p-6">
        <SectionHeader title="AI System Configuration" description="Configure global grading instructions and AI behavior" />
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2.5 rounded-lg">
                <Zap size={20} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Global Grading Prompt</h3>
                <p className="text-sm text-slate-600">Instructions that apply to all AI grading across the platform</p>
              </div>
            </div>
            <textarea
              value={globalPrompt}
              onChange={(e) => setGlobalPrompt(e.target.value)}
              placeholder="Enter global grading instructions that will be used by all AI models..."
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none shadow-sm"
              rows="6"
            />
            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-slate-500">
                {globalPrompt.length} characters • Applies to all new grading sessions
              </p>
              <Button variant="primary" size="sm">Save Configuration</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Usage Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Zap size={24} className="text-indigo-600" />
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wide">This Month</p>
            </div>
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">AI Token Usage</h3>
          <p className="text-4xl font-bold text-indigo-600 mb-1">{(tokenUsage / 1000).toFixed(1)}K</p>
          <p className="text-sm text-slate-600 mb-3">Tokens consumed by AI models</p>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((tokenUsage / 100000) * 100, 100)}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-2">Monthly usage progress</p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-100 p-3 rounded-lg">
              <TrendingUp size={24} className="text-emerald-600" />
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Estimated</p>
            </div>
          </div>
          <h3 className="font-semibold text-slate-900 mb-2">Monthly Cost</h3>
          <p className="text-4xl font-bold text-emerald-600 mb-1">${(tokenUsage * 0.0001).toFixed(2)}</p>
          <p className="text-sm text-slate-600 mb-3">Based on $0.0001 per token</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((tokenUsage * 0.0001 / 50) * 100, 100)}%` }}
              />
            </div>
            <span className="text-xs text-slate-500">Budget</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Under monthly budget</p>
        </Card>
      </div>
    </div>
  );
}

export default AdminPanel;