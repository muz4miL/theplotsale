import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

// Import models
const Property = (await import('../models/Property.js')).default;
const Project = (await import('../models/Project.js')).default;

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Please define MONGODB_URI in .env.local');
  process.exit(1);
}

// Sample UK Properties
const ukProperties = [
  {
    title: '3 Bed Semi-Detached Bungalow',
    slug: '3-bed-semi-detached-bungalow-willow-gardens',
    region: 'UK',
    currency: 'GBP',
    price: 595000,
    location: 'Willow Gardens, Hounslow TW3',
    beds: 3,
    baths: 2,
    areaSqFt: 1920,
    description: 'Charming 3-bedroom semi-detached bungalow in the sought-after Willow Gardens. This property offers spacious living accommodation with a private garden, modern kitchen, and excellent transport links. Perfect for families or investors seeking a prime Hounslow location.',
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=1200',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
    ],
  },
  {
    title: '4 Bed Semi-Detached House',
    slug: '4-bed-semi-detached-house-bassett-gardens',
    region: 'UK',
    currency: 'GBP',
    price: 750000,
    location: 'Bassett Gardens, Isleworth TW7',
    beds: 4,
    baths: 3,
    areaSqFt: 1920,
    description: 'Stunning 4-bedroom semi-detached house in prestigious Bassett Gardens. Features include a spacious reception room, contemporary fitted kitchen, master bedroom with en-suite, landscaped rear garden, and off-street parking. Ideally located near excellent schools and amenities.',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200',
    ],
  },
  {
    title: '2 Bed Flat',
    slug: '2-bed-flat-selbourne-avenue',
    region: 'UK',
    currency: 'GBP',
    price: 425000,
    location: 'Selbourne Avenue, Hounslow TW3',
    beds: 2,
    baths: 1,
    areaSqFt: 1920,
    description: 'Modern 2-bedroom flat on Selbourne Avenue offering bright and spacious accommodation. The property features an open-plan living area, fitted kitchen with integrated appliances, two double bedrooms, and a contemporary bathroom. Excellent transport connections to central London.',
    mainImage: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
    ],
  },
  {
    title: '3 Bed Flat',
    slug: '3-bed-flat-great-west-road',
    region: 'UK',
    currency: 'GBP',
    price: 395000,
    location: 'Great West Road, Isleworth TW7',
    beds: 3,
    baths: 2,
    areaSqFt: 1920,
    description: 'Spacious 3-bedroom flat located on the iconic Great West Road. This well-presented property offers generous living space, modern fixtures throughout, and convenient access to local shops, restaurants, and transport links. Ideal for first-time buyers or buy-to-let investors.',
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
    ],
  },
];

// Sample Pakistan Projects
const pakistanProjects = [
  {
    title: 'Union Town',
    slug: 'union-town',
    status: 'Current',
    location: 'D-Block',
    description: 'Official sales partner. Premium holdings featuring 65 8-Marla commercial plots. Custom payment plans available.',
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
    progressUpdates: [],
  },
  {
    title: 'Smart City Housing',
    slug: 'smart-city-housing',
    status: 'Current',
    location: 'Lahore',
    description: 'Next-generation smart housing society with premium residential blocks and automated infrastructure.',
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    progressUpdates: [],
  },
  {
    title: 'Etihad Town Brand',
    slug: 'etihad-town-brand',
    status: 'Current',
    location: 'Main Raiwind Road',
    description: 'Official brand phase development. Luxury commercial and residential plots in prime location.',
    mainImage: 'https://images.unsplash.com/photo-1613490908578-79c6536bbd61?q=80&w=2070&auto=format&fit=crop',
    progressUpdates: [],
  },
  {
    title: 'Siddique Heights',
    slug: 'siddique-heights',
    status: 'Current',
    location: 'Sadiq Chowk, Iqbal Town',
    description: 'Premium commercial inventory plaza fully constructed and ready for high-end retail.',
    mainImage: 'https://images.unsplash.com/photo-1577908476831-50e501d51aeb?q=80&w=2070&auto=format&fit=crop',
    progressUpdates: [],
  },
  {
    title: 'EXXSNS Heights',
    slug: 'exxsns-heights',
    status: 'Upcoming',
    location: 'Lahore',
    description: 'Premium vertical development currently under active development. Luxury apartments and penthouses.',
    mainImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1935&auto=format&fit=crop',
    progressUpdates: [],
  },
  {
    title: 'Siddique City',
    slug: 'siddique-city',
    status: 'Upcoming',
    location: 'Abdul Sattar Edhi Road',
    description: 'Spanning 350 Kanals. A master-planned gated community with state-of-the-art amenities.',
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    progressUpdates: [],
  },
  {
    title: 'Siddique City Phase-2',
    slug: 'siddique-city-phase-2',
    status: 'Upcoming',
    location: 'Sundar Area',
    description: 'Massive 4000 Kanals covered area extension offering premium residential opportunities.',
    mainImage: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2014&auto=format&fit=crop',
    progressUpdates: [],
  },
  {
    title: 'Pearl Garden',
    slug: 'pearl-garden',
    status: 'Completed',
    location: 'Lahore',
    description: 'Fully delivered luxury residential community with 100% occupancy.',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    progressUpdates: [],
  },
];

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Property.deleteMany({});
    await Project.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert UK Properties
    console.log('📝 Inserting UK Properties...');
    const insertedProperties = await Property.insertMany(ukProperties);
    console.log(`✅ Inserted ${insertedProperties.length} UK Properties`);

    // Insert Pakistan Projects
    console.log('📝 Inserting Pakistan Projects...');
    const insertedProjects = await Project.insertMany(pakistanProjects);
    console.log(`✅ Inserted ${insertedProjects.length} Pakistan Projects`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`   - ${insertedProperties.length} Properties created`);
    console.log(`   - ${insertedProjects.length} Projects created`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('👋 Database connection closed');
  }
}

seedDatabase();
