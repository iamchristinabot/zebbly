import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  TextField,
  InputAdornment,
  Divider,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LaptopIcon from '@mui/icons-material/Laptop';
import ChairIcon from '@mui/icons-material/Chair';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import SpaIcon from '@mui/icons-material/Spa';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    icon: <LaptopIcon />,
    subcategories: ['Smartphones', 'Laptops', 'Audio', 'Cameras', 'Wearables']
  },
  {
    id: 2,
    name: 'Home & Furniture',
    icon: <ChairIcon />,
    subcategories: ['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office', 'Outdoor']
  },
  {
    id: 3,
    name: 'Fashion',
    icon: <CheckroomIcon />,
    subcategories: ['Women', 'Men', 'Kids', 'Shoes', 'Accessories', 'Jewelry']
  },
  {
    id: 4,
    name: 'Sports & Fitness',
    icon: <FitnessCenterIcon />,
    subcategories: ['Exercise Equipment', 'Activewear', 'Outdoor Recreation', 'Team Sports']
  },
  {
    id: 5,
    name: 'Food & Drink',
    icon: <RestaurantIcon />,
    subcategories: ['Snacks', 'Beverages', 'Cooking', 'Specialty Foods']
  },
  {
    id: 6,
    name: 'Baby & Kids',
    icon: <ChildCareIcon />,
    subcategories: ['Baby Gear', 'Toys', 'Children\'s Clothing', 'School Supplies']
  },
  {
    id: 7,
    name: 'Beauty & Personal Care',
    icon: <SpaIcon />,
    subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrance', 'Personal Care']
  },
  {
    id: 8,
    name: 'Accessories',
    icon: <LocalMallIcon />,
    subcategories: ['Bags', 'Watches', 'Sunglasses', 'Hats', 'Scarves']
  }
];

const featuredProducts = [
  {
    id: 1,
    type: 'product',
    title: 'Wireless Noise Cancelling Headphones',
    image: 'https://via.placeholder.com/300x200',
    price: 249.99,
    store: 'Amazon',
    category: 'Electronics',
    likes: 42,
    comments: 7
  },
  {
    id: 2,
    type: 'product',
    title: 'Modern Accent Chair',
    image: 'https://via.placeholder.com/300x200',
    price: 199.99,
    store: 'Wayfair',
    category: 'Home & Furniture',
    likes: 28,
    comments: 3
  },
  {
    id: 3,
    type: 'product',
    title: 'Leather Crossbody Bag',
    image: 'https://via.placeholder.com/300x200',
    price: 79.99,
    store: 'Nordstrom',
    category: 'Accessories',
    likes: 34,
    comments: 5
  },
  {
    id: 4,
    type: 'product',
    title: 'Smart Fitness Watch',
    image: 'https://via.placeholder.com/300x200',
    price: 149.99,
    store: 'Best Buy',
    category: 'Sports & Fitness',
    likes: 22,
    comments: 7
  }
];

const CategoriesPage = ({ isAuthenticated = true }) => {
  const theme = useTheme();
  const [open, setOpen] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  
  const handleClick = (categoryId) => {
    setOpen(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };
  
  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };
  
  // Filter categories based on search
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(sub => 
      sub.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Browse Categories
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2
              }}
            >
              <TextField
                fullWidth
                placeholder="Search categories"
                value={searchQuery}
                onChange={handleSearchChange}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              
              <List component="nav" aria-label="categories">
                {filteredCategories.map((category) => (
                  <React.Fragment key={category.id}>
                    <ListItem 
                      button 
                      onClick={() => {
                        handleClick(category.id);
                        handleCategorySelect(category);
                      }}
                      selected={selectedCategory?.id === category.id && !selectedSubcategory}
                    >
                      <ListItemIcon>
                        {category.icon}
                      </ListItemIcon>
                      <ListItemText primary={category.name} />
                      {open[category.id] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open[category.id]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {category.subcategories.map((subcategory, index) => (
                          <ListItem 
                            button 
                            key={index} 
                            sx={{ pl: 4 }}
                            onClick={() => handleSubcategorySelect(subcategory)}
                            selected={selectedSubcategory === subcategory}
                          >
                            <ListItemText primary={subcategory} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={9}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: `1px solid ${theme.palette.brand.lightGray}`,
                borderRadius: 2,
                mb: 4
              }}
            >
              <Typography variant="h5" gutterBottom>
                {selectedSubcategory ? 
                  `${selectedCategory.name} > ${selectedSubcategory}` : 
                  selectedCategory ? 
                    selectedCategory.name : 
                    'Featured Categories'
                }
              </Typography>
              <Divider sx={{ mb: 3 }} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CategoriesPage; 