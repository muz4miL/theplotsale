import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Property title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Property slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    region: {
      type: String,
      required: [true, 'Region is required'],
      enum: {
        values: ['UK', 'Pakistan'],
        message: '{VALUE} is not a valid region. Must be UK or Pakistan',
      },
    },
    currency: {
      type: String,
      default: 'GBP',
      enum: {
        values: ['GBP', 'PKR'],
        message: '{VALUE} is not a valid currency. Must be GBP or PKR',
      },
    },
    price: {
      type: Number,
      min: [0, 'Price must be a positive number'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    beds: {
      type: Number,
      min: [0, 'Bedrooms must be a positive number'],
    },
    baths: {
      type: Number,
      min: [0, 'Bathrooms must be a positive number'],
    },
    receptions: {
      type: Number,
      min: [0, 'Receptions must be a positive number'],
    },
    areaSqFt: {
      type: Number,
      min: [0, 'Area must be a positive number'],
    },
    description: {
      type: String,
      default: '',
    },
    mainImage: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    },
    primaryLogo: {
      type: String,
      default: '',
      trim: true,
    },
    floatingLogos: {
      type: [String],
      default: [],
    },
    galleryImages: {
      type: [String],
      default: [],
    },
    galleryMedia: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Property || mongoose.model('Property', propertySchema);
