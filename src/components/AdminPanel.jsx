import { useState, useMemo } from 'react';
import { Activity, BarChart3, FileText, Zap, TrendingUp } from 'lucide-react';
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
        <StatCard label="Total Gradings" value={submissions.length} icon={BarChart3} color="indigo" />
        <StatCard label="Token Usage" value={(tokenUsage / 1000).toFixed(1) + 'K'} icon={Zap} color="amber" />
        <StatCard label="Dispute Rate" value={modelStats.length > 0 ? (modelStats.reduce((sum, s) => sum + parseFloat(s.disputeRate), 0) / modelStats.length).toFixed(1) + '%' : '0%'} icon={TrendingUp} color="emerald" />
      </div>

      {/* Model Performance Table */}
      <Card className="p-6">
        <SectionHeader title="Model Performance" description="Accuracy metrics by AI model" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Model</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Gradings</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Dispute Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">Reports</th>
              </tr>
            </thead>
            <tbody>
              {modelStats.map((stat) => (
                <tr key={stat.model} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">{stat.model}</td>
                  <td className="py-3 px-4 text-slate-600">{stat.total}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600" style={{ width: `${Math.min(stat.disputeRate * 10, 100)}%` }} />
                      </div>
                      <span className="text-slate-600 text-xs">{stat.disputeRate}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{stat.disputed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Activity Feed */}
      <Card className="p-6">
        <SectionHeader title="Teacher Reports" description="Recent feedback from instructors" />
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredReports.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Activity size={32} className="mx-auto mb-3 text-slate-300" />
              <p>No reports yet</p>
            </div>
          ) : (
            filteredReports.map((report, index) => (
              <div key={index} className="p-4 bg-amber-50 border border-amber-200 rounded-lg hover:border-amber-300 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-slate-900">{report.subject}</span>
                  <span className="text-xs text-slate-500">{new Date(report.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-sm text-slate-700">{report.disputeReason}</p>
                <p className="text-xs text-slate-500 mt-2">LLM: {report.llmUsed}</p>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Global Prompt Editor */}
      <Card className="p-6">
        <SectionHeader title="Global System Prompt" description="Configure AI grading instructions" />
        <div className="space-y-4">
          <textarea
            value={globalPrompt}
            onChange={(e) => setGlobalPrompt(e.target.value)}
            placeholder="Enter global grading instructions..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
            rows="5"
          />
          <Button variant="primary">Save Changes</Button>
        </div>
      </Card>

      {/* Usage & Cost */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-2">Token Usage</h3>
          <p className="text-3xl font-bold text-indigo-600 mb-1">{(tokenUsage / 1000).toFixed(1)}K</p>
          <p className="text-sm text-slate-600">Tokens consumed this month</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-slate-900 mb-2">Estimated Cost</h3>
          <p className="text-3xl font-bold text-emerald-600 mb-1">${(tokenUsage * 0.0001).toFixed(2)}</p>
          <p className="text-sm text-slate-600">Based on $0.0001 per token</p>
        </Card>
      </div>
    </div>
  );
}

export default AdminPanel;