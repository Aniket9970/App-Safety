import React from 'react';

interface IconProps {
  type: 'shield' | 'calculator' | 'guide';
  color?: string;
  size?: number;
}

export default function Icon({ type, color = '#4F46E5', size = 40 }: IconProps) {
  const renderIcon = () => {
    switch (type) {
      case 'shield':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          >
            <path d="M12 2L3 7v6a12 12 0 0 0 9 11.6A12 12 0 0 0 21 13V7l-9-5z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        );

      case 'calculator':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          >
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <rect x="7" y="5" width="10" height="3" fill={color} />
            <circle cx="8" cy="12" r="1" fill={color} />
            <circle cx="12" cy="12" r="1" fill={color} />
            <circle cx="16" cy="12" r="1" fill={color} />
            <circle cx="8" cy="16" r="1" fill={color} />
            <circle cx="12" cy="16" r="1" fill={color} />
            <circle cx="16" cy="16" r="1" fill={color} />
          </svg>
        );

      case 'guide':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-sm"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            <path d="M8 7h8" />
            <path d="M8 11h8" />
            <path d="M8 15h5" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-14 h-14 mb-4 flex items-center justify-center group">
      <div className="transform transition-transform duration-200 group-hover:scale-110">
        {renderIcon()}
      </div>
    </div>
  );
} 