import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { AdminModal } from './AdminModal';
import { useAdmin } from '../context/AdminContext';
import { auth } from '../lib/firebase';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { isAdminOpen, setIsAdminOpen } = useAdmin();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isHome ? 'bg-transparent' : 'bg-gray-950/80 backdrop-blur-md border-b border-cyan-900/30'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link 
              to="/" 
              className="text-2xl font-cyberpunk text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300 hover:to-cyan-200 transition-colors"
            >
              PIXEL NOIR
            </Link>
            <div className="flex items-center gap-8">
              <Link 
                to="/portfolio" 
                className="text-gray-300 hover:text-cyan-400 transition-colors tracking-wider text-sm"
              >
                PORTFOLIO
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-300 hover:text-cyan-400 transition-colors tracking-wider text-sm"
              >
                CONTACT
              </Link>
              {auth.currentUser && (
                <button 
                  onClick={() => setIsAdminOpen(true)}
                  className="p-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  aria-label="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>
        {children}
      </main>
      <AdminModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
};