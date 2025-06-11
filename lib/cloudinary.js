// Cloudinary utility functions for Sandip Hembram's Portfolio

// Your Cloudinary configuration
const CLOUDINARY_CLOUD_NAME = 'drh369n9m';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// Your profile image public ID
const PROFILE_IMAGE_PUBLIC_ID = 'pp_r6qtnu';
const PROFILE_IMAGE_VERSION = 'v1749597275';

/**
 * Generate optimized Cloudinary URL with transformations
 */
export function getCloudinaryUrl(publicId = PROFILE_IMAGE_PUBLIC_ID, options = {}) {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    gravity = 'face',
    version = PROFILE_IMAGE_VERSION
  } = options;

  // Build transformation string
  const transformations = [];

  // Add crop and dimensions
  if (width || height) {
    let cropTransform = `c_${crop}`;
    if (width) cropTransform += `,w_${width}`;
    if (height) cropTransform += `,h_${height}`;
    if (gravity && crop === 'fill') cropTransform += `,g_${gravity}`;
    transformations.push(cropTransform);
  }

  // Add quality and format
  transformations.push(`f_${format}`);
  transformations.push(`q_${quality}`);

  // Build final URL
  const transformString = transformations.join(',');
  return `${CLOUDINARY_BASE_URL}/${transformString}/${version}/${publicId}.jpg`;
}

/**
 * Get profile image URLs for different sections
 */
export const PROFILE_IMAGES = {
  // Hero section - small circular image
  hero: getCloudinaryUrl(PROFILE_IMAGE_PUBLIC_ID, {
    width: 160,
    height: 160,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto',
    format: 'auto'
  }),

  // About section - large square image
  about: getCloudinaryUrl(PROFILE_IMAGE_PUBLIC_ID, {
    width: 400,
    height: 400,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto',
    format: 'auto'
  }),

  // Original image
  original: `${CLOUDINARY_BASE_URL}/${PROFILE_IMAGE_VERSION}/${PROFILE_IMAGE_PUBLIC_ID}.jpg`,

  // High quality for CV/PDF
  highQuality: getCloudinaryUrl(PROFILE_IMAGE_PUBLIC_ID, {
    width: 300,
    height: 300,
    crop: 'fill',
    gravity: 'face',
    quality: 'auto:best',
    format: 'jpg'
  })
};


