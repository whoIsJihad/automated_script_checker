import { useState } from 'react';
import { Bot, Settings, Eye, EyeOff, Zap, Shield, Brain, ChevronDown, ChevronUp, Target, FileText, MessageSquare, Award } from 'lucide-react';
import { Card, Badge, Button, Input } from './UI';

function AISettings({ showAI, setShowAI, model, setModel }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [evaluationCriteria, setEvaluationCriteria] = useState({
    accuracy: 40,
    logic: 30,
    presentation: 20,
    completeness: 10
  });
  const [minPassingScore, setMinPassingScore] = useState(60);
  const [customPrompt, setCustomPrompt] = useState('');
  const [enableDetailedFeedback, setEnableDetailedFeedback] = useState(true);
  const models = [
    {
      id: 'GPT-4o',
      name: 'GPT-4o (Standard)',
      description: 'Balanced performance and accuracy',
      icon: <Zap size={16} className="text-purple-500" />,
      recommended: false
    },
    {
      id: 'Gemini-1.5',
      name: 'Gemini 1.5 (High Accuracy)',
      description: 'Best for complex mathematical problems',
      icon: <Brain size={16} className="text-blue-500" />,
      recommended: true
    },
    {
      id: 'Claude-3',
      name: 'Claude 3 (Balanced)',
      description: 'Excellent for detailed explanations',
      icon: <Shield size={16} className="text-green-500" />,
      recommended: false
    }
  ];

  return (
    <Card className="p-6 md:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-purple-100 p-2.5 rounded-lg">
          <Bot size={20} className="text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">AI Evaluation Settings</h2>
          <p className="text-sm text-slate-600">Configure AI grading preferences and model selection</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* AI Feedback Toggle */}
        <div className="bg-indigo-50/50 rounded-xl p-5 border border-indigo-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {showAI ? (
                <Eye size={20} className="text-green-600" />
              ) : (
                <EyeOff size={20} className="text-slate-400" />
              )}
              <div>
                <h3 className="font-semibold text-slate-900">Show AI Feedback to Students</h3>
                <p className="text-sm text-slate-600 mt-0.5">Students will see AI-generated feedback alongside grades</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showAI}
                onChange={(e) => setShowAI(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>
          </div>
        </div>

        {/* AI Model Selection */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Settings size={18} className="text-slate-700" />
            <h3 className="text-base font-semibold text-slate-900">Default AI Model</h3>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {models.map((m) => (
              <label
                key={m.id}
                className={`relative flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                  model === m.name
                    ? 'border-purple-300 bg-purple-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <input
                  type="radio"
                  name="ai-model"
                  value={m.name}
                  checked={model === m.name}
                  onChange={(e) => setModel(e.target.value)}
                  className="sr-only"
                />
                <div className="flex items-center space-x-4 flex-1">
                  <div className={`p-2.5 rounded-lg ${model === m.name ? 'bg-purple-100' : 'bg-slate-100'}`}>
                    {m.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-900">{m.name}</span>
                      {m.recommended && (
                        <Badge variant="success" className="text-xs font-semibold">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{m.description}</p>
                  </div>
                </div>
                <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all ${
                  model === m.name
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-slate-300'
                }`}>
                  {model === m.name && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50/50 hover:from-blue-100 hover:to-indigo-100/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Target size={16} className="text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-slate-900">Advanced Evaluation Settings</h4>
                <p className="text-sm text-slate-600">Configure grading criteria and evaluation parameters</p>
              </div>
            </div>
            {showAdvanced ? (
              <ChevronUp size={20} className="text-slate-500" />
            ) : (
              <ChevronDown size={20} className="text-slate-500" />
            )}
          </button>

          {showAdvanced && (
            <div className="p-6 space-y-6 bg-white">
              {/* Grading Criteria Weights */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Award size={18} className="text-slate-700" />
                  <h5 className="text-base font-semibold text-slate-900">Grading Criteria Weights (%)</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(evaluationCriteria).map(([criterion, weight]) => (
                    <div key={criterion} className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 capitalize">
                        {criterion}
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={weight}
                          onChange={(e) => {
                            const newWeight = parseInt(e.target.value);
                            setEvaluationCriteria(prev => ({
                              ...prev,
                              [criterion]: newWeight
                            }));
                          }}
                          className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-sm font-semibold text-slate-900 w-8">{weight}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Total: {Object.values(evaluationCriteria).reduce((a, b) => a + b, 0)}% 
                  {Object.values(evaluationCriteria).reduce((a, b) => a + b, 0) !== 100 && (
                    <span className="text-red-500 ml-1">(Should total 100%)</span>
                  )}
                </p>
              </div>

              {/* Minimum Passing Score */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Target size={18} className="text-slate-700" />
                  <h5 className="text-base font-semibold text-slate-900">Minimum Passing Score</h5>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={minPassingScore}
                    onChange={(e) => setMinPassingScore(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-slate-900">{minPassingScore}%</span>
                    <Badge variant={minPassingScore >= 60 ? "success" : "warning"} className="text-xs">
                      {minPassingScore >= 60 ? "Standard" : "Low"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Detailed Feedback Toggle */}
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageSquare size={18} className="text-slate-600" />
                    <div>
                      <h6 className="font-medium text-slate-900">Enable Detailed Feedback</h6>
                      <p className="text-sm text-slate-600">Provide comprehensive explanations for grades</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableDetailedFeedback}
                      onChange={(e) => setEnableDetailedFeedback(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>

              {/* Custom Evaluation Prompt */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <FileText size={18} className="text-slate-700" />
                  <h5 className="text-base font-semibold text-slate-900">Custom Evaluation Prompt</h5>
                </div>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Enter custom instructions for AI evaluation (optional)..."
                  className="w-full h-24 p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <p className="text-xs text-slate-500 mt-2">
                  Leave empty to use default evaluation criteria. Custom prompts override standard grading rules.
                </p>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4 border-t border-slate-200">
                <Button variant="primary" size="sm">
                  Save Advanced Settings
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default AISettings;