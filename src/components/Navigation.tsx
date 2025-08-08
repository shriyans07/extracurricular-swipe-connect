import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/signin');
  };

  if (!isAuthenticated) {
    return null; // Don't show navigation on auth pages
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="border-b bg-white p-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <Link to="/" className="text-2xl font-poppins font-black" style={{ color: '#5b55f7' }}>
          EC-AI
        </Link>
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className={`text-sm font-poppins ${isActive('/') ? 'font-bold' : 'font-medium'}`} 
            style={{ color: '#5b55f7' }}
          >
            Opportunities
          </Link>
          <Link 
            to="/track-activities" 
            className={`text-sm font-poppins ${isActive('/track-activities') ? 'font-bold' : 'font-medium'}`} 
            style={{ color: '#5b55f7' }}
          >
            Track Activities
          </Link>
          <Link 
            to="/saved-opportunities" 
            className={`text-sm font-poppins ${isActive('/saved-opportunities') ? 'font-bold' : 'font-medium'}`} 
            style={{ color: '#5b55f7' }}
          >
            Saved
          </Link>
          <Link 
            to="/profile" 
            className={`text-sm font-poppins ${isActive('/profile') ? 'font-bold' : 'font-medium'}`} 
            style={{ color: '#5b55f7' }}
          >
            Profile
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-sm font-poppins font-medium"
            style={{ color: '#5b55f7', borderColor: '#5b55f7' }}
          >
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;