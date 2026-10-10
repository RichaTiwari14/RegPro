import { Seo, breadcrumbLd } from '@/lib/seo';
import { site } from '@/config/site';
import { PageHero } from '@/components/PageHero';
import { Container } from '@/components/ui';

// TODO: have these reviewed by the client's legal advisor before launch.
const privacy: { h: string; p: string }[] = [
  { h: 'Information we collect', p: 'We collect the information you share with us through our enquiry forms, WhatsApp, phone or email — such as your name, phone number, email, city and documents required for your application.' },
  { h: 'How we use your information', p: 'We use your information only to respond to your enquiry, provide the services you request, file applications with the relevant government authorities, and send you updates about your application.' },
  { h: 'Sharing of information', p: 'We do not sell or rent your personal information. Documents are shared only with the government departments or authorised agencies required to process your application.' },
  { h: 'Analytics and cookies', p: 'We use tools such as Google Analytics and Meta Pixel to understand how visitors use our website and to improve our services. These tools may use cookies. You can disable cookies in your browser settings.' },
  { h: 'Data security', p: 'We take reasonable measures to protect your information from unauthorised access, alteration or disclosure.' },
  { h: 'Your rights', p: `You may request access to, correction of, or deletion of your personal information by writing to us at ${site.email}.` },
  { h: 'Changes to this policy', p: 'We may update this policy from time to time. The latest version will always be available on this page.' },
];

const terms: { h: string; p: string }[] = [
  { h: 'Our services', p: `${site.name} provides professional assistance for business registrations, government documentation and compliance. ${site.name} is a private firm and is not affiliated with any government department.` },
  { h: 'Fees', p: `Prices shown on the website are our professional fees. ${site.feeNote} The final quote is confirmed before you make a payment.` },
  { h: 'Your responsibilities', p: 'You agree to provide accurate and complete information and genuine documents. We are not responsible for delays or rejections caused by incorrect or incomplete information.' },
  { h: 'Timelines', p: 'Processing times shown are estimates. Approvals depend on government departments and may take longer due to queries, objections or portal issues outside our control.' },
  { h: 'Refunds', p: 'Government fees once paid are non-refundable. Refunds of professional fees, if any, are handled on a case-by-case basis depending on the work already completed.' },
  { h: 'Limitation of liability', p: 'Our liability for any claim is limited to the professional fee paid for the specific service in question.' },
  { h: 'Governing law', p: 'These terms are governed by the laws of India, and courts in Bengaluru, Karnataka shall have exclusive jurisdiction.' },
];

function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const isPrivacy = kind === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
  const path = isPrivacy ? '/privacy-policy' : '/terms-and-conditions';
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: title, path },
  ];
  const content = isPrivacy ? privacy : terms;
  return (
    <>
      <Seo title={title} description={`${title} of ${site.name}.`} path={path} jsonLd={[breadcrumbLd(crumbs)]} />
      <PageHero title={title} crumbs={crumbs} text="Last updated: October 2026" />
      <Container className="max-w-3xl space-y-8 py-14 sm:py-20">
        {content.map((s) => (
          <section key={s.h}>
            <h2 className="heading-cine text-xl text-white">{s.h}</h2>
            <p className="mt-2 leading-relaxed text-white/75">{s.p}</p>
          </section>
        ))}
        <p className="text-sm text-white/60">
          Questions? Contact us at <a className="font-medium text-white" href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Container>
    </>
  );
}

export const PrivacyPolicy = () => <LegalPage kind="privacy" />;
export const Terms = () => <LegalPage kind="terms" />;
