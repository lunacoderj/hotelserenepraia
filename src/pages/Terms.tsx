import React from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/common/SEOHead';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CONTACT_CONFIG } from '../config/contacts';

export const Terms: React.FC = () => {
  return (
    <div className="bg-pearl min-h-screen">
      <SEOHead 
        title="Terms of Service | Hotel Serene Praia, Rushikonda"
        description="Review the Terms of Service and booking conditions for Hotel Serene Praia, Rushikonda, Visakhapatnam."
      />

      <div className="pt-24 pb-12 bg-navy text-pearl">
        <div className="max-w-4xl mx-auto px-6">
          <Breadcrumbs items={[{ label: 'Terms of Service', path: '/terms' }]} />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-heading-xl text-white mt-6 mb-4"
          >
            Terms of <span className="text-gold italic">Service</span>
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
              1. Acceptance of Terms
            </h2>
            <p className="text-body-md text-navy-500/90">
              Welcome to <strong>Hotel Serene Praia</strong> ("we", "us", or "our"). By accessing or using our website (<strong>hotelserenepraia.in</strong>), booking accommodation, dining at our restaurant, or reserving our banquet facilities, you agree to comply with and be bound by these Terms of Service. If you disagree with any part of these terms, please do not use our website or services.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              2. Room Reservations and Payments
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-body-sm text-navy-500/80">
              <li>All reservations are subject to room availability and formal confirmation from Hotel Serene Praia.</li>
              <li>Guests must provide valid government-issued photo identification (Aadhaar Card, Passport, Driving License, or Voter ID) during check-in. PAN cards are not accepted as valid identity proof as per government regulations.</li>
              <li>Applicable taxes and service charges will be levied according to statutory regulations at the time of billing.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              3. Check-in and Check-out Policies
            </h2>
            <div className="bg-pearl/50 p-5 rounded-sm space-y-2 text-body-sm text-navy-600 mb-3">
              <p><strong>Standard Check-in Time:</strong> 12:00 PM (Noon)</p>
              <p><strong>Standard Check-out Time:</strong> 11:00 AM</p>
            </div>
            <p className="text-body-sm text-navy-500/80">
              Early check-in and late check-out requests are subject to availability and may incur additional charges unless prior written confirmation has been granted by management.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              4. Cancellation and Modification Policy
            </h2>
            <p className="text-body-md text-navy-500/90 mb-3">
              Cancellation policies may vary depending on the room rate, season, or package selected:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-body-sm text-navy-500/80">
              <li>Cancellations requested at least 48 hours prior to the scheduled arrival date may receive a full or partial refund in accordance with the specific booking tariff.</li>
              <li>Cancellations made within 48 hours of check-in, or failure to arrive ("No Show"), will be charged the equivalent of one night's room tariff.</li>
              <li>Special event and banquet cancellations are governed by separate contract agreements.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              5. Guest Conduct and Hotel Property
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-body-sm text-navy-500/80">
              <li>Guests are expected to conduct themselves respectfully without disturbing the comfort and tranquility of other guests.</li>
              <li>Any willful or accidental damage caused to hotel property, furniture, or fixtures will be charged directly to the responsible guest.</li>
              <li>Hotel Serene Praia is committed to maintaining a secure, family-friendly environment. Illegal substances, hazardous materials, and unauthorized commercial activities are strictly prohibited on premises.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              6. Intellectual Property
            </h2>
            <p className="text-body-md text-navy-500/90">
              All materials, logos, imagery, text, graphics, and branding displayed on this website are the proprietary property of Hotel Serene Praia. Unauthorized reproduction, modification, or distribution is prohibited without prior written permission.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              7. Limitation of Liability
            </h2>
            <p className="text-body-md text-navy-500/90">
              While we strive to ensure a pristine stay and accurate information across our digital platforms, Hotel Serene Praia shall not be liable for any indirect, incidental, or consequential damages resulting from website disruptions, force majeure events, or unforeseen local utility interruptions.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="font-display text-heading-sm text-navy mb-4 border-b border-gold/30 pb-2">
              8. Contact Information
            </h2>
            <p className="text-body-md text-navy-500/90 mb-4">
              For any inquiries regarding our Terms of Service, reservations, or policies, please contact:
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
