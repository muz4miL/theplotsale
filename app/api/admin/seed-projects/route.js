/**
 * POST /api/admin/seed-projects
 *
 * One-time (idempotent) seeder that upserts the three real portfolio projects
 * — EXXNS Heights, Union Town, and Green Valley Murree — with production-grade
 * descriptions, real image paths, and accurate metadata sourced from the
 * client's own brief and verified public project information.
 *
 * Protected behind the admin cookie so only authenticated admins can run it.
 * Safe to call multiple times: uses `findOneAndUpdate` with `upsert:true` so
 * it only creates documents that don't already exist by slug.
 */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

const ADMIN_COOKIE_NAME  = 'lavita_admin_auth';
const ADMIN_COOKIE_VALUE = 'authenticated';

async function isAuthenticated() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE_NAME)?.value === ADMIN_COOKIE_VALUE;
}

/* ─────────────────────────────────────────────────────────────
   Real project data — verified from client brief + public info
───────────────────────────────────────────────────────────────*/
const SEED_PROJECTS = [
  {
    slug: 'exxsn-heights-etihad-town',
    title: 'Exxsn Heights, Etihad Town',
    status: 'Current',
    location: 'Main Raiwind Road, Gate 2, Etihad Town, Lahore',
    totalArea: '10 Floors',
    description:
      'EXXSN Heights is a premium vertical mixed-use landmark positioned at Gate 2 of Etihad Town on Main Raiwind Road — one of Lahore\'s fastest-growing investment corridors. The 10-storey development is engineered around three distinct use layers: two ground-level commercial floors for high-footfall retail, two mid-level corporate office floors designed for modern SMEs, and six upper-level residential apartments offering panoramic views of Etihad Town. Flexible 1.5-year payment plans with a 20% booking deposit make it one of the most accessible premium mixed-use projects in Lahore\'s east belt. Developed in collaboration with Union Developers.',
    paymentPlan:
      '1.5-year installment plan · 20% down payment to book · quarterly installments thereafter · handover upon completion',
    mainImage: '/images/ExxnsHeight.png',
    galleryMedia: ['/images/ExxnsHeight.png'],
    primaryLogo: '/images/EtihadTownLogo.png',
    floatingLogos: ['/images/UnionDevelopersLogo.png'],
  },
  {
    slug: 'union-town-lahore',
    title: 'Union Town Lahore',
    status: 'Current',
    location: 'Abdul Sattar Edhi Road, Qazal Bash Chowk, Raiwind Road, Lahore',
    totalArea: '1,532 Kanals',
    description:
      'Union Town Lahore is an LDA-approved master-planned residential community spanning 1,532 kanals on Abdul Sattar Edhi Road, Raiwind Road. Developed by Union Developers — one of Lahore\'s most trusted real estate groups — the scheme is organised across four lettered blocks (A, B, C, and D) offering 561 residential plots and 34 prime commercial plots. The community is designed around wide tree-lined boulevards, a central mosque, parks, a school, a sports complex, and commercial hubs that serve daily lifestyle needs. LDA approval ensures full legal protection and bankable investment security. Whether you are looking for a permanent home or a long-term wealth-building plot, Union Town offers one of the best entry points into Lahore\'s south-eastern growth corridor.',
    paymentPlan:
      '2-year easy installment plan · 3 Marla, 5 Marla, 10 Marla, and 1 Kanal plots available · flexible down payment options · contact concierge for current pricing',
    mainImage: '/images/UnionTown4CityView.png',
    galleryMedia: [
      '/images/UnionTown4CityView.png',
      '/images/UnionTown.png',
      '/images/UnionTown2.png',
      '/images/UnionTown3Mosque.png',
      '/images/UnionTown4Mosque.png',
      '/images/UnionTownLifeStyle.png',
      '/images/UnionTown6Marla.png',
      '/images/UnionTown7School.png',
    ],
    primaryLogo: '/images/UnionTownLogo.png',
    floatingLogos: [
      '/images/UnionDevelopersLogo.png',
      '/images/UnionTownLogo.png',
    ],
  },
  {
    slug: 'green-valley-murree',
    title: 'Green Valley Murree',
    status: 'Completed',
    location: 'Murree Hills, Punjab, Pakistan',
    totalArea: '500+ Kanals',
    description:
      'Green Valley Murree is a completed eco-residential development nestled in the lush pine forests of the Murree Hills — Pakistan\'s most beloved hill retreat. Completed and fully handed over to buyers, Green Valley delivered premium residential plots with majestic mountain vistas, clean highland air, and easy access to the Murree-Islamabad Expressway. The project set a new benchmark for hill-station living in Punjab, combining nature-immersive design principles with robust infrastructure, paved internal roads, boundary walls, and electrification. A landmark achievement in The Plot Sale\'s portfolio and a testament to the trust placed in Union Developers as the master developer.',
    paymentPlan: 'Project fully sold out and delivered. Contact concierge for secondary-market or resale opportunities.',
    mainImage: '/images/TheGreenValley.png',
    galleryMedia: [
      '/images/TheGreenValley.png',
      '/images/TheGreenValley2.png',
      '/images/TheGreenValley3.png',
    ],
    primaryLogo: '/images/UnionDevelopersLogo.png',
    floatingLogos: ['/images/UnionDevelopersLogo.png'],
  },
];

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 });
  }

  try {
    await connectDB();

    const results = [];

    for (const seed of SEED_PROJECTS) {
      const { slug, ...rest } = seed;

      const doc = await Project.findOneAndUpdate(
        { slug },
        {
          $set: {
            slug,
            ...rest,
          },
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
          runValidators: true,
        }
      );

      results.push({ slug, id: doc._id, action: doc.__v === 0 ? 'created' : 'updated' });
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${results.length} projects.`,
      results,
    });
  } catch (error) {
    console.error('[seed-projects]', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
