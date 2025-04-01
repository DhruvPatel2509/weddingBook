import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    studioName: { type: String, default: null },
    providerId: { type: String, default: null },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, default: null },
    password: { type: String, required: true },
    address: { type: String, default: null },
    role: {
      type: String,
      enum: ["STUDIO_ADMIN", "SUPER_ADMIN", "USER"],
      default: "STUDIO_ADMIN",
    },
    country: { type: String, default: null },
    coverImage: { type: String, default: null },
    about: { type: String, default: null },
    city: { type: String, default: null },
    zipcode: { type: String, default: null },
    logo: { type: String, default: null },
    portfolioImages: { type: [String], default: [] }, // Array of image URLs
    refreshToken: { type: String, default: null },
    otp: { type: String, default: null },
    provider: {
      type: String,
      enum: ["GOOGLE", "FACEBOOK", "LOCAL"],
      default: "LOCAL",
    },
    otpExpiry: { type: Date, default: null },
    refreshTokenExpiry: { type: Date, default: null },
    lastSeen: { type: Date, default: null },
    subscriptionEndDate: { type: Date, default: null },

    // References to other collections (store ObjectIds)
    subscriptions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    ],
    coupons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coupon" }],
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
    albumCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AlbumCategory" },
    ],
    favoriteFiles: [
      { type: mongoose.Schema.Types.ObjectId, ref: "FavoriteFile" },
    ],
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

export const User = mongoose.model("User", userSchema);
