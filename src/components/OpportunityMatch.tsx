import React, { useState } from 'react';
import { SwipeCard } from './SwipeCard';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import Navigation from './Navigation';

// Placeholder data - replace with DB data later
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

    // Looping carousel: move swiped card to the end
    const handleSwipe = (direction: 'left' | 'right', cardId: string) => {
        setTimeout(() => {
            setCurrentCards(prev => {
                const idx = prev.findIndex(c => c.id === cardId);
                if (idx === -1) return prev;
                const next = [...prev];
                const [card] = next.splice(idx, 1);
                next.push(card); // rotate to end
                return next;
            });
        }, 200); // keep your swipe animation delay
    };

    // Optional: restore original ordering
    const resetCards = () => {
        setCurrentCards(placeholderExtracurriculars);
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f5f7fa' }}>
            <Navigation />

            <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-80px)]">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-poppins font-black mb-2 text-black">
                        Opportunity Match
                    </h1>
                    <p className="text-lg font-poppins font-semibold text-black">
                        Swipe RIGHT to save opportunities, left to skip.
                    </p>
                </div>

                {/* Card Stack Area */}
                <div className="relative w-96 h-[500px] mb-8">
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
                </div>

            </div>
        </div>
    );
};
