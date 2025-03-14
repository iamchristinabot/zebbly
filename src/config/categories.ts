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
    color: '#4CAF50',
    description: 'Electronics, gadgets, and smart devices'
  },
  {
    id: 'fitness',
    name: 'Fitness & Sports',
    icon: FitnessIcon,
    color: '#F44336',
    description: 'Workout gear, equipment, and activewear'
  },
  {
    id: 'home',
    name: 'Home & Living',
    icon: HomeIcon,
    color: '#2196F3',
    description: 'Furniture, decor, and home essentials'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: FashionIcon,
    color: '#9C27B0',
    description: 'Clothing, shoes, and style essentials'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: AccessoriesIcon,
    color: '#FF9800',
    description: 'Bags, jewelry, and personal accessories'
  },
  {
    id: 'food',
    name: 'Food & Drink',
    icon: FoodIcon,
    color: '#795548',
    description: 'Kitchen gadgets and gourmet items'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    icon: BeautyIcon,
    color: '#E91E63',
    description: 'Skincare, makeup, and beauty tools'
  },
  {
    id: 'kids',
    name: 'Kids & Baby',
    icon: KidsIcon,
    color: '#00BCD4',
    description: 'Toys, clothing, and baby essentials'
  }
]; 