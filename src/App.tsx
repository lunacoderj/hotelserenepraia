import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Header } from './components/common/Header'
import { Footer } from './components/common/Footer'
import { LoadingScreen } from './components/common/LoadingScreen'
import { GlobalOverlays } from './components/common/GlobalOverlays'
import { Home } from './pages/Home'
import { GlobalSchema, SiteNavigationSchema } from './components/common/SchemaMarkup'
import { Rooms } from './pages/Rooms'
import { RoomDetails } from './pages/RoomDetails'
import { Banquet } from './pages/Banquet'
import { Gallery } from './pages/Gallery'
import { Contact } from './pages/Contact'
import { NearbyAttractions } from './pages/NearbyAttractions'
import { About } from './pages/About'
import { Restaurant } from './pages/Restaurant'
import { OfferLayout } from './pages/offers/OfferLayout'
import { ClaimOffer } from './pages/offers/ClaimOffer'
import { NearbyLanding } from './pages/NearbyLanding'
import { GuidePage } from './pages/GuidePage'
import { Privacy } from './pages/Privacy'
import { Terms } from './pages/Terms'
import { NotFound } from './pages/NotFound'
import { AdminRoutes } from './admin/AdminRoutes'

import { initGA, logPageView } from './utils/analytics'

// ScrollToTop component to handle route changes
const ScrollToTop = () => {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
    logPageView();
  }, [pathname, search])
  return null
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  // Ensure page starts at top on mount without smooth scrolling
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  useEffect(() => {
    initGA()
    // Simulate initial loading sequence (assets, fonts, etc)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <LoadingScreen isLoading={isLoading} />
      <GlobalOverlays />
      <GlobalSchema />
      <SiteNavigationSchema />
      
      {/* 
        Subdomain Routing: 
        If the user is on admin.hotelserenepraia.in, only load the AdminRoutes.
        For local development, we fallback to checking if the path starts with /admin.
      */}
      {window.location.hostname.startsWith('admin.') || window.location.hostname === 'hsp-admin.vercel.app' ? (
        <Routes>
          <Route path="/*" element={<AdminRoutes />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/rooms" element={<Layout><Rooms /></Layout>} />
          <Route path="/rooms/:slug" element={<Layout><RoomDetails /></Layout>} />
          <Route path="/banquet" element={<Layout><Banquet /></Layout>} />
          <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/restaurant" element={<Layout><Restaurant /></Layout>} />
          <Route path="/attractions" element={<Layout><NearbyAttractions /></Layout>} />
          <Route path="/nearby/:slug" element={<Layout><NearbyLanding /></Layout>} />
          <Route path="/guide/:slug" element={<Layout><GuidePage /></Layout>} />
          <Route path="/offers/:slug" element={<Layout><OfferLayout /></Layout>} />
          <Route path="/claim-offer/:id" element={<ClaimOffer />} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="/terms" element={<Layout><Terms /></Layout>} />
          {/* Only allow /admin path access in local development */}
          {isLocal && <Route path="/admin/*" element={<AdminRoutes />} />}
          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

export default App

