import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const LogHours = () => {
  const [formData, setFormData] = useState({
    activityName: '',
    date: '',
    hours: '',
    milestone: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sample activities (would come from your saved activities)
  const savedActivities = [
    'Future Business Leaders of America (FBLA)',
    'High School Basketball Team',
    'National Honor Society',
    'Environmental Club',
    'Student Government'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.activityName || !formData.date || !formData.hours) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Hours Logged!",
      description: `${formData.hours} hours logged for ${formData.activityName}.`,
    });
    
    // Reset form
    setFormData({
      activityName: '',
      date: '',
      hours: '',
      milestone: ''
    });
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f7fa' }}>
      {/* Navigation */}
      <div className="border-b bg-white p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link to="/" className="text-2xl font-poppins font-black" style={{ color: '#5b55f7' }}>
            EC-AI
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-sm font-poppins font-medium" style={{ color: '#5b55f7' }}>Opportunities</Link>
            <Link to="/track-activities" className="text-sm font-poppins font-bold" style={{ color: '#5b55f7' }}>Track Activities</Link>
            <Link to="/saved-opportunities" className="text-sm font-poppins font-medium" style={{ color: '#5b55f7' }}>Saved</Link>
            <Link to="/profile" className="text-sm font-poppins font-medium" style={{ color: '#5b55f7' }}>Profile</Link>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-4 mb-6">
            <Link to="/add-activity">
              <Button variant="outline" className="font-poppins font-semibold" style={{ color: '#5b55f7', borderColor: '#5b55f7' }}>
                Add New Activity
              </Button>
            </Link>
            <Button className="font-poppins font-semibold" style={{ backgroundColor: '#5b55f7' }}>
              Log Hours
            </Button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-lg font-poppins font-bold text-black mb-2 block">
              Name of Activity <span className="text-red-500">*</span>
            </label>
            <Select value={formData.activityName} onValueChange={(value) => setFormData(prev => ({ ...prev, activityName: value }))}>
              <SelectTrigger className="font-poppins">
                <SelectValue placeholder="Select activity" />
              </SelectTrigger>
              <SelectContent>
                {savedActivities.map(activity => (
                  <SelectItem key={activity} value={activity}>{activity}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-lg font-poppins font-bold text-black mb-2 block">
              Date of Activity <span className="text-red-500">*</span>
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="font-poppins"
              max={today}
              required
            />
          </div>

          <div>
            <label className="text-lg font-poppins font-bold text-black mb-2 block">
              Hours <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Enter hours"
              type="number"
              step="0.5"
              min="0"
              value={formData.hours}
              onChange={(e) => setFormData(prev => ({ ...prev, hours: e.target.value }))}
              className="font-poppins"
              required
            />
          </div>

          <div>
            <label className="text-lg font-poppins font-bold text-black mb-2 block">
              Milestone
            </label>
            <Textarea
              placeholder="ex. FBLA Club Meeting"
              value={formData.milestone}
              onChange={(e) => setFormData(prev => ({ ...prev, milestone: e.target.value }))}
              className="font-poppins"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            className="w-full text-lg font-poppins font-bold py-6"
            style={{ backgroundColor: '#5b55f7' }}
          >
            Log Hours
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LogHours;