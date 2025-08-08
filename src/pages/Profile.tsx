import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Upload,
    Download,
    FileText,
    HelpCircle,
    MessageSquare,
    Shield,
    FileText as Terms,
    LogOut,
    Trash2,
    Camera,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const ACCENT = '#5b55f7';

const Profile: React.FC = () => {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showSignOutModal, setShowSignOutModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { toast } = useToast();

    // Sample user data
    const userData = {
        name: 'Dheeraj Koppu',
        email: 'dheerajkoppu@gmail.com',
        avatar: '/placeholder-avatar.jpg',
    };

    const handleSubscribePremium = () => {
        toast({ title: 'Premium Subscription', description: 'Redirecting to premium subscription page...' });
    };

    const handleDownloadPDF = () => {
        toast({ title: 'Downloading PDF', description: 'Your activities PDF is being generated...' });
    };

    const handleExportData = () => {
        toast({ title: 'Exporting Data', description: 'Your data export is being prepared...' });
    };

    const handleUpdateData = () => {
        toast({ title: 'Data Updated', description: 'Your profile information has been updated successfully.' });
        setShowUpdateModal(false);
    };

    const handleSubmitFeedback = () => {
        toast({ title: 'Feedback Submitted', description: "Thanks! We'll review it soon." });
        setShowFeedbackModal(false);
    };

    const handleLogout = () => {
        setShowSignOutModal(true);
    };

    const confirmLogout = () => {
        setShowSignOutModal(false);
        toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setShowDeleteModal(false);
        toast({ title: 'Account Deletion', description: 'Your account will be removed.', variant: 'destructive' });
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f5f7fa' }}>
            <Navigation />

            <div className="max-w-4xl mx-auto p-6">
                {/* Profile Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4 relative">
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={userData.avatar} alt="Profile" />
                            <AvatarFallback
                                className="text-2xl font-poppins font-bold"
                                style={{ backgroundColor: ACCENT, color: 'white' }}
                            >
                                {userData.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                        <Button
                            size="sm"
                            className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            style={{ backgroundColor: ACCENT }}
                            onClick={() => setShowImageModal(true)}
                            type="button"
                        >
                            <Camera className="w-4 h-4 text-white" />
                        </Button>
                    </div>
                    <h1 className="text-3xl font-poppins font-black mb-2 text-black">{userData.name}</h1>
                    <p className="text-lg font-poppins font-medium" style={{ color: ACCENT }}>
                        {userData.email}
                    </p>
                </div>

                {/* Subscription Status */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="font-poppins font-bold text-black">Subscription Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button
                            className="w-full font-poppins font-bold text-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            style={{ backgroundColor: ACCENT }}
                            onClick={handleSubscribePremium}
                            type="button"
                        >
                            Subscribe to Premium
                        </Button>
                    </CardContent>
                </Card>

                {/* Customization */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="font-poppins font-bold text-black">Customization</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button
                            className="w-full font-poppins font-bold text-white focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            style={{ backgroundColor: ACCENT }}
                            onClick={() => setShowUpdateModal(true)}
                            type="button"
                        >
                            Update User Data
                        </Button>
                    </CardContent>
                </Card>

                {/* Account Settings */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="font-poppins font-bold text-black">Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full font-poppins font-semibold justify-start bg-white text-black
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                         focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                            style={{ ['--accent' as any]: ACCENT }}
                            onClick={handleDownloadPDF}
                            type="button"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download Activities PDF
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full font-poppins font-semibold justify-start bg-white text-black
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                         focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                            style={{ ['--accent' as any]: ACCENT }}
                            onClick={handleExportData}
                            type="button"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Export Data
                        </Button>
                    </CardContent>
                </Card>

                {/* Help & Support */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="font-poppins font-bold text-black">Help & Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button
                            variant="outline"
                            className="w-full font-poppins font-semibold justify-start bg-white text-black
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                         focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                            style={{ ['--accent' as any]: ACCENT }}
                            onClick={() => window.open('mailto:ask.ecai@gmail.com?subject=Support%20Inquiry', '_self')}
                            type="button"
                        >
                            <HelpCircle className="w-4 h-4 mr-2" />
                            Contact Support
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full font-poppins font-semibold justify-start bg-white text-black
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                         focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                            style={{ ['--accent' as any]: ACCENT }}
                            onClick={() => setShowFeedbackModal(true)}
                            type="button"
                        >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Submit Feedback
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full font-poppins font-semibold justify-start bg-white text-black
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                         focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                            style={{ ['--accent' as any]: ACCENT }}
                            onClick={() => window.open('https://ec-ai.app/privacy-policy', '_blank')}
                            type="button"
                        >
                            <Shield className="w-4 h-4 mr-2" />
                            Privacy Policy
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full font-poppins font-semibold justify-start bg-white text-black
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                         focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                            style={{ ['--accent' as any]: ACCENT }}
                            onClick={() => window.open('https://ec-ai.app/terms-of-use', '_blank')}
                            type="button"
                        >
                            <Terms className="w-4 h-4 mr-2" />
                            Terms of Use
                        </Button>
                    </CardContent>
                </Card>

                {/* Account Actions */}
                <Card>
                    <CardContent className="pt-6 space-y-3">
                        <Button
                            variant="outline"
                            className="w-full font-poppins font-semibold justify-start bg-white text-black
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                         focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                            style={{ ['--accent' as any]: ACCENT }}
                            onClick={handleLogout}
                            type="button"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Log Out
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full font-poppins font-semibold justify-start text-red-600 border-red-200 hover:bg-red-50 bg-white
                         focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                         focus-visible:ring-red-300 focus-visible:border-red-300"
                            onClick={handleDeleteAccount}
                            type="button"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                        </Button>
                    </CardContent>
                </Card>

                {/* Update Data Modal */}
                <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
                    <DialogContent
                        className="max-w-lg [&>button]:text-gray-500 [&>button:hover]:text-gray-700 [&>button]:outline-none [&>button]:ring-0"
                        style={{ backgroundColor: '#f5f7fa' }}
                    >
                        <DialogHeader>
                            <DialogTitle className="font-poppins font-bold text-black">Update User Data</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="flex justify-center mb-2">
                                <Button
                                    variant="outline"
                                    className="font-poppins font-semibold bg-white text-black
                             focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                             focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                                    style={{ ['--accent' as any]: ACCENT }}
                                    onClick={() => setShowImageModal(true)}
                                    type="button"
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Change Profile Picture
                                </Button>
                            </div>

                            <Input
                                placeholder="Full Name"
                                defaultValue={userData.name}
                                className="font-poppins bg-white text-black
                           focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                           focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                                style={{ ['--accent' as any]: ACCENT }}
                            />
                            <Input
                                placeholder="Email"
                                defaultValue={userData.email}
                                className="font-poppins bg-white text-black
                           focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                           focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                                style={{ ['--accent' as any]: ACCENT }}
                            />
                            <Input
                                placeholder="School/University"
                                className="font-poppins bg-white text-black
                           focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                           focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                                style={{ ['--accent' as any]: ACCENT }}
                            />
                            <Input
                                placeholder="Grade Level"
                                className="font-poppins bg-white text-black
                           focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                           focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                                style={{ ['--accent' as any]: ACCENT }}
                            />
                            <Button
                                className="w-full font-poppins font-semibold text-white
                           focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                style={{ backgroundColor: ACCENT }}
                                onClick={handleUpdateData}
                                type="button"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Feedback Modal */}
                <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
                    <DialogContent
                        className="max-w-lg [&>button]:text-gray-500 [&>button:hover]:text-gray-700 [&>button]:outline-none [&>button]:ring-0"
                        style={{ backgroundColor: '#f5f7fa' }}
                    >
                        <DialogHeader>
                            <DialogTitle className="font-poppins font-bold text-black">Submit Feedback</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <Input
                                placeholder="Subject"
                                className="font-poppins bg-white text-black
                           focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                           focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                                style={{ ['--accent' as any]: ACCENT }}
                            />
                            <Textarea
                                placeholder="Tell us about your experience with EC-AI..."
                                className="font-poppins bg-white text-black
                           focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                           focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                                style={{ ['--accent' as any]: ACCENT }}
                                rows={5}
                            />
                            <Button
                                className="w-full font-poppins font-semibold text-white
                           focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                style={{ backgroundColor: ACCENT }}
                                onClick={handleSubmitFeedback}
                                type="button"
                            >
                                Submit Feedback
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Image Upload Modal */}
                <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
                    <DialogContent
                        className="max-w-lg [&>button]:text-gray-500 [&>button:hover]:text-gray-700 [&>button]:outline-none [&>button]:ring-0"
                        style={{ backgroundColor: '#f5f7fa' }}
                    >
                        <DialogHeader>
                            <DialogTitle className="font-poppins font-bold text-black">Change Profile Picture</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white">
                                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                <p className="font-poppins font-medium text-gray-600 mb-2">
                                    Drop your image here or click to browse
                                </p>
                                <p className="font-poppins font-normal text-sm text-gray-500">
                                    Supports JPG, PNG files up to 5MB
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-4 font-poppins font-semibold bg-white text-black
                             focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                             focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                                    style={{ ['--accent' as any]: ACCENT }}
                                    onClick={() => {
                                        toast({
                                            title: 'Image Upload',
                                            description: 'Image upload functionality will be implemented soon.',
                                        });
                                        setShowImageModal(false);
                                    }}
                                    type="button"
                                >
                                    Select Image
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Sign Out Confirmation Modal */}
                <Dialog open={showSignOutModal} onOpenChange={setShowSignOutModal}>
                    <DialogContent
                        className="max-w-lg [&>button]:text-gray-500 [&>button:hover]:text-gray-700 [&>button]:outline-none [&>button]:ring-0"
                        style={{ backgroundColor: '#f5f7fa' }}
                    >
                        <DialogHeader>
                            <DialogTitle className="font-poppins font-bold text-black">Confirm Logout</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p className="font-poppins font-normal text-gray-700 text-center">Are you sure you want to log out?</p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 font-poppins font-semibold bg-white text-black
                             focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0
                             focus-visible:ring-[var(--accent,_#5b55f7)] focus-visible:border-[var(--accent,_#5b55f7)]"
                                    style={{ ['--accent' as any]: ACCENT }}
                                    onClick={() => setShowSignOutModal(false)}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="flex-1 font-poppins font-semibold bg-red-500 hover:bg-red-600 text-white
                             focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                    onClick={confirmLogout}
                                    type="button"
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Delete Account Confirmation Modal */}
                <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                    <DialogContent
                        className="max-w-lg [&>button]:text-gray-500 [&>button:hover]:text-gray-700 [&>button]:outline-none [&>button]:ring-0"
                        style={{ backgroundColor: '#f5f7fa' }}
                    >
                        <DialogHeader>
                            <DialogTitle className="font-poppins font-bold text-black">Confirm Delete Account</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <p className="font-poppins font-normal text-gray-700 text-center">
                                Are you sure you want to delete your account? This action cannot be undone.
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 font-poppins font-semibold bg-white text-black
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
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Profile;
