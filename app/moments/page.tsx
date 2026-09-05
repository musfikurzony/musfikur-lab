import type { Metadata } from 'next';
import { moments } from '@/content/moments';
import { momentsPage } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { MomentsGallery } from '@/components/moments/MomentsGallery';

/**
 * /moments (brief §51).
 *
 * `noindex` per your instruction: reachable by direct link, not deliberately
 * listed by search engines.
 *
 * To be clear about what that is and is not — it asks search engines not to
 * list the page. It does not stop anyone who has the link from opening it,
 * and the image files themselves are public. It is a courtesy, not a lock,
 * and it is not a security measure.
 */
export const metadata: Metadata = {
  title: 'Moments',
  description: momentsPage.subtitle,
  alternates: { canonical: '/moments' },
  robots: { index: false, follow: false },
};

export default function MomentsPage() {
  return (
    <div className="pt-[calc(var(--nav-h)+3.5rem)] pb-24 sm:pb-32">
      <Container>
        <header className="mb-12 max-w-2xl sm:mb-14">
          <p className="eyebrow" data-reveal>
            {momentsPage.eyebrow}
          </p>
          <h1
            className="grad-heading mt-4 text-display font-semibold"
            data-reveal
            style={{ '--reveal-delay': '60ms' } as React.CSSProperties}
          >
            {momentsPage.title}
          </h1>
          <p
            className="mt-4 text-body text-ink-2"
            data-reveal
            style={{ '--reveal-delay': '120ms' } as React.CSSProperties}
          >
            {momentsPage.subtitle}
          </p>
        </header>

        <MomentsGallery moments={moments} />
      </Container>
    </div>
  );
}
