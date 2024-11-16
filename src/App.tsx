import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { SecureAdmin } from './pages/SecureAdmin';
import { ArtworkDetails } from './pages/ArtworkDetails';
import { AdminProvider } from './context/AdminContext';
import { FirebaseProvider } from './context/FirebaseContext';

export const App: React.FC = () => {
  return (
    <FirebaseProvider>
      <AdminProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/secure-admin" element={<SecureAdmin />} />
              <Route path="/artwork/:id" element={<ArtworkDetails />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AdminProvider>
    </FirebaseProvider>
  );
};