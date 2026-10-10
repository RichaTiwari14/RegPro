import { Link } from 'react-router-dom';
import { Seo } from '@/lib/seo';
import { Container, WhatsAppButton } from '@/components/ui';
import { LogoMark } from '@/components/Logo';

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for does not exist." path="/404" noindex />
      <Container className="flex min-h-[70vh] flex-col items-center justify-center pb-20 pt-32 text-center">
        <LogoMark animated className="h-24 w-auto" />
        <p className="mt-6 font-light text-6xl  text-olive-800">404</p>
        <p className="mt-2 text-ink/65">This page doesn’t exist — but we can still help you get registered.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="rounded-full bg-olive-800 px-7 py-4 text-xs font-medium tracking-tight text-white hover:bg-olive-900">
            Go to home
          </Link>
          <WhatsAppButton source="404" />
        </div>
      </Container>
    </>
  );
}
