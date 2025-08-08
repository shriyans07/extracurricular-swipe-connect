import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate sign in
    toast({
      title: "Welcome Back!",
      description: "You have been signed in successfully.",
    });
    
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-poppins font-black mb-2" style={{ color: '#5b55f7' }}>
            EC-AI
          </CardTitle>
          <p className="text-lg font-poppins font-semibold" style={{ color: '#5b55f7' }}>
            Sign In to Your Account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="font-poppins"
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="font-poppins"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full font-poppins font-bold"
              style={{ backgroundColor: '#5b55f7' }}
            >
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="font-poppins font-medium text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-bold" style={{ color: '#5b55f7' }}>
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;