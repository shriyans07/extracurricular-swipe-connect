import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import logoImage from '@/assets/ec-ai-logo.png';

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
        <Link to="/" className="flex items-center">
          <img src={logoImage} alt="EC AI" className="h-8" />
        </Link>
        <div className="flex items-center space-x-4">
          <Link 
            to="/" 
            className={`text-sm font-poppins ${isActive('/') ? 'font-bold text-black' : 'font-medium text-black'}`}
          >
            Opportunities
          </Link>
          <Link 
            to="/track-activities" 
            className={`text-sm font-poppins ${isActive('/track-activities') ? 'font-bold text-black' : 'font-medium text-black'}`}
          >
            Track Activities
          </Link>
          <Link 
            to="/add-activity" 
            className={`text-sm font-poppins ${isActive('/add-activity') ? 'font-bold text-black' : 'font-medium text-black'}`}
          >
            Add Activity
          </Link>
          <Link 
            to="/log-hours" 
            className={`text-sm font-poppins ${isActive('/log-hours') ? 'font-bold text-black' : 'font-medium text-black'}`}
          >
            Log Hours
          </Link>
          <Link 
            to="/saved-opportunities" 
            className={`text-sm font-poppins ${isActive('/saved-opportunities') ? 'font-bold text-black' : 'font-medium text-black'}`}
          >
            Saved
          </Link>
          <Link 
            to="/profile" 
            className={`text-sm font-poppins ${isActive('/profile') ? 'font-bold text-black' : 'font-medium text-black'}`}
          >
            Profile
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-sm font-poppins font-medium bg-white text-black border-black hover:bg-gray-100"
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