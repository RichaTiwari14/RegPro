/**
 * Client testimonials. Add ONLY genuine, client-approved feedback here (with the client's permission
 * to show their name). The testimonials section stays hidden while this list is empty.
 */
export interface Testimonial {
  name: string;
  role: string;
  service: string;
  quote: string;
}

export const testimonials: Testimonial[] = [];
