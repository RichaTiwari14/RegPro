import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/lib/seo';
import { Container, WhatsAppButton } from '@/components/ui';
import { LogoMark } from '@/components/Logo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for does not exist." path="/404" noindex />
      <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <LogoMark className="h-16 w-auto" />
        <p className="mt-8 font-display text-6xl text-forest-800">404</p>
        <h1 className="mt-2 font-display text-2xl text-forest-800">Page not found</h1>
        <p className="mt-3 max-w-md text-muted">This page doesn’t exist — but we can still help you find the right registration.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/services" className="btn-primary">
            Explore services <ArrowRight className="h-4 w-4" />
          </Link>
          <WhatsAppButton label="WhatsApp us" source="404" />
        </div>
      </Container>
    </>
  );
}
