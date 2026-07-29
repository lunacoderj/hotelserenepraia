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
import { NotFound } from './pages/NotFound'

// ScrollToTop component to handle route changes
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])
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

  useEffect(() => {
    // Simulate initial loading sequence (assets, fonts, etc)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <LoadingScreen isLoading={isLoading} />
      <GlobalOverlays />
      <GlobalSchema />
      <SiteNavigationSchema />
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
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

