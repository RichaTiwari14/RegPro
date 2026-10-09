import { Link } from 'react-router-dom';
import { Seo } from '@/lib/seo';
import { Container, WhatsAppButton } from '@/components/ui';
import { LogoMark } from '@/components/Logo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for does not exist." path="/404" noindex />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <LogoMark animated className="h-24 w-auto" />
        <p className="mt-6 font-display text-6xl font-bold text-navy-900">404</p>
        <p className="mt-2 text-ink/65">This page doesn’t exist — but we can still help you get registered.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="rounded-xl bg-navy-800 px-6 py-3 font-semibold text-white hover:bg-navy-900">
            Go to home
          </Link>
          <WhatsAppButton source="404" />
        </div>
      </Container>
    </>
  );
}
