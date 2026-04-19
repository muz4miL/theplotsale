import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import JsonLd from '@/components/seo/JsonLd';
import { pageMetadata, breadcrumbLd, projectLd, BRAND } from '@/lib/seo';

/**
 * Dynamic metadata + JSON-LD for a single Pakistan project page.
 * We fetch straight from Mongo at request-time on the server so the <title>,
 * OG card and schema.org Place node are all in sync with the CMS data —
 * no stale duplication, no client round-trip.
 */

export const dynamic = 'force-dynamic';

async function fetchProject(slug) {
  try {
    await connectDB();
    const doc = await Project.findOne({ slug: slug.toLowerCase() }).lean();
    return doc;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await fetchProject(slug);

  if (!project) {
    return pageMetadata({
      title: 'Project Not Found',
      description: 'This project is no longer available.',
      path: `/pakistan-projects/${slug}`,
      noindex: true,
    });
  }

  const title = `${project.title} · ${project.location} — ${project.status || 'Featured'} Project`;
  const desc =
    (project.description && project.description.slice(0, 180)) ||
    `${project.title} in ${project.location}. A ${
      project.status?.toLowerCase() || 'flagship'
    } development${
      project.totalArea ? ` spanning ${project.totalArea}` : ''
    }${
      project.paymentPlan ? `, with ${project.paymentPlan.toLowerCase()} payment terms` : ''
    }. Represented by ${BRAND.name}.`;

  return pageMetadata({
    title,
    description: desc,
    path: `/pakistan-projects/${slug}`,
    image: project.mainImage || undefined,
    keywords: [
      project.title,
      `${project.title} plots`,
      `${project.title} price`,
      `${project.location} real estate`,
      `${project.location} plots`,
      `${project.location} property`,
      'ThePlotSale Pakistan',
    ],
  });
}

export default async function PakistanProjectSlugLayout({ children, params }) {
  const { slug } = await params;
  const project = await fetchProject(slug);

  const ld = [
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Pakistan Projects', path: '/pakistan-projects' },
      { name: project?.title || 'Project', path: `/pakistan-projects/${slug}` },
    ]),
    project && projectLd(JSON.parse(JSON.stringify(project)), slug),
  ];

  return (
    <>
      <JsonLd data={ld} />
      {children}
    </>
  );
}
