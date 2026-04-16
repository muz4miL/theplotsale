/**
 * Flagship project for /pakistan-projects — driven by env, then heuristics.
 * Set NEXT_PUBLIC_FEATURED_PROJECT_SLUG in .env.local (e.g. exxsn-heights-etihad-town).
 */

function normSlug(s) {
  return String(s || '')
    .trim()
    .toLowerCase();
}

function configuredSlug() {
  return normSlug(process.env.NEXT_PUBLIC_FEATURED_PROJECT_SLUG || '');
}

/** Public name / slug patterns for Exxsn Heights family (incl. common typos). */
function matchesFlagshipHeuristics(project) {
  const slug = normSlug(project.slug);
  const title = String(project.title || '');
  const blob = `${slug} ${title}`.toLowerCase();

  if (
    slug.includes('exxsn') ||
    slug.includes('exxsns') ||
    slug.includes('exxens') ||
    slug.includes('exxsan') ||
    slug.includes('exxen-heights')
  ) {
    return true;
  }
  if (/exx(sn|sns|ens|san|xsns)/i.test(title)) return true;
  if (/exxsn|exxsns|exxens/i.test(title) && /height/i.test(title)) return true;
  if (/etihad\s*town/i.test(blob) && /height/i.test(blob)) return true;
  return false;
}

/**
 * @param {Array<{ slug?: string, title?: string }>} projects
 * @returns {object | null}
 */
export function pickFeaturedFlagshipProject(projects) {
  if (!Array.isArray(projects) || projects.length === 0) return null;

  const envSlug = configuredSlug();
  if (envSlug) {
    const exact = projects.find((p) => normSlug(p.slug) === envSlug);
    if (exact) return exact;
    const partial = projects.find((p) => normSlug(p.slug).includes(envSlug));
    if (partial) return partial;
  }

  const byHeuristic = projects.find((p) => matchesFlagshipHeuristics(p));
  if (byHeuristic) return byHeuristic;

  return null;
}

/** @deprecated use pickFeaturedFlagshipProject */
export const pickFeaturedExxensProject = pickFeaturedFlagshipProject;

/** Editorial stats — aligned with public Lavita / The Plot Sale brief (Exxsn Heights, Etihad Town). */
export function getExxsnHeightsEditorialSpecs() {
  return {
    primaryStat: '10 floors',
    primaryLabel: 'Vertical landmark',
    stackLine: '2 commercial · 2 corporate · 6 residential',
    corridor: 'Main Raiwind Road, Etihad Town',
    context: 'Premium mixed-use stack — retail, workspace, and residences in one silhouette.',
  };
}

export function projectUsesExxsnEditorialSpecs(project) {
  if (!project) return false;
  return matchesFlagshipHeuristics(project);
}
