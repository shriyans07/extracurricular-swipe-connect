import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Users, GraduationCap } from 'lucide-react';

interface ExtracurricularData {
  id: string;
  title: string;
  organization: string;
  description: string;
  location: string;
  timeCommitment: string;
  category: string;
  participants: number;
  deadline: string;
  tags: string[];
}

interface SwipeCardProps {
  data: ExtracurricularData;
  onSwipe: (direction: 'left' | 'right', id: string) => void;
  zIndex: number;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({ data, onSwipe, zIndex }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    setDragOffset({ x: deltaX, y: deltaY * 0.1 }); // Reduced Y movement for more natural feel
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Determine swipe direction based on horizontal offset
    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      const direction = dragOffset.x > 0 ? 'right' : 'left';
      onSwipe(direction, data.id);
    }
    
    // Reset position if not swiped far enough
    setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startPos, dragOffset.x]);

  const rotation = dragOffset.x * 0.1; // Subtle rotation based on drag
  const opacity = Math.max(0.8, 1 - Math.abs(dragOffset.x) / 300);
  
  const showLikeIndicator = dragOffset.x > 50;
  const showPassIndicator = dragOffset.x < -50;

  return (
    <div
      ref={cardRef}
      className="swipe-card absolute w-96 h-[500px] select-none"
      style={{
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
        opacity,
        zIndex,
        transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Swipe Indicators */}
      <div 
        className="swipe-indicator-like"
        style={{ opacity: showLikeIndicator ? 1 : 0 }}
      >
        INTERESTED
      </div>
      <div 
        className="swipe-indicator-pass"
        style={{ opacity: showPassIndicator ? 1 : 0 }}
      >
        PASS
      </div>

      {/* Card Content */}
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 font-poppins font-medium">
              {data.category}
            </Badge>
            <span className="text-sm text-gray-500 font-poppins font-medium">{data.deadline}</span>
          </div>
          <h2 className="text-xl font-poppins font-bold text-gray-900 mb-1">{data.title}</h2>
          <p className="text-gray-600 font-poppins font-semibold">{data.organization}</p>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm font-poppins font-normal leading-relaxed mb-4 flex-1">
          {data.description}
        </p>

        {/* Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600 font-poppins font-medium">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {data.location}
          </div>
          
          <div className="flex items-center text-sm text-gray-600 font-poppins font-medium">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            {data.timeCommitment}
          </div>
          
          <div className="flex items-center text-sm text-gray-600 font-poppins font-medium">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            {data.participants} participants
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-4">
          {data.tags.slice(0, 4).map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-[10px] px-2 py-0.5 font-poppins font-medium"
              style={{ color: '#5b55f7', borderColor: '#5b55f7' }}
            >
              {tag}
            </Badge>
          ))}
          {data.tags.length > 4 && (
            <Badge 
              variant="outline" 
              className="text-[10px] px-2 py-0.5 font-poppins font-medium"
              style={{ color: '#5b55f7', borderColor: '#5b55f7' }}
            >
              +{data.tags.length - 4}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};