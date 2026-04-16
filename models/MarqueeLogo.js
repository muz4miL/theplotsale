import mongoose from 'mongoose';

const marqueeLogoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      trim: true,
    },
    detail: {
      type: String,
      default: '',
      trim: true,
    },
    logoUrl: {
      type: String,
      required: [true, 'Logo URL is required'],
      trim: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.MarqueeLogo || mongoose.model('MarqueeLogo', marqueeLogoSchema);
