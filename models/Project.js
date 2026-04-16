import mongoose from 'mongoose';

const progressUpdateSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: [true, 'Progress update date is required'],
    },
    title: {
      type: String,
      required: [true, 'Progress update title is required'],
      trim: true,
    },
    mediaUrls: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      required: [true, 'Project status is required'],
      enum: {
        values: ['Completed', 'Current', 'Upcoming'],
        message: '{VALUE} is not a valid status. Must be Completed, Current, or Upcoming',
      },
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    totalArea: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    paymentPlan: {
      type: String,
      trim: true,
    },
    mainImage: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
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
    galleryMedia: {
      type: [String],
      default: [],
    },
    progressUpdates: {
      type: [progressUpdateSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
