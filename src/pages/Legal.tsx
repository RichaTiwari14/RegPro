import { AlertTriangle } from 'lucide-react';
import { Seo, breadcrumbLd } from '@/lib/seo';
import { site } from '@/config/site';
import { privacy, terms, legalUpdated, type LegalSection } from '@/data/legal';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui';
import { Reveal } from '@/components/Reveal';

function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
  const path = isPrivacy ? '/privacy-policy' : '/terms-and-conditions';
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: title, path },
  ];
  const content: LegalSection[] = isPrivacy ? privacy : terms;
  return (
    <>
      <Seo title={title} description={`${title} of ${site.name}.`} path={path} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero eyebrow="Legal" title={title} crumbs={crumbs} text={`Last updated: ${legalUpdated}`} />
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[240px_1fr]">
        <nav aria-label="On this page" className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
          <p className="eyebrow">On this page</p>
          <ol className="mt-4 space-y-1 border-l border-line">
            {content.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted transition-colors hover:border-forest-800 hover:text-forest-800">
                  {i + 1}. {s.h}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="min-w-0 max-w-3xl">
          <div className="flex items-start gap-3 rounded-xl border border-clay-200 bg-clay-50 p-5 text-sm text-clay-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Draft for client review. This page is an editable starting point, not legal advice, and is not guaranteed to be legally compliant. Sections
              marked “Requires review” must be confirmed with a legal advisor before publication.
            </p>
          </div>
          {content.map((s, i) => (
            <Reveal key={s.id}>
              <section id={s.id} className="scroll-mt-32 border-b border-line py-8">
                <h2 className="flex flex-wrap items-center gap-3 font-display text-2xl text-forest-800">
                  <span className="text-forest-500">{i + 1}.</span> {s.h}
                  {s.review && <span className="rounded-full border border-sage-300 px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-clay-700">Requires review</span>}
                </h2>
                {s.p.map((p) => (
                  <p key={p} className="mt-3 leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </section>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}

export const PrivacyPolicy = () => <LegalPage kind="privacy" />;
export const Terms = () => <LegalPage kind="terms" />;
