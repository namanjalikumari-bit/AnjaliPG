// ---------------------------------------------------------------------------
// Anjali PG — Official image assets (the 20 AI-generated PG images).
//
// HOW TO USE:
// Drop your 20 generated images into  client/public/images/  using EXACTLY
// these filenames. Every page reads paths from this file, so renaming here
// (or the files) updates the whole site. All paths are served from /public,
// so they resolve at runtime as e.g.  /images/pg-exterior.jpg
// ---------------------------------------------------------------------------

export const IMAGES = {
  heroBanner: { src: '/images/pg-hero-banner.png', alt: 'Anjali PG entrance gate and building at dusk — Your Second Home' },
  exterior: { src: '/images/pg-exterior.jpg', alt: 'Anjali PG building exterior at dusk' },
  reception: { src: '/images/reception.jpg', alt: 'Anjali PG reception lobby' },
  roomSingle: { src: '/images/room-single.jpg', alt: 'Single sharing room' },
  roomDouble: { src: '/images/room-double.jpg', alt: 'Double sharing room' },
  roomTriple: { src: '/images/room-triple.jpg', alt: 'Triple sharing room' },
  dining: { src: '/images/dining-area.png', alt: 'Dining area' },
  mess: { src: '/images/mess-food.png', alt: 'Mess food thali' },
  gym: { src: '/images/gym.jpg', alt: 'In-house gym' },
  gaming: { src: '/images/gaming-area.jpg', alt: 'Gaming zone' },
  community: { src: '/images/community-events.png', alt: 'Community events' },
  study: { src: '/images/study-area.jpg', alt: 'Study area / library' },
  laundry: { src: '/images/laundry-area.jpg', alt: 'Laundry area' },
  common: { src: '/images/common-area.jpg', alt: 'Common lounge area' },
  security: { src: '/images/security-area.jpg', alt: 'CCTV security control' },
  lifestyle: { src: '/images/hostel-lifestyle.png', alt: 'Hostel lifestyle — residents relaxing' },
  studying: { src: '/images/students-studying.jpg', alt: 'Students studying' },
  wifi: { src: '/images/wifi-workspace.jpg', alt: 'WiFi-enabled workspace' },
  kitchen: { src: '/images/kitchen.jpg', alt: 'Modern kitchen' },
  housekeeping: { src: '/images/housekeeping.jpg', alt: 'Daily housekeeping' },
  amenities: { src: '/images/amenities-showcase.jpg', alt: 'Amenities showcase' },

  // Home page — facilities preview cards
  homeFacilityGym: { src: '/images/home-facility-gym.png', alt: 'In-house gym' },
  homeFacilityWifi: { src: '/images/home-facility-wifi.png', alt: 'WiFi-enabled workspace' },
  homeFacilitySecurity: { src: '/images/home-facility-security.png', alt: '24x7 CCTV security' },
  homeFacilityLaundry: { src: '/images/home-facility-laundry.png', alt: 'Laundry area' },

  // About page — Our Environment cards
  aboutEnvGreen: { src: '/images/about-env-green.png', alt: 'Green & sustainable PG surroundings' },
  aboutEnvHygienic: { src: '/images/about-env-hygienic.png', alt: 'Clean & hygienic housekeeping' },
  aboutEnvCommunity: { src: '/images/about-env-community.png', alt: 'Positive resident community' },
  aboutEnvStudent: { src: '/images/about-env-student.png', alt: 'Student-friendly study space' },

  // Meals page — Four Times Meals cards
  mealBreakfast: { src: '/images/meal-breakfast.png', alt: 'Breakfast spread' },
  mealLunch: { src: '/images/meal-lunch.png', alt: 'Lunch thali' },
  mealEveningSnacks: { src: '/images/meal-dining.png', alt: 'Dining area for evening snacks' },
  mealDinner: { src: '/images/meal-dinner.png', alt: 'Dinner thali' },

  // Facilities page — Facilities in Pictures showcase
  facGym: { src: '/images/fac-gym.png', alt: 'In-house gym' },
  facCommon: { src: '/images/fac-common.png', alt: 'Common lounge with residents' },
  facLaundry: { src: '/images/fac-laundry.png', alt: 'Laundry area' },
  facSecurity: { src: '/images/fac-security.png', alt: 'CCTV security' },
  facKitchen: { src: '/images/fac-kitchen.png', alt: 'Meal thali from the kitchen' },
  facHousekeeping: { src: '/images/fac-housekeeping.png', alt: 'Furnished room after housekeeping' },
  facWifi: { src: '/images/fac-wifi.png', alt: 'High-speed WiFi router' },
  facAmenities: { src: '/images/fac-amenities.png', alt: 'Power backup amenity' },

  // Rooms page — room type photos
  singleRoom1: { src: '/images/rooms/single-room-1.png', alt: 'Single room with study desk' },
  singleRoom2: { src: '/images/rooms/single-room-2.png', alt: 'Single room with green bedspread' },
  doubleRoom1: { src: '/images/rooms/double-room-1.png', alt: 'Double sharing room with two beds' },
  doubleRoom2: { src: '/images/rooms/double-room-2.png', alt: 'Double sharing room with balcony' },
  tripleRoom1: { src: '/images/rooms/triple-room-1.png', alt: 'Triple sharing room with three beds' },
  tripleRoom2: { src: '/images/rooms/triple-room-2.png', alt: 'Triple sharing room with study desks' },

  // Home page — Our Rooms preview cards
  homeRoomSingle: { src: '/images/home-room-single.png', alt: 'Single room' },
  homeRoomDouble: { src: '/images/home-room-double.png', alt: 'Double sharing room' },
  homeRoomTriple: { src: '/images/home-room-triple.png', alt: 'Triple sharing room' },

  // Reviews page — lifestyle visuals
  reviewLifestyle1: { src: '/images/reviews/review-lifestyle-1.png', alt: 'Residents relaxing in common area' },
  reviewLifestyle2: { src: '/images/reviews/review-lifestyle-2.png', alt: 'Residents studying together' },
};

