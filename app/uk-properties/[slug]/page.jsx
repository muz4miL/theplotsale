import connectDB from '@/lib/mongodb';
import Property from '@/models/Property';
import Link from 'next/link';
import { Bed, Bath, Maximize2, MapPin, ArrowLeft, ArrowUpRight, Home } from 'lucide-react';
import ListingLogo from '@/components/ListingLogo';
import ProjectLuxuryShowcase from '@/components/projects/ProjectLuxuryShowcase';
import LuxuryVideoPlayer from '@/components/projects/LuxuryVideoPlayer';
import PropertyDetailClient from './PropertyDetailClient';

export const dynamic = 'force-dynamic';

async function getPropertyBySlug(slug) {
  try {
    await connectDB();
    return await Property.findOne({ slug: slug.toLowerCase(), region: 'UK' }).lean();
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

export default async function PropertyDetailPage({ params }) {
  const { slug } = await params;
  const normalizedSlug = typeof slug === 'string' ? slug : '';

  if (!normalizedSlug) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Property not found</p>
          <Link href="/uk-properties" className="text-[#C5A880] hover:underline">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const doc = await getPropertyBySlug(normalizedSlug);
  const property = doc ? JSON.parse(JSON.stringify(doc)) : null;

  if (!property) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Property not found</p>
          <Link href="/uk-properties" className="text-[#C5A880] hover:underline">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  // Pass property data to client component for currency formatting
  return <PropertyDetailClient property={property} />;


