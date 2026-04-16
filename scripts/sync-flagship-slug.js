/**
 * One-time (or repeatable) sync: align flagship MongoDB row with
 * NEXT_PUBLIC_FEATURED_PROJECT_SLUG / canonical slug exxsn-heights-etihad-town.
 *
 * Usage: npm run sync-flagship
 * Requires MONGODB_URI in .env.local
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env.local') });

const TARGET_SLUG = 'exxsn-heights-etihad-town';
const CANONICAL_TITLE = 'Exxsn Heights, Etihad Town';
const CANONICAL_LOCATION = 'Main Raiwind Road, Etihad Town, Lahore';

const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is missing. Add it to .env.local');
    process.exit(1);
  }

  const Project = (await import('../models/Project.js')).default;

  console.log('🔄 Connecting to MongoDB…');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected\n');

  const already = await Project.findOne({ slug: TARGET_SLUG });
  if (already) {
    console.log(`✅ Project with slug "${TARGET_SLUG}" already exists — nothing to migrate.`);
    console.log(`   Title: ${already.title}`);
    await mongoose.disconnect();
    process.exit(0);
  }

  const legacy =
    (await Project.findOne({ slug: 'exxsns-heights' })) ||
    (await Project.findOne({ slug: 'exxsn-heights' })) ||
    (await Project.findOne({ slug: 'exxens-heights' })) ||
    (await Project.findOne({
      $and: [
        { title: { $regex: /exx(sn|sns|ens|xsns)/i } },
        { title: { $regex: /height/i } },
      ],
    }));

  if (!legacy) {
    console.log('ℹ️ No legacy flagship document found (exxsns-heights, exxsn-heights, etc.).');
    console.log('   Create "Exxsn Heights, Etihad Town" in /admin/pk-projects with slug:');
    console.log(`   ${TARGET_SLUG}`);
    await mongoose.disconnect();
    process.exit(0);
  }

  const other = await Project.findOne({ slug: TARGET_SLUG, _id: { $ne: legacy._id } });
  if (other) {
    console.error(`❌ Another document already uses slug "${TARGET_SLUG}". Resolve manually in MongoDB.`);
    await mongoose.disconnect();
    process.exit(1);
  }

  const prevSlug = legacy.slug;
  legacy.slug = TARGET_SLUG;
  if (!legacy.title || /exx(sns|sns|xsns)/i.test(legacy.title) || legacy.title.length < 8) {
    legacy.title = CANONICAL_TITLE;
  }
  if (!legacy.location || legacy.location === 'Lahore') {
    legacy.location = CANONICAL_LOCATION;
  }
  if (!legacy.totalArea) {
    legacy.totalArea = '10 storeys';
  }

  await legacy.save();

  console.log('✅ Flagship slug synced.');
  console.log(`   _id:   ${legacy._id}`);
  console.log(`   Was:   ${prevSlug}`);
  console.log(`   Now:   ${TARGET_SLUG}`);
  console.log(`   Title: ${legacy.title}`);
  console.log('\n👉 Restart dev server: npm run dev');

  await mongoose.disconnect();
  console.log('\n👋 Done');
}

main().catch((err) => {
  console.error('❌', err.message);
  if (err.code === 11000) {
    console.error('   Duplicate slug — another project may already use this slug.');
  }
  process.exit(1);
});