// Map a room type coming from the API to the right hero image.
export const roomImageByType = (type) =>
  ({ single: IMAGES.roomSingle, double: IMAGES.roomDouble, triple: IMAGES.roomTriple }[type] ||
    IMAGES.roomTriple);

// Gallery grid — used on the Gallery page (with category filters).
export const galleryImages = [
  { ...IMAGES.exterior, title: 'PG Building Exterior', category: 'rooms' },
  { ...IMAGES.roomSingle, title: 'Single Room', category: 'rooms' },
  { ...IMAGES.roomDouble, title: 'Double Room', category: 'rooms' },
  { ...IMAGES.roomTriple, title: 'Triple Room', category: 'rooms' },
  { ...IMAGES.dining, title: 'Dining Area', category: 'food' },
  { ...IMAGES.mess, title: 'Mess Food', category: 'food' },
  { ...IMAGES.kitchen, title: 'Kitchen', category: 'food' },
  { ...IMAGES.gym, title: 'Gym', category: 'facilities' },
  { ...IMAGES.gaming, title: 'Gaming Zone', category: 'facilities' },
  { ...IMAGES.laundry, title: 'Laundry', category: 'facilities' },
  { ...IMAGES.security, title: 'Security', category: 'facilities' },
  { ...IMAGES.wifi, title: 'WiFi Workspace', category: 'facilities' },
  { ...IMAGES.study, title: 'Study Area', category: 'facilities' },
  { ...IMAGES.amenities, title: 'Amenities Showcase', category: 'facilities' },
  { ...IMAGES.community, title: 'Community Events', category: 'lifestyle' },
  { ...IMAGES.lifestyle, title: 'Hostel Life', category: 'lifestyle' },
  { ...IMAGES.studying, title: 'Students Studying', category: 'lifestyle' },
  { ...IMAGES.housekeeping, title: 'Housekeeping', category: 'lifestyle' },
  { ...IMAGES.reception, title: 'Reception', category: 'common' },
  { ...IMAGES.common, title: 'Common Area', category: 'common' },
];

export const galleryCategories = ['all', 'rooms', 'food', 'facilities', 'lifestyle', 'common'];

export const categoryLabels = {
  all: 'All',
  rooms: 'Rooms',
  food: 'Food',
  facilities: 'Facilities',
  lifestyle: 'Lifestyle',
  common: 'Common Area',
};
