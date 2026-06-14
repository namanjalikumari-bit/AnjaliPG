// Static copy used across public pages so they're never empty even before
// the API loads (the same data also lives in the DB via the seed script).
import {
  FiWifi, FiDroplet, FiBatteryCharging, FiClock, FiPhone, FiShield, FiTruck,
  FiHeart, FiCamera, FiUsers,
} from 'react-icons/fi';
import {
  TbToolsKitchen2, TbVacuumCleaner, TbToolsKitchen3, TbSnowflake, TbBed, TbDeviceGamepad2,
  TbRecycle, TbBarbell, TbWashMachine, TbStethoscope,
} from 'react-icons/tb';

export const roomFacilities = [
  { name: 'Kitchen', Icon: TbToolsKitchen2 },
  { name: 'Live Water', Icon: FiDroplet },
  { name: 'WiFi', Icon: FiWifi },
  { name: 'Power Backup', Icon: FiBatteryCharging },
  { name: 'Daily Housekeeping', Icon: TbVacuumCleaner },
  { name: 'Four Time Meals', Icon: TbToolsKitchen3 },
  { name: 'AC & Geyser', Icon: TbSnowflake },
  { name: 'Triple Fully Furnished Bedroom', Icon: TbBed },
];

export const commonArea = [
  { name: 'Community Events', Icon: FiUsers },
  { name: 'Gaming Zone', Icon: TbDeviceGamepad2 },
  { name: 'Recycling Zone', Icon: TbRecycle },
  { name: 'Free Gym Subscription', Icon: TbBarbell },
];

export const topServices = [
  { name: '24x7 Service', Icon: FiClock },
  { name: 'Cleanliness & Helpline', Icon: FiPhone },
  { name: 'Sick Meal', Icon: FiHeart },
  { name: '24x7 Security Guard', Icon: FiShield },
  { name: 'Lunch Delivery To College (Weekdays)', Icon: FiTruck },
  { name: 'Unlimited Laundry', Icon: TbWashMachine },
  { name: 'CCTV Surveillance', Icon: FiCamera },
  { name: 'Doctor On Call', Icon: TbStethoscope },
];

export const whyChoose = [
  { title: 'Safe & Secure', desc: '24x7 security with CCTV surveillance and guard.', Icon: FiShield },
  { title: 'Healthy Food', desc: 'Nutritious four-time meals with variety.', Icon: FiHeart },
  { title: 'Great Location', desc: 'Close to colleges, transport and markets.', Icon: FiUsers },
  { title: 'Comfort & Care', desc: 'We care for your comfort like our family.', Icon: FiPhone },
];

export const fallbackMenu = [
  { day: 'Monday', breakfast: 'Poha, Tea', lunch: 'Dal, Rice, Roti', snacks: 'Sandwich, Tea', dinner: 'Paneer, Roti, Salad' },
  { day: 'Tuesday', breakfast: 'Upma, Tea', lunch: 'Rajma, Rice, Roti', snacks: 'Maggi, Tea', dinner: 'Mix Veg, Roti, Salad' },
  { day: 'Wednesday', breakfast: 'Idli, Sambar', lunch: 'Chole, Rice, Roti', snacks: 'Poha, Tea', dinner: 'Dal, Rice, Roti' },
  { day: 'Thursday', breakfast: 'Paratha, Curd', lunch: 'Dal, Rice, Sabzi, Roti', snacks: 'Sandwich, Tea', dinner: 'Paneer, Roti, Salad' },
  { day: 'Friday', breakfast: 'Bread Omelette, Tea', lunch: 'Rajma, Rice, Roti', snacks: 'Pakora, Tea', dinner: 'Mix Veg, Roti, Salad' },
  { day: 'Saturday', breakfast: 'Aloo Paratha, Tea', lunch: 'Kadhi, Rice, Roti', snacks: 'Pasta, Tea', dinner: 'Paneer, Roti, Salad' },
  { day: 'Sunday', breakfast: 'Chole Bhature', lunch: 'Special Thali', snacks: 'Samosa, Tea', dinner: 'Veg Biryani, Raita' },
];

export const fallbackRooms = [
  { _id: 'r3', type: 'triple', roomNumber: '101', price: 6000, capacity: 3, amenities: ['3 Beds', 'Attached Washroom', 'Study Table', 'Wardrobe'] },
  { _id: 'r2', type: 'double', roomNumber: '103', price: 7500, capacity: 2, amenities: ['2 Beds', 'Attached Washroom', 'Study Table', 'Wardrobe'] },
  { _id: 'r1', type: 'single', roomNumber: '104', price: 9000, capacity: 1, amenities: ['1 Bed', 'Attached Washroom', 'Study Table', 'Wardrobe'] },
];
