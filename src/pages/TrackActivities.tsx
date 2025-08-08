import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Edit2, Trash2, Bot, X, Upload } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

// Sample data
const sampleActivities = [
  {
    id: '1',
    name: 'Future Business Leaders of America (FBLA)',
    type: 'Business',
    grades: ['9', '10', '11', '12'],
    hoursPerWeek: 10,
    weeksPerYear: 43,
    roles: 'Treasurer (11)',
    description: 'Managed $2k+ in club assets; Hosted 10+ fundraisers, stimulating local businesses and growing club fund by 165%.'
  },
  {
    id: '2',
    name: 'High School Basketball Team',
    type: 'Athletics-Jv-Varsity',
    grades: ['10', '11', '12'],
    hoursPerWeek: 12,
    weeksPerYear: 35,
    roles: 'Varsity Captain (12)',
    description: 'Started on Varsity all 4 years; Won CIF State Division 2A in 10th & 11th grade; Named in All-County team in 11th grade.'
  },
  {
    id: '3',
    name: 'National Honor Society',
    type: 'Academic',
    grades: ['11', '12'],
    hoursPerWeek: 3,
    weeksPerYear: 36,
    roles: 'Member',
    description: 'Participated in community service projects and tutoring programs.'
  }
];

const TrackActivities = () => {
  const [activities, setActivities] = useState(sampleActivities);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('alphabetical');
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredAndSortedActivities = activities
    .filter(activity => 
      activity.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'career-field':
          return a.type.localeCompare(b.type);
        case 'hours':
          return b.hoursPerWeek - a.hoursPerWeek;
        default:
          return 0;
      }
    });

  const handleDelete = (id: string) => {
    setActivityToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (activityToDelete) {
      setActivities(activities.filter(activity => activity.id !== activityToDelete));
      toast({
        title: "Activity Deleted",
        description: "The activity has been removed from your list.",
      });
      setActivityToDelete(null);
    }
    setShowDeleteModal(false);
  };

  const sampleLogs = [
    { date: '2025-01-15', hours: 8, description: 'FBLA Club Meeting and preparation for state competition' },
    { date: '2025-01-10', hours: 12, description: 'State competition preparation and mock presentations' },
    { date: '2025-01-05', hours: 6, description: 'Monthly treasurer duties and fundraiser planning' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f7fa' }}>
      <Navigation />

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-poppins font-black mb-4 text-black">
            Track Activities
          </h1>
          
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Input
              placeholder="Search Activities"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 font-poppins"
            />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 font-poppins" style={{ color: '#5b55f7' }}>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alphabetical">Alphabetically</SelectItem>
                <SelectItem value="career-field">By Career Field</SelectItem>
                <SelectItem value="hours">By Hours per Week</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>

        {/* Activities Grid */}
        <div className="grid gap-6">
          {filteredAndSortedActivities.map((activity) => (
            <Card key={activity.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => { setSelectedActivity(activity); setShowLogsModal(true); }}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="font-poppins font-medium" style={{ backgroundColor: '#e0e7ff', color: '#5b55f7' }}>
                        {activity.type}
                      </Badge>
                      <span className="text-sm font-poppins font-medium text-gray-600">
                        {activity.grades.join(', ')}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-poppins font-bold text-gray-900 mb-1">
                      {activity.name}
                    </CardTitle>
                    <p className="text-gray-600 font-poppins font-semibold mb-2">
                      {activity.roles}
                    </p>
                    <div className="flex gap-4 text-sm font-poppins font-medium text-gray-600 mb-3">
                      <span>{activity.hoursPerWeek} hr/wk</span>
                      <span>{activity.weeksPerYear} wk/yr</span>
                    </div>
                  </div>
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button variant="outline" size="sm" onClick={() => { setSelectedActivity(activity); setShowEditModal(true); }}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" style={{ color: '#5b55f7' }}>
                      <Bot className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(activity.id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-poppins font-normal text-sm">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Modal */}
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogContent className="max-w-lg" style={{ backgroundColor: '#f5f7fa' }}>
            <DialogHeader>
              <DialogTitle className="font-poppins font-bold text-black">Edit Activity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-poppins font-medium text-black mb-1 block">
                  Current activity name: {selectedActivity?.name}
                </label>
                <Input placeholder="Activity Name" defaultValue={selectedActivity?.name} className="font-poppins" />
              </div>
              
              <div>
                <label className="text-sm font-poppins font-medium text-black mb-1 block">
                  Current activity type: {selectedActivity?.type}
                </label>
                <Select defaultValue={selectedActivity?.type}>
                  <SelectTrigger className="font-poppins">
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Athletics-Jv-Varsity">Athletics-Jv-Varsity</SelectItem>
                    <SelectItem value="Community Service">Community Service</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-poppins font-medium text-black mb-1 block">
                  Current roles: {selectedActivity?.roles}
                </label>
                <Input placeholder="Roles" defaultValue={selectedActivity?.roles} className="font-poppins" />
              </div>

              <div>
                <label className="text-sm font-poppins font-medium text-black mb-1 block">
                  Current grade levels: {selectedActivity?.grades?.join(', ')}
                </label>
                 <div className="grid grid-cols-4 gap-2">
                  {['Pre-9', '9', '10', '11', '12', 'Post-12'].map((grade) => (
                    <div key={grade} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`grade-${grade}`} 
                        defaultChecked={selectedActivity?.grades?.includes(grade)} 
                      />
                      <label htmlFor={`grade-${grade}`} className="text-sm font-poppins font-medium text-black">
                        {grade}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-poppins font-medium text-black mb-1 block">
                  Current description: {selectedActivity?.description?.substring(0, 50)}...
                </label>
                <Textarea placeholder="Description" defaultValue={selectedActivity?.description} className="font-poppins" />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-sm font-poppins font-medium text-black mb-1 block">
                    Current hours/week: {selectedActivity?.hoursPerWeek}
                  </label>
                  <Input placeholder="Hours/Week" type="number" defaultValue={selectedActivity?.hoursPerWeek} className="font-poppins" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-poppins font-medium text-black mb-1 block">
                    Current weeks/year: {selectedActivity?.weeksPerYear}
                  </label>
                  <Input placeholder="Weeks/Year" type="number" defaultValue={selectedActivity?.weeksPerYear} className="font-poppins" />
                </div>
              </div>

              <Button className="w-full font-poppins font-semibold text-white" style={{ backgroundColor: '#5b55f7' }}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-poppins font-bold">Confirm Deletion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="font-poppins font-normal text-gray-700">
                Are you sure you want to delete this activity? This action cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 font-poppins font-semibold"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 font-poppins font-semibold bg-red-500 hover:bg-red-600"
                  onClick={confirmDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Activity Logs Modal */}
        <Dialog open={showLogsModal} onOpenChange={setShowLogsModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-poppins font-bold">Activity Logs</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {sampleLogs.map((log, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-poppins font-semibold text-sm" style={{ color: '#5b55f7' }}>
                      {log.date}
                    </span>
                    <span className="font-poppins font-medium text-sm text-gray-600">
                      {log.hours} hours
                    </span>
                  </div>
                  <p className="font-poppins font-normal text-sm text-gray-700">
                    {log.description}
                  </p>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TrackActivities;