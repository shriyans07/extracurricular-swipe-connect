import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Download, FileText, Settings, HelpCircle, MessageSquare, Shield, FileText as Terms, LogOut, Trash2, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const Profile = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const { toast } = useToast();

  // Sample user data
  const userData = {
    name: 'Dheeraj Koppu',
    email: 'dheerajkoppu@gmail.com',
    avatar: '/placeholder-avatar.jpg'
  };

  const handleSubscribePremium = () => {
    toast({
      title: "Premium Subscription",
      description: "Redirecting to premium subscription page...",
    });
  };

  const handleDownloadPDF = () => {
    toast({
      title: "Downloading PDF",
      description: "Your activities PDF is being generated...",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Your data export is being prepared...",
    });
  };

  const handleUpdateData = () => {
    toast({
      title: "Data Updated",
      description: "Your profile information has been updated successfully.",
    });
    setShowUpdateModal(false);
  };

  const handleSubmitFeedback = () => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We'll review it soon.",
    });
    setShowFeedbackModal(false);
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion",
      description: "Please contact support to delete your account.",
      variant: "destructive"
    });
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
              <AvatarFallback className="text-2xl font-poppins font-bold" style={{ backgroundColor: '#5b55f7', color: 'white' }}>
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
              style={{ backgroundColor: '#5b55f7' }}
              onClick={() => setShowImageModal(true)}
            >
              <Camera className="w-4 h-4 text-white" />
            </Button>
          </div>
          <h1 className="text-3xl font-poppins font-black mb-2 text-black">
            {userData.name}
          </h1>
          <p className="text-lg font-poppins font-medium" style={{ color: '#5b55f7' }}>
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
              className="w-full font-poppins font-bold text-white"
              style={{ backgroundColor: '#5b55f7' }}
              onClick={handleSubscribePremium}
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
              className="w-full font-poppins font-bold text-white"
              style={{ backgroundColor: '#5b55f7' }}
              onClick={() => setShowUpdateModal(true)}
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
              className="w-full font-poppins font-semibold justify-start"
              onClick={handleDownloadPDF}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Activities PDF
            </Button>
            <Button 
              variant="outline"
              className="w-full font-poppins font-semibold justify-start"
              onClick={handleExportData}
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
              className="w-full font-poppins font-semibold justify-start"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
            <Button 
              variant="outline"
              className="w-full font-poppins font-semibold justify-start"
              onClick={() => setShowFeedbackModal(true)}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
            <Button 
              variant="outline"
              className="w-full font-poppins font-semibold justify-start"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy Policy
            </Button>
            <Button 
              variant="outline"
              className="w-full font-poppins font-semibold justify-start"
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
              className="w-full font-poppins font-semibold justify-start"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
            <Button 
              variant="outline"
              className="w-full font-poppins font-semibold justify-start text-red-600 border-red-200 hover:bg-red-50"
              onClick={handleDeleteAccount}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Update Data Modal */}
        <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-poppins font-bold">Update User Data</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <Button
                  variant="outline"
                  className="font-poppins font-semibold"
                  onClick={() => setShowImageModal(true)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change Profile Picture
                </Button>
              </div>
              <Input placeholder="Full Name" defaultValue={userData.name} className="font-poppins" />
              <Input placeholder="Email" defaultValue={userData.email} className="font-poppins" />
              <Input placeholder="School/University" className="font-poppins" />
              <Input placeholder="Grade Level" className="font-poppins" />
              <Button 
                className="w-full font-poppins font-semibold" 
                style={{ backgroundColor: '#5b55f7' }}
                onClick={handleUpdateData}
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Feedback Modal */}
        <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-poppins font-bold">Submit Feedback</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Subject" className="font-poppins" />
              <Textarea 
                placeholder="Tell us about your experience with EC-AI..." 
                className="font-poppins" 
                rows={5}
              />
              <Button 
                className="w-full font-poppins font-semibold" 
                style={{ backgroundColor: '#5b55f7' }}
                onClick={handleSubmitFeedback}
              >
                Submit Feedback
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Image Upload Modal */}
        <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-poppins font-bold">Change Profile Picture</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="font-poppins font-medium text-gray-600 mb-2">
                  Drop your image here or click to browse
                </p>
                <p className="font-poppins font-normal text-sm text-gray-500">
                  Supports JPG, PNG files up to 5MB
                </p>
                <Button
                  variant="outline"
                  className="mt-4 font-poppins font-semibold"
                  onClick={() => {
                    toast({
                      title: "Image Upload",
                      description: "Image upload functionality will be implemented soon.",
                    });
                    setShowImageModal(false);
                  }}
                >
                  Select Image
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