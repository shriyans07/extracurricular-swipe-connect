import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Trash2, Bot, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const ACCENT = '#5b55f7';

// Sample saved opportunities data
const sampleOpportunities = [
    {
        id: '1',
        title: 'USA Biology Olympiad (USABO)',
        type: 'Science/Math',
        location: 'Hybrid',
        duration: 'School Year',
        description: "Nation's premier biology competition selecting top students for the International Biology Olympiad.",
        applicationLink: 'https://example.com/usabo',
    },
    {
        id: '2',
        title: 'American Regions Mathematics League (ARML)',
        type: 'Science/Math',
        location: 'In-Person',
        duration: 'School Year',
        description:
            'National team-based math competition fostering collaboration among top high school math students.',
        applicationLink: 'https://example.com/arml',
    },
    {
        id: '3',
        title: 'Environmental Leadership Program',
        type: 'Environmental',
        location: 'Campus',
        duration: 'Semester',
        description: 'Develop environmental advocacy skills while leading campus sustainability initiatives.',
        applicationLink: 'https://example.com/environmental',
    },
];

const SavedOpportunities = () => {
    const [opportunities, setOpportunities] = useState(sampleOpportunities);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOpportunity, setSelectedOpportunity] = useState<any>(null);
    const [showAIModal, setShowAIModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [opportunityToDelete, setOpportunityToDelete] = useState<string | null>(null);
    const { toast } = useToast();

    const filteredOpportunities = opportunities.filter(
        (opportunity) =>
            opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            opportunity.type.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleDelete = (id: string) => {
        setOpportunityToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (opportunityToDelete) {
            setOpportunities(opportunities.filter((opportunity) => opportunity.id !== opportunityToDelete));
            toast({
                title: 'Opportunity Removed',
                description: 'The opportunity has been removed from your saved list.',
            });
            setOpportunityToDelete(null);
        }
        setShowDeleteModal(false);
    };

    const handleAIReasons = (opportunity: any) => {
        setSelectedOpportunity(opportunity);
        setShowAIModal(true);
    };

    const aiReasons = [
        'Build specialized expertise in your field of interest with hands-on experience',
        'Network with like-minded peers and industry professionals for future opportunities',
        'Strengthen your college applications with demonstrable leadership and achievement',
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f5f7fa' }}>
            <Navigation />

            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-poppins font-black mb-4 text-black">Saved Opportunities</h1>

                    {/* Search (ensure visible text + purple focus) */}
                    <Input
                        placeholder="Search Opportunities"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-md font-poppins bg-white text-black
                       focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                       focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                        style={{ ['--accent' as any]: ACCENT }}
                    />
                </div>

                {/* Opportunities Grid */}
                <div className="grid gap-6">
                    {filteredOpportunities.map((opportunity) => (
                        <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge
                                                variant="secondary"
                                                className="font-poppins font-medium"
                                                style={{ backgroundColor: '#e0e7ff', color: ACCENT }}
                                            >
                                                {opportunity.type}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl font-poppins font-bold text-gray-900 mb-2">
                                            {opportunity.title}
                                        </CardTitle>
                                        <div className="flex gap-4 text-sm font-poppins font-medium text-gray-600 mb-3">
                                            <span>Location: {opportunity.location}</span>
                                            <span>Duration: {opportunity.duration}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleAIReasons(opportunity)}
                                            style={{ color: ACCENT }}
                                        >
                                            <Bot className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => handleDelete(opportunity.id)}>
                                            <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 font-poppins font-normal text-sm mb-4">
                                    {opportunity.description}
                                </p>
                                <Button
                                    className="font-poppins font-semibold text-white
                             focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                    style={{ backgroundColor: ACCENT }}
                                    onClick={() => window.open(opportunity.applicationLink, '_blank')}
                                >
                                    <ExternalLink className="w-4 h-4 mr-2 text-white" />
                                    Apply Here
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredOpportunities.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 font-poppins font-medium text-lg">
                            No saved opportunities found.
                            <Link to="/" className="text-blue-500 hover:underline ml-1">
                                Start exploring opportunities!
                            </Link>
                        </p>
                    </div>
                )}

                {/* Delete Confirmation Modal — match TrackActivities style */}
                <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                    <DialogContent
                        className="max-w-lg [&>button]:text-gray-500 [&>button:hover]:text-gray-700 [&>button]:outline-none [&>button]:ring-0"
                        style={{ backgroundColor: '#f5f7fa' }}
                    >
                        <DialogHeader>
                            <DialogTitle className="font-poppins font-bold text-black">Confirm Deletion</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p className="font-poppins font-normal text-gray-700">
                                Are you sure you want to remove this opportunity from your saved list? This action cannot be undone.
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 font-poppins font-semibold text-black
                             focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                             focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                                    style={{ ['--accent' as any]: ACCENT }}
                                    onClick={() => setShowDeleteModal(false)}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 font-poppins font-semibold bg-red-500 hover:bg-red-600 text-white
                             focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                    onClick={confirmDelete}
                                    type="button"
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* AI Reasons Modal — same visual language + nicer layout */}
                <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
                    <DialogContent
                        className="max-w-lg [&>button]:text-gray-500 [&>button:hover]:text-gray-700 [&>button]:outline-none [&>button]:ring-0"
                        style={{ backgroundColor: '#f5f7fa' }}
                    >
                        <DialogHeader>
                            <DialogTitle className="font-poppins font-bold text-black">
                                Why join {selectedOpportunity?.title}?
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            {aiReasons.map((reason, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 bg-white rounded-lg border border-gray-200 p-3"
                                >
                                    <div
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                                        style={{ backgroundColor: ACCENT }}
                                    >
                                        {index + 1}
                                    </div>
                                    <p className="font-poppins font-medium text-sm text-gray-800">{reason}</p>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default SavedOpportunities;
