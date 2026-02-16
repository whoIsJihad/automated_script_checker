import { useState } from 'react';
import { Calendar, Upload, Bot, Plus } from 'lucide-react';
import { Card, Button, Input } from './UI';

function WorksheetForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState(null);
  const [model, setModel] = useState('GPT-4o (Standard)');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { title, subject, deadline, file, model, instructions };
    onSubmit(data);
    setTitle('');
    setSubject('');
    setDeadline('');
    setFile(null);
    setModel('GPT-4o (Standard)');
    setInstructions('');
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
        <Plus size={20} className="mr-2" />
        Create New Assignment
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Title"
          placeholder="e.g., Algebra Quiz Chapter 5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Input
          label="Subject"
          placeholder="e.g., Mathematics"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <Input
          label="Deadline (Optional)"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            <Bot size={16} className="inline mr-2" />
            AI Model
          </label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all appearance-none"
          >
            <option>GPT-4o (Standard)</option>
            <option>Gemini 1.5 (High Accuracy)</option>
            <option>Claude 3 (Balanced)</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            <Upload size={16} className="inline mr-2" />
            Upload File (Optional)
          </label>
          <div className="relative border-2 border-dashed border-indigo-300 rounded-xl p-8 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-center cursor-pointer bg-slate-50">
            <Upload size={28} className="mx-auto text-indigo-400 mb-2" />
            <p className="text-sm text-slate-700 font-medium">Click to upload or drag and drop</p>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
          {file && <p className="text-xs text-green-600 mt-2 font-semibold">✓ {file.name}</p>}
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">
            Special Instructions
          </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Any special grading instructions..."
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all resize-none"
            rows="3"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full h-11">
          Create Worksheet
        </Button>
      </form>
    </Card>
  );
}

export default WorksheetForm;