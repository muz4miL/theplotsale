/**
 * About page layout — the only responsibility here is to instruct the browser to
 * start downloading the cinematic hero video (and its poster image) the moment
 * the route is requested, *before* the hero component mounts.
 *
 * Next.js App Router hoists any <link> tags rendered from a layout into <head>,
 * so this works both in SSR and during client navigation. The result: by the
 * time <AboutHero> renders, the first MB of the video is already in the
 * browser's disk cache, and the video plays almost instantly instead of showing
 * a black/poster frame while it streams in.
 */

export default function AboutLayout({ children }) {
  return (
    <>
      <link
        rel="preload"
        href="/About_Hero_Cinematic.mp4"
        as="video"
        type="video/mp4"
        // fetchpriority is a relatively new hint — helps browsers that honor it
        // (Chromium-based) prioritize the hero asset over everything else.
        fetchPriority="high"
      />
      <link
        rel="preload"
        href="/images/architecture.png"
        as="image"
        type="image/png"
        fetchPriority="high"
      />
      {children}
    </>
  );
}
