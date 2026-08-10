import React from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CONTACT_CONFIG } from '../config/contacts';

export const Privacy: React.FC = () => {
  return (
    <div className="bg-pearl min-h-screen">
      <SEOHead 
        title="Privacy Policy | Hotel Serene Praia, Rushikonda"
        description="Read the Privacy Policy of Hotel Serene Praia. Learn how we handle your personal information, cookies, and data privacy in accordance with applicable standards."
      />

      <div className="pt-24 pb-12 bg-navy text-pearl">
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumbs items={[{ label: 'Privacy Policy', path: '/privacy' }]} />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-heading-xl text-white mt-6 mb-4"
          >
            Privacy <span className="text-gold italic">Policy</span>
          </motion.h1>
          <p className="text-pearl/70 text-body-sm">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white p-8 md:p-14 shadow-luxury border border-navy/5 space-y-10 text-navy-700 leading-relaxed font-body"
        >
          {/* Section 1 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              1. Introduction
            </h2>
            <p className="text-body-md text-navy-500/90 mb-4">
              At <strong>Hotel Serene Praia</strong> ("we", "our", or "us"), we value your trust and are committed to safeguarding your privacy and personal data. This Privacy Policy outlines our practices concerning the collection, storage, use, and disclosure of information when you visit our website (<strong>hotelserenepraia.in</strong>) or utilize our hospitality and booking services at Rushikonda, Visakhapatnam.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              2. Information We Collect
            </h2>
            <p className="text-body-md text-navy-500/90 mb-3">
              We collect information to provide superior hospitality services and seamless digital experiences:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-body-sm text-navy-500/80">
              <li><strong>Personal Contact Information:</strong> Name, email address, phone number, and postal address provided through reservation inquiries, contact forms, or newsletter subscriptions.</li>
              <li><strong>Booking Details:</strong> Stay dates, room preferences, banquet requirements, and special service requests.</li>
              <li><strong>Technical and Log Data:</strong> Internet Protocol (IP) address, browser type, operating system, device identifiers, referring URLs, and pages visited on our site.</li>
            </ul>
          </section>

          {/* Section 3: Google AdSense and Third-Party Advertising (Critical for AdSense Compliance) */}
          <section className="bg-pearl/50 p-6 md:p-8 rounded-sm border-l-4 border-gold">
            <h2 className="font-display text-heading-sm text-navy mb-4">
              3. Google AdSense & Third-Party Advertising Cookies
            </h2>
            <p className="text-body-md text-navy-500/90 mb-4">
              We may display advertisements on our website through third-party advertising partners, including <strong>Google AdSense</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-3 text-body-sm text-navy-500/80 mb-4">
              <li>
                <strong>Third-Party Vendor Cookies:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites across the Internet.
              </li>
              <li>
                <strong>Personalized Advertising:</strong> Google's use of advertising cookies enables it and its partners to serve personalized ads to our visitors based on their visit to our site and/or other sites on the Internet.
              </li>
              <li>
                <strong>Opting Out:</strong> You may opt out of personalized advertising by visiting{' '}
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gold font-medium hover:underline"
                >
                  Google Ads Settings
                </a>. Alternatively, you can opt out of third-party vendor use of cookies for personalized advertising by visiting{' '}
                <a 
                  href="https://www.aboutads.info/choices/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gold font-medium hover:underline"
                >
                  www.aboutads.info/choices
                </a>.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              4. Web Analytics and Tracking Technologies
            </h2>
            <p className="text-body-md text-navy-500/90 mb-3">
              We use <strong>Google Analytics</strong> to evaluate website traffic, track user engagement patterns, and enhance user experience. Google Analytics gathers information about website use by means of cookies. The information gathered relating to our website is used to create reports about the use of our website. Google's privacy policy is available at:{' '}
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gold font-medium hover:underline"
              >
                https://policies.google.com/privacy
              </a>.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              5. How We Use Collected Data
            </h2>
            <p className="text-body-md text-navy-500/90 mb-3">
              Your information is utilized solely for legitimate business purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-body-sm text-navy-500/80">
              <li>Processing room and banquet reservations and confirming bookings.</li>
              <li>Responding to customer support inquiries and special event requests.</li>
              <li>Improving website performance, navigation, and responsiveness.</li>
              <li>Sending occasional promotional offers (only if you have explicitly subscribed).</li>
              <li>Ensuring security and preventing fraudulent activities.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              6. Data Protection & Security
            </h2>
            <p className="text-body-md text-navy-500/90">
              We implement industry-standard administrative, technical, and physical security measures to safeguard your personal information against unauthorized access, loss, alteration, or misuse. However, please understand that no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              7. Your Rights & Cookie Management
            </h2>
            <p className="text-body-md text-navy-500/90 mb-3">
              You have the right to access, update, or request the deletion of any personal data we hold about you. Furthermore, most web browsers permit you to manage or disable cookie preferences through your individual browser settings. Note that disabling cookies may affect the functionality of certain website features.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              8. Contact Us
            </h2>
            <p className="text-body-md text-navy-500/90 mb-4">
              If you have any questions regarding this Privacy Policy or wish to exercise your data protection rights, please reach out to us:
            </p>
            <div className="bg-pearl/60 p-6 rounded-sm space-y-2 text-body-sm text-navy-700">
              <p><strong>Hotel Serene Praia</strong></p>
              <p><strong>Address:</strong> {CONTACT_CONFIG.address}</p>
              <p><strong>Email:</strong> <a href={`mailto:${CONTACT_CONFIG.email}`} className="text-gold hover:underline">{CONTACT_CONFIG.email}</a></p>
              <p><strong>Phone:</strong> <a href={`tel:${CONTACT_CONFIG.phone.replace(/[^0-9+]/g, '')}`} className="text-gold hover:underline">{CONTACT_CONFIG.phone}</a></p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};
