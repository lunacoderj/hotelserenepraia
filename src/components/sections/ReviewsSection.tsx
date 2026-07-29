import React from 'react';
import { motion } from 'framer-motion';
import { GUEST_REVIEWS, AGGREGATE_RATING } from '../../data/seoData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden" aria-label="Guest Reviews">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[1px] bg-gold" />
            <span className="font-body text-caption tracking-[0.2em] uppercase text-gold">Guest Experiences</span>
            <div className="w-8 h-[1px] bg-gold" />
          </div>
          <h2 className="font-display text-heading-xl text-navy mb-6">What Our Guests Say</h2>

          {/* Aggregate Rating */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex items-center gap-1" aria-label={`Rated ${AGGREGATE_RATING.ratingValue} out of 5`}>
              {[1, 2, 3, 4, 5].map(star => (
                <svg
                  key={star}
                  className={`w-6 h-6 ${star <= Math.floor(AGGREGATE_RATING.ratingValue) ? 'text-gold' : star <= AGGREGATE_RATING.ratingValue ? 'text-gold/60' : 'text-navy/20'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-display text-heading-md text-gold">{AGGREGATE_RATING.ratingValue}</span>
          </div>
          <p className="font-body text-body-sm text-navy-500/50">
            Based on {AGGREGATE_RATING.reviewCount} guest reviews
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUEST_REVIEWS.slice(0, 6).map((review, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-pearl p-8 rounded-sm border border-navy/5 hover:border-gold/20 hover:shadow-lg transition-all duration-500 flex flex-col"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4" aria-label={`${review.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map(star => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${star <= review.rating ? 'text-gold' : 'text-navy/15'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-display text-heading-sm text-navy mb-3">{review.title}</h3>

              {/* Review Text */}
              <p className="font-body text-body-sm text-navy-500/70 leading-relaxed mb-6 flex-grow">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-navy/5 flex items-center justify-between">
                <div>
                  <p className="font-body text-body-sm text-navy font-medium">{review.name}</p>
                  <p className="font-body text-caption text-navy-500/50">{review.location}</p>
                </div>
                {review.stayType && (
                  <span className="font-body text-[9px] uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
                    {review.stayType}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
