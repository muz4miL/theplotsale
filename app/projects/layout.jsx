import { pageMetadata } from '@/lib/seo';

/**
 * /projects is a legacy alias for /pakistan-projects. We still render the
 * same page but point canonical at the proper slug so Google consolidates
 * ranking signals onto the canonical URL.
 */
export const metadata = pageMetadata({
  title: 'Projects — Luxury Pakistan Developments',
  description:
    'Current, upcoming and completed developments across Pakistan. Curated by ThePlotSale — Est. 1998.',
  path: '/pakistan-projects',
});

export default function ProjectsLayout({ children }) {
  return children;
}
