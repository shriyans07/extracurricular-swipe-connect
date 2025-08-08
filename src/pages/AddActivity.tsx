import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const AddActivity = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    hoursPerWeek: '',
    weeksPerYear: '',
    roles: '',
    gradeLevels: [] as string[],
    description: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const activityTypes = [
    'Academic',
    'Arts',
    'Athletics-Jv-Varsity',
    'Business',
    'Environmental',
    'Government',
    'Media',
    'Science/Math',
    'Service/Volunteer',
    'Other'
  ];

  const grades = ['Pre-9', '9', '10', '11', '12', 'Post-12'];

  const handleGradeChange = (grade: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        gradeLevels: [...prev.gradeLevels, grade]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        gradeLevels: prev.gradeLevels.filter(g => g !== grade)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.hoursPerWeek || !formData.weeksPerYear) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Activity Added!",
      description: `${formData.name} has been added to your activities.`,
    });
    
    navigate('/track-activities');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f7fa' }}>
      <Navigation />

      <div className="max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-poppins font-black mb-4 text-black">
            Add New Activity
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-lg font-poppins font-bold text-black mb-2 block">
              Name of Activity <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="ex. Future Business Leader of America"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="font-poppins"
              required
            />
          </div>

          <div>
            <label className="text-lg font-poppins font-bold text-black mb-2 block">
              Activity Type <span className="text-red-500">*</span>
            </label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger className="font-poppins">
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-lg font-poppins font-bold text-black mb-2 block">
              Hours Per Week <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Enter hours"
              type="number"
              value={formData.hoursPerWeek}
              onChange={(e) => setFormData(prev => ({ ...prev, hoursPerWeek: e.target.value }))}
              className="font-poppins"
              required
            />
          </div>

          <div>
            <label className="text-lg font-poppins font-bold text-black mb-2 block">
              Weeks Per Year <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Enter weeks"
              type="number"
              value={formData.weeksPerYear}
              onChange={(e) => setFormData(prev => ({ ...prev, weeksPerYear: e.target.value }))}
              className="font-poppins"
              required
            />
          </div>

          <div>
            <label className="text-lg font-poppins font-bold text-black mb-2 block">
              Roles <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="ex. President (12)"
              value={formData.roles}
              onChange={(e) => setFormData(prev => ({ ...prev, roles: e.target.value }))}
              className="font-poppins"
            />
          </div>

          <div>
            <label className="text-lg font-poppins font-bold text-black mb-2 block">
              Grade Level <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-4">
              {grades.map(grade => (
                <div key={grade} className="flex items-center space-x-2">
                  <Checkbox
                    id={grade}
                    checked={formData.gradeLevels.includes(grade)}
                    onCheckedChange={(checked) => handleGradeChange(grade, checked as boolean)}
                  />
                  <label htmlFor={grade} className="font-poppins font-medium">
                    Grade {grade}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-lg font-poppins font-bold text-black mb-2 block">
              Description
            </label>
            <Textarea
              placeholder="Describe your involvement and achievements..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="font-poppins"
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className="w-full text-lg font-poppins font-bold py-6 text-white"
            style={{ backgroundColor: '#5b55f7' }}
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddActivity;