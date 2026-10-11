import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { testimonialsData } from '../../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE9] text-xs font-semibold text-[#27412E] mb-3">
            <span>Success Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#162A1D] tracking-tight mb-3">
            What Our Clients Say
          </h2>
          <p className="text-sm sm:text-base text-[#526056]">
            Stories from entrepreneurs who started their journey with Regpro.
          </p>
        </div>

        {/* Testimonials 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonialsData.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8ECE8] shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-[#162A1D] leading-relaxed mb-6 font-medium">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Info with avatar matching mock */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#F4EFE6]">
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#DEE8E0]"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#162A1D]">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#7E9081]">
                    {item.role} {item.company ? `• ${item.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots as seen in mock */}
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setActiveIndex(0)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeIndex === 0 ? 'w-6 bg-[#162A1D]' : 'bg-[#D4E2D6]'
            }`}
            aria-label="Testimonial slide 1"
          />
          <button
            onClick={() => setActiveIndex(1)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeIndex === 1 ? 'w-6 bg-[#162A1D]' : 'bg-[#D4E2D6]'
            }`}
            aria-label="Testimonial slide 2"
          />
          <button
            onClick={() => setActiveIndex(2)}
            className={`w-2 h-2 rounded-full transition-all ${
              activeIndex === 2 ? 'w-6 bg-[#162A1D]' : 'bg-[#D4E2D6]'
            }`}
            aria-label="Testimonial slide 3"
          />
        </div>
      </div>
    </section>
  );
};

