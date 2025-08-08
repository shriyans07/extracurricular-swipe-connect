import React, { useState } from 'react';
import { SwipeCard } from './SwipeCard';
import { Button } from '@/components/ui/button';
import { Heart, X, RotateCcw, GraduationCap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

// Placeholder data - this will be replaced with real database data later
const placeholderExtracurriculars = [
  {
    id: '1',
    title: 'Environmental Club Leadership Position',
    organization: 'Green Future Initiative',
    description: 'Join our environmental club as a leadership team member. Help organize campus sustainability events, coordinate recycling programs, and lead environmental awareness campaigns. Perfect opportunity to make a real impact on campus sustainability.',
    location: 'Campus Center, Room 204',
    timeCommitment: '5-7 hours/week',
    category: 'Environmental',
    participants: 45,
    deadline: 'Due Feb 15',
    tags: ['Leadership', 'Sustainability', 'Event Planning', 'Teamwork']
  },
  {
    id: '2',
    title: 'Student Government Representative',
    organization: 'University Student Government',
    description: 'Represent your fellow students as a class representative in the student government. Participate in policy discussions, advocate for student needs, and help shape campus life through democratic processes.',
    location: 'Student Union Building',
    timeCommitment: '6-8 hours/week',
    category: 'Government',
    participants: 28,
    deadline: 'Due Feb 28',
    tags: ['Leadership', 'Public Speaking', 'Policy', 'Advocacy']
  },
  {
    id: '3',
    title: 'Campus Newspaper Editor',
    organization: 'The Daily Campus',
    description: 'Looking for passionate writers and editors to join our award-winning campus newspaper. Cover campus events, interview faculty and students, and develop your journalism skills in a professional environment.',
    location: 'Media Center, 3rd Floor',
    timeCommitment: '8-10 hours/week',
    category: 'Media',
    participants: 32,
    deadline: 'Due Feb 20',
    tags: ['Writing', 'Journalism', 'Media', 'Communication']
  },
  {
    id: '4',
    title: 'Peer Tutoring Program',
    organization: 'Academic Success Center',
    description: 'Share your knowledge and help fellow students succeed academically. Provide one-on-one and group tutoring sessions in your strongest subjects while developing teaching and communication skills.',
    location: 'Library Learning Commons',
    timeCommitment: '4-6 hours/week',
    category: 'Academic',
    participants: 67,
    deadline: 'Due Mar 1',
    tags: ['Teaching', 'Academic Support', 'Mentorship', 'Communication']
  },
  {
    id: '5',
    title: 'Drama Club Production Team',
    organization: 'University Theater Department',
    description: 'Join our upcoming spring production as part of the technical crew. Learn about stage design, lighting, sound, and costume design while working on a professional-level theatrical production.',
    location: 'Fine Arts Building Theater',
    timeCommitment: '10-12 hours/week',
    category: 'Arts',
    participants: 24,
    deadline: 'Due Feb 10',
    tags: ['Theater', 'Technical Skills', 'Creativity', 'Teamwork']
  }
];

export const OpportunityMatch: React.FC = () => {
  const [currentCards, setCurrentCards] = useState(placeholderExtracurriculars);
  const [savedOpportunities, setSavedOpportunities] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSwipe = (direction: 'left' | 'right', cardId: string) => {
    const swipedCard = currentCards.find(card => card.id === cardId);
    
    if (direction === 'right' && swipedCard) {
      setSavedOpportunities(prev => [...prev, cardId]);
      toast({
        title: "Opportunity Saved! 💚",
        description: `${swipedCard.title} has been added to your interests.`,
      });
    } else if (direction === 'left' && swipedCard) {
      toast({
        title: "Passed",
        description: `${swipedCard.title} has been passed.`,
        variant: "destructive",
      });
    }

    // Remove the swiped card with a slight delay for animation
    setTimeout(() => {
      setCurrentCards(prev => prev.filter(card => card.id !== cardId));
    }, 200);
  };

  const handleButtonAction = (action: 'pass' | 'like') => {
    if (currentCards.length === 0) return;
    
    const topCard = currentCards[0];
    handleSwipe(action === 'like' ? 'right' : 'left', topCard.id);
  };

  const resetCards = () => {
    setCurrentCards(placeholderExtracurriculars);
    setSavedOpportunities([]);
    toast({
      title: "Cards Reset",
      description: "All opportunities have been restored.",
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f7fa' }}>
      <Navigation />

      <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)]">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-poppins font-black mb-2" style={{ color: '#5b55f7' }}>
            Opportunity Match
          </h1>
          <p className="text-lg font-poppins font-semibold" style={{ color: '#5b55f7' }}>
            Swipe RIGHT to save an opportunity, left to skip.
          </p>
          <p className="text-sm font-poppins font-medium mt-2" style={{ color: '#5b55f7' }}>
            Saved: {savedOpportunities.length} opportunities
          </p>
        </div>

        {/* Card Stack Area */}
        <div className="relative w-96 h-[500px] mb-8">
          {currentCards.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <GraduationCap className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">All Done!</h3>
              <p className="text-gray-300 text-center mb-4 px-4">
                You've reviewed all available opportunities.
              </p>
              <Button onClick={resetCards} variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <RotateCcw className="w-4 h-4 mr-2" />
                Review Again
              </Button>
            </div>
          ) : (
            <>
              {/* Stack Effect - Show up to 3 cards with offset */}
              {currentCards.slice(0, 3).map((card, index) => (
                <SwipeCard
                  key={card.id}
                  data={card}
                  onSwipe={handleSwipe}
                  zIndex={100 - index}
                />
              )).reverse()}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-6">
          <Button
            onClick={() => handleButtonAction('pass')}
            disabled={currentCards.length === 0}
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 border-2 border-red-400 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </Button>

          <Button
            onClick={resetCards}
            disabled={currentCards.length === placeholderExtracurriculars.length}
            variant="outline"
            className="w-12 h-12 rounded-full bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            onClick={() => handleButtonAction('like')}
            disabled={currentCards.length === 0}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 border-2 border-green-400 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};