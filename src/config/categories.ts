import {
  Laptop as TechIcon,
  FitnessCenter as FitnessIcon,
  Home as HomeIcon,
  Checkroom as FashionIcon,
  LocalMall as AccessoriesIcon,
  Restaurant as FoodIcon,
  Spa as BeautyIcon,
  Toys as KidsIcon
} from '@mui/icons-material';

export interface PlaylistCategory {
  id: string;
  name: string;
  icon: any; // MUI icon component
  color: string;
  description: string;
}

export const playlistCategories: PlaylistCategory[] = [
  {
    id: 'tech',
    name: 'Tech & Gadgets',
    icon: TechIcon,
    color: '#6C5CE7', // Primary purple
    description: 'Electronics, gadgets, and smart devices'
  },
  {
    id: 'fitness',
    name: 'Fitness & Sports',
    icon: FitnessIcon,
    color: '#5D4ED6', // Deeper purple
    description: 'Workout gear, equipment, and activewear'
  },
  {
    id: 'home',
    name: 'Home & Living',
    icon: HomeIcon,
    color: '#8B7CF4', // Lighter purple
    description: 'Furniture, decor, and home essentials'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: FashionIcon,
    color: '#4B3DBF', // Dark purple
    description: 'Clothing, shoes, and style essentials'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: AccessoriesIcon,
    color: '#A594FF', // Soft purple
    description: 'Bags, jewelry, and personal accessories'
  },
  {
    id: 'food',
    name: 'Food & Drink',
    icon: FoodIcon,
    color: '#453894', // Deep indigo-purple
    description: 'Kitchen gadgets and gourmet items'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    icon: BeautyIcon,
    color: '#7E6EF2', // Medium purple
    description: 'Skincare, makeup, and beauty tools'
  },
  {
    id: 'kids',
    name: 'Kids & Baby',
    icon: KidsIcon,
    color: '#9985FF', // Light vibrant purple
    description: 'Toys, clothing, and baby essentials'
  }
]; 