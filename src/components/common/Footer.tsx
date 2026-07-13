import React from 'react';
import { Link } from 'react-router-dom';
import { CONTACT_CONFIG } from '../../config/contacts';

export const Footer = () => {
  return (
    <footer className="bg-navy-700 text-pearl pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="mb-6">
            <img 
              src="/images/logo/logo_tranparent.png" 
              alt="Hotel Serene Praia" 
              className="h-24 w-auto object-contain"
            />
          </div>
          <p className="text-pearl/70 text-body-sm mb-6 max-w-sm">
            Experience unparalleled luxury where the ocean meets architectural perfection. 
            A sanctuary of tranquility in Visakhapatnam.
          </p>
          <div className="flex gap-4">
            <a href={CONTACT_CONFIG.instagram} target="_blank" rel="noreferrer" className="text-gold hover:text-white transition-colors">
              IG
            </a>
            <a href={CONTACT_CONFIG.facebook} target="_blank" rel="noreferrer" className="text-gold hover:text-white transition-colors">
              FB
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-heading-sm text-white mb-6">Quick Links</h4>
          <ul className="space-y-4 text-body-sm text-pearl/70">
            <li><Link to="/about" className="hover:text-gold transition-colors">Our Story</Link></li>
            <li><Link to="/rooms" className="hover:text-gold transition-colors">Our Rooms</Link></li>
            <li><Link to="/banquet" className="hover:text-gold transition-colors">Banquet Hall</Link></li>
            <li><Link to="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-heading-sm text-white mb-6">Contact Us</h4>
          <ul className="space-y-4 text-body-sm text-pearl/70">
            <li>
              <a href={`tel:${CONTACT_CONFIG.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-gold transition-colors">
                {CONTACT_CONFIG.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_CONFIG.email}`} className="hover:text-gold transition-colors">
                {CONTACT_CONFIG.email}
              </a>
            </li>
            <li className="leading-relaxed">
              {CONTACT_CONFIG.address}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-heading-sm text-white mb-6">Newsletter</h4>
          <p className="text-body-sm text-pearl/70 mb-4">Subscribe for exclusive offers and updates.</p>
          <form className="flex border border-white/20 rounded-sm overflow-hidden" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent px-4 py-3 text-body-sm w-full outline-none focus:bg-white/5 transition-colors"
            />
            <button type="submit" className="bg-gold text-navy px-4 font-medium hover:bg-gold-600 transition-colors">
              JOIN
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-caption text-pearl/50">
        <p>&copy; {new Date().getFullYear()} Hotel Serene Praia. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};
