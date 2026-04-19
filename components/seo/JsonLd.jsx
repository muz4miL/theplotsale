/**
 * Server component that emits one or more JSON-LD blobs for Google.
 *
 * Pass a single object or an array of objects. Each becomes its own
 * <script type="application/ld+json"> tag (Google prefers discrete blobs
 * so it can selectively ignore one without invalidating the others).
 */

export default function JsonLd({ data }) {
  if (!data) return null;
  const items = Array.isArray(data) ? data.filter(Boolean) : [data];
  if (!items.length) return null;

  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Disabling React's warning — this is literal JSON, not HTML.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
