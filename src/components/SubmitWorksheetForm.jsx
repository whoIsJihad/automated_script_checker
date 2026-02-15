import { useState } from 'react';
import { Upload, X, FileText, Camera, Send } from 'lucide-react';
import { Card, Button, Select } from './UI';

function SubmitWorksheetForm({ worksheets, onSubmit }) {
  const [selectedWorksheet, setSelectedWorksheet] = useState('');
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!selectedWorksheet || images.length === 0) return;
    onSubmit({ selectedWorksheet, images });
    setSelectedWorksheet('');
    setImages([]);
  };

  const openWorksheets = worksheets.filter((w) => w.status === 'Open');

  return (
    <Card className="p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Submit Worksheet</h3>

      <div className="space-y-6">
        {/* Worksheet Selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            <FileText size={16} className="inline mr-2" />
            Select Assignment
          </label>
          <select
            value={selectedWorksheet}
            onChange={(e) => setSelectedWorksheet(e.target.value)}
            className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all appearance-none"
          >
            <option value="">Choose an assignment...</option>
            {openWorksheets.map((w) => (
              <option key={w.id} value={w.id}>
                {w.title} - {w.subject}
              </option>
            ))}
          </select>
          {openWorksheets.length === 0 && (
            <p className="text-xs text-slate-500 mt-2 font-medium">No open assignments available</p>
          )}
        </div>

        {/* Multi-Image Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            <Camera size={16} className="inline mr-2" />
            Upload Images ({images.length})
          </label>

          {/* Image Preview Grid */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-slate-200 shadow-sm"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-all"
                  >
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Upload Area */}
          <div className="relative border-2 border-dashed border-indigo-300 rounded-xl p-8 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all bg-slate-50 text-center cursor-pointer">
            <Upload size={32} className="mx-auto mb-3 text-indigo-400" />
            <p className="text-sm text-slate-700 font-medium">Drag images here or click to browse</p>
            <p className="text-xs text-slate-500 mt-1.5 font-medium">JPG, PNG up to 5MB</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!selectedWorksheet || images.length === 0}
          variant={selectedWorksheet && images.length > 0 ? 'primary' : 'secondary'}
          className="w-full"
        >
          <Send size={16} className="inline mr-2" />
          Submit Assignment
        </Button>
      </div>
    </Card>
  );
}

export default SubmitWorksheetForm;