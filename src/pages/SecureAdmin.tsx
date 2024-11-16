import React, { useEffect, useState } from 'react';
import { useAdmin } from '../context/AdminContext';

export const SecureAdmin: React.FC = () => {
  const { setIsAdminOpen } = useAdmin();
  const [keySequence, setKeySequence] = useState('');
  const secretCode = 'pixelnoir';

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const newSequence = keySequence + e.key;
      setKeySequence(newSequence);

      if (newSequence.includes(secretCode)) {
        setIsAdminOpen(true);
        setKeySequence('');
      }

      // Reset sequence after 2 seconds of inactivity
      setTimeout(() => setKeySequence(''), 2000);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [keySequence, setIsAdminOpen]);

  return (
    <div className="min-h-screen bg-gray-950" />
  );
};