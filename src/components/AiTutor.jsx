import { useState } from 'react';
import { BookOpen, Cpu, CreditCard, Send, Plus, Zap } from 'lucide-react';

function AiTutor({ curriculum }) {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showWorksheetGen, setShowWorksheetGen] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const [topic, setTopic] = useState('');
  const [generatedWorksheet, setGeneratedWorksheet] = useState(null);
  const [premiumMode, setPremiumMode] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const userMessage = { type: 'user', text: inputMessage };
    setMessages(prev => [...prev, userMessage]);

    // Mock AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        text: `Based on ${selectedChapter || 'general knowledge'}, here's my response to your question: "${inputMessage}". This is a contextual answer grounded in the textbook.`,
        grounding: selectedChapter ? `Answering based on ${selectedChapter} textbook` : 'General knowledge'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage('');
  };

  const handleSelfSubmit = () => {
    const submitMessage = { type: 'user', text: 'Self-submitting my answer for practice.' };
    setMessages(prev => [...prev, submitMessage]);

    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        text: 'This is a practice attempt. Your teacher will not see this. Here is how to improve: Focus on the key concepts and provide more detailed explanations.',
        grounding: selectedChapter ? `Answering based on ${selectedChapter} textbook` : 'Practice mode'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleGenerateWorksheet = () => {
    // Mock generated worksheet
    const mockProblems = [
      'Solve for x: 2x + 3 = 7',
      'What is the structure of a cell?',
      'Explain the water cycle.'
    ];
    setGeneratedWorksheet({
      difficulty,
      topic: topic || selectedChapter || 'General',
      problems: mockProblems.slice(0, 3)
    });
    setShowWorksheetGen(false);
  };

  const handlePremiumToggle = (checked) => {
    if (checked) {
      setShowPaymentModal(true);
    } else {
      setPremiumMode(false);
    }
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPremiumMode(false);
  };

  return (
    <div className="space-y-8">
      {/* Curriculum Navigator */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BookOpen size={20} className="mr-2" />
          Curriculum Navigator
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSubject('');
                setSelectedChapter('');
              }}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Class</option>
              {curriculum.classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSelectedChapter('');
              }}
              className="w-full border border-gray-300 rounded px-3 py-2"
              disabled={!selectedClass}
            >
              <option value="">Select Subject</option>
              {selectedClass && curriculum.subjects[selectedClass]?.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Chapter</label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              disabled={!selectedSubject}
            >
              <option value="">Select Chapter</option>
              {selectedSubject && curriculum.chapters[selectedSubject]?.map(chap => (
                <option key={chap} value={chap}>{chap}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Context-Aware Chat */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Cpu size={20} className="mr-2" />
          AI Tutor Chat
        </h2>
        {selectedChapter && (
          <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded">
            <span className="text-sm text-blue-700">Answering based on {selectedChapter} textbook</span>
          </div>
        )}
        <div className="h-64 overflow-y-auto border border-gray-300 rounded p-4 mb-4 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded ${msg.type === 'user' ? 'bg-blue-100 ml-8' : 'bg-gray-100 mr-8'}`}>
              <p className="text-sm">{msg.text}</p>
              {msg.grounding && <p className="text-xs text-gray-500 mt-1">{msg.grounding}</p>}
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            placeholder="Ask a question..."
          />
          <button onClick={handleSendMessage} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200">
            <Send size={16} />
          </button>
          <button onClick={handleSelfSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-200">
            Self-Submit
          </button>
        </div>
      </div>

      {/* AI Worksheet Generator */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">AI Worksheet Generator</h2>
        <button
          onClick={() => setShowWorksheetGen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-200 flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Generate Practice Worksheet
        </button>
        {generatedWorksheet && (
          <div className="mt-4 p-4 border border-gray-300 rounded">
            <h3 className="font-medium">Generated Worksheet</h3>
            <p className="text-sm text-gray-600">Difficulty: {generatedWorksheet.difficulty} | Topic: {generatedWorksheet.topic}</p>
            <ul className="mt-2 space-y-1">
              {generatedWorksheet.problems.map((problem, index) => (
                <li key={index} className="text-sm">• {problem}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Model/Payment Toggle */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Zap size={20} className="mr-2" />
          Model Selection
        </h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Current: {premiumMode ? 'GPT-4o (Premium)' : 'Basic Model'}</span>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={premiumMode}
              onChange={(e) => handlePremiumToggle(e.target.checked)}
              className="mr-2"
            />
            Switch to Premium Model
          </label>
        </div>
      </div>

      {/* Worksheet Generator Modal */}
      {showWorksheetGen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Generate Worksheet</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Topic</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="e.g., Algebra, Cell Structure"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowWorksheetGen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateWorksheet}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <CreditCard size={48} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="text-lg font-semibold mb-2">Insufficient Credits</h3>
            <p className="text-gray-600 mb-4">You need to top up your credits to use the Premium Model.</p>
            <button
              onClick={closePaymentModal}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200"
            >
              Top Up Credits
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiTutor;