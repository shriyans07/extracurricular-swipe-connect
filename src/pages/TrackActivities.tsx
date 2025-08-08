import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Edit2, Trash2, Bot, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

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
    setActivities(activities.filter(activity => activity.id !== id));
    toast({
      title: "Activity Deleted",
      description: "The activity has been removed from your list.",
    });
  };

  const sampleLogs = [
    { date: '2025-01-15', hours: 8, description: 'FBLA Club Meeting and preparation for state competition' },
    { date: '2025-01-10', hours: 12, description: 'State competition preparation and mock presentations' },
    { date: '2025-01-05', hours: 6, description: 'Monthly treasurer duties and fundraiser planning' }
  ];

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

      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-poppins font-black mb-4" style={{ color: '#5b55f7' }}>
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

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link to="/add-activity">
              <Button className="font-poppins font-semibold" style={{ backgroundColor: '#5b55f7' }}>
                Add New Activity
              </Button>
            </Link>
            <Link to="/log-hours">
              <Button variant="outline" className="font-poppins font-semibold" style={{ color: '#5b55f7', borderColor: '#5b55f7' }}>
                Log Hours
              </Button>
            </Link>
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
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-poppins font-bold">Edit Activity</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Activity Name" defaultValue={selectedActivity?.name} className="font-poppins" />
              <Input placeholder="Roles" defaultValue={selectedActivity?.roles} className="font-poppins" />
              <Textarea placeholder="Description" defaultValue={selectedActivity?.description} className="font-poppins" />
              <div className="flex gap-2">
                <Input placeholder="Hours/Week" type="number" defaultValue={selectedActivity?.hoursPerWeek} className="font-poppins" />
                <Input placeholder="Weeks/Year" type="number" defaultValue={selectedActivity?.weeksPerYear} className="font-poppins" />
              </div>
              <Button className="w-full font-poppins font-semibold" style={{ backgroundColor: '#5b55f7' }}>
                Save Changes
              </Button>
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