import { Bot, CheckCircle2, FileText, Brain, Sparkles } from 'lucide-react';
import { Card } from './UI';

function SubmissionProgressModal({ submitting, progressStep, progressTexts }) {
  if (!submitting) return null;

  const steps = [
    { icon: FileText, color: 'text-blue-500', text: 'Processing images...' },
    { icon: Brain, color: 'text-purple-500', text: 'AI analyzing...' },
    { icon: Sparkles, color: 'text-amber-500', text: 'Generating feedback...' },
  ];

  const progress = ((progressStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full shadow-xl">
        <div className="p-8 text-center">
          {/* Animated Icon */}
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-spin" style={{ animationDuration: '2s' }}>
              <Bot size={32} className="text-white" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-2">Evaluating...</h3>
          <p className="text-slate-600 text-sm mb-6">{progressTexts[progressStep]}</p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2 mb-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-2 text-sm">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index <= progressStep;
              return (
                <div key={index} className={`flex items-center gap-2 py-1 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                  <StepIcon size={14} className={isActive ? step.color : 'text-slate-400'} />
                  <span className="text-xs">{step.text}</span>
                  {isActive && <CheckCircle2 size={14} className="ml-auto text-emerald-500" />}
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SubmissionProgressModal;