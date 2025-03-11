import { makeAutoObservable } from 'mobx';

class AIRecommendationStore {
  // User's interests and preferences
  userPreferences = {
    interests: ['Tech', 'Home Decor', 'Fitness'],
    priceRanges: {
      'Tech': { min: 50, max: 500 },
      'Home Decor': { min: 20, max: 200 },
      'Fitness': { min: 30, max: 150 }
    },
    styles: ['Modern', 'Minimalist'],
    colors: ['Black', 'White', 'Gray', 'Blue'],
    brands: ['Apple', 'Samsung', 'Nike', 'Adidas', 'IKEA']
  };
  
  // AI-generated insights about the user
  userInsights = {
    personalityType: 'Early Adopter',
    shoppingStyle: 'Research-oriented',
    valueDrivers: ['Quality', 'Innovation', 'Aesthetics'],
    recommendedCategories: ['Smart Home', 'Wearable Tech', 'Ergonomic Furniture']
  };
  
  // AI-generated product recommendations
  personalizedRecommendations = [];
  
  // AI-generated content suggestions for product sharing
  contentSuggestions = {
    titleTemplates: [
      "Just discovered this amazing [product_type]!",
      "This [product_type] changed my [activity] routine",
      "My honest review of [brand]'s new [product_type]",
      "The perfect [product_type] for [season/activity]"
    ],
    descriptionTemplates: [
      "I've been using this for [time_period] and here's what I think...",
      "If you're looking for a [product_type] that [key_benefit], this is it!",
      "What I love most about this [product_type] is [feature]",
      "This [product_type] is perfect for [use_case]"
    ],
    hashtagSuggestions: [
      "#MustHave", "#ProductReview", "#DailyEssentials",
      "#TechLovers", "#HomeDecor", "#FitnessGear",
      "#BudgetFind", "#PremiumPick", "#NewRelease"
    ]
  };
  
  // AI-generated trending topics
  trendingTopics = [
    { topic: 'Sustainable Products', relevance: 0.92, growth: '+28%' },
    { topic: 'Smart Home Integration', relevance: 0.87, growth: '+35%' },
    { topic: 'Minimalist Design', relevance: 0.79, growth: '+15%' },
    { topic: 'Home Office Setup', relevance: 0.85, growth: '+42%' },
    { topic: 'Fitness Tech', relevance: 0.81, growth: '+23%' }
  ];
  
  // AI-generated product insights
  productInsights = {};
  
  constructor() {
    makeAutoObservable(this);
    this.generatePersonalizedRecommendations();
  }
  
  generatePersonalizedRecommendations() {
    // In a real app, this would call an AI service
    this.personalizedRecommendations = [
      {
        id: 'rec1',
        title: 'Smart Home Hub',
        description: 'Based on your interest in tech and smart home devices',
        price: 129.99,
        matchScore: 0.94,
        image: 'https://picsum.photos/seed/smarthub/300/200',
        reasons: [
          'Matches your preference for modern design',
          'Compatible with your existing devices',
          'Within your preferred price range for tech'
        ]
      },
      {
        id: 'rec2',
        title: 'Minimalist Desk Lamp',
        description: 'Aligns with your minimalist style preference',
        price: 79.99,
        matchScore: 0.89,
        image: 'https://picsum.photos/seed/desklamp/300/200',
        reasons: [
          'Matches your minimalist style preference',
          'Complements your home office setup',
          'Smart features align with your tech interests'
        ]
      },
      {
        id: 'rec3',
        title: 'Fitness Tracker Watch',
        description: 'Perfect for your fitness activities',
        price: 149.99,
        matchScore: 0.92,
        image: 'https://picsum.photos/seed/fitwatch/300/200',
        reasons: [
          'Aligns with your fitness interests',
          'Has tech features you typically prefer',
          'Similar to products you\'ve viewed recently'
        ]
      }
    ];
  }
  
  getContentSuggestionsForProduct(product) {
    // In a real app, this would analyze the product and generate tailored suggestions
    const category = this.detectProductCategory(product);
    
    return {
      titleSuggestions: [
        `Just added this ${category} find to my collection!`,
        `This ${category} essential is a game-changer`,
        `My honest thoughts on this ${category} product`,
        `The perfect ${category} item for everyday use`
      ],
      descriptionSuggestions: [
        `I've been using this ${product.title.toLowerCase()} for a few weeks now, and I'm impressed with its quality and functionality.`,
        `If you're in the market for a new ${category.toLowerCase()} product, this one offers great value for the price.`,
        `What stands out about this ${product.title.toLowerCase()} is its design and ease of use.`,
        `I recommend this for anyone looking to upgrade their ${category.toLowerCase()} setup.`
      ],
      tagSuggestions: [
        `#${category}`, '#ProductReview', '#MustHave',
        `#${category}Essentials`, '#NewFind', '#HonestReview'
      ]
    };
  }
  
  detectProductCategory(product) {
    // Simplified category detection
    const title = product.title.toLowerCase();
    
    if (title.includes('phone') || title.includes('laptop') || title.includes('tech') || title.includes('smart')) {
      return 'Tech';
    } else if (title.includes('chair') || title.includes('desk') || title.includes('lamp') || title.includes('decor')) {
      return 'Home Decor';
    } else if (title.includes('fitness') || title.includes('workout') || title.includes('exercise')) {
      return 'Fitness';
    } else {
      return 'Lifestyle';
    }
  }
  
  getProductInsights(productId) {
    // In a real app, this would analyze the product and provide insights
    if (this.productInsights[productId]) {
      return this.productInsights[productId];
    }
    
    // Generate mock insights
    const insights = {
      priceAnalysis: {
        marketAverage: Math.floor(Math.random() * 50) + 100,
        dealRating: Math.random() > 0.5 ? 'Good Deal' : 'Average Price',
        priceHistory: [
          { date: '2023-01', price: 129.99 },
          { date: '2023-02', price: 119.99 },
          { date: '2023-03', price: 124.99 },
          { date: '2023-04', price: 109.99 }
        ]
      },
      qualityPrediction: {
        overallScore: Math.floor(Math.random() * 20) + 80,
        durability: Math.floor(Math.random() * 20) + 80,
        reliability: Math.floor(Math.random() * 20) + 80,
        valueForMoney: Math.floor(Math.random() * 20) + 80
      },
      audienceMatch: {
        matchScore: Math.random() * 0.3 + 0.7,
        targetDemographics: ['Tech Enthusiasts', 'Professionals', 'Home Office Users'],
        popularWith: ['Your network', 'Similar users']
      },
      alternativeSuggestions: [
        { id: 'alt1', title: 'Similar Product A', price: 119.99, differentiator: 'More features, higher price' },
        { id: 'alt2', title: 'Similar Product B', price: 99.99, differentiator: 'More affordable, fewer features' },
        { id: 'alt3', title: 'Similar Product C', price: 149.99, differentiator: 'Premium version, better quality' }
      ]
    };
    
    this.productInsights[productId] = insights;
    return insights;
  }
  
  updateUserPreferences(newPreferences) {
    this.userPreferences = {
      ...this.userPreferences,
      ...newPreferences
    };
    
    // Regenerate recommendations based on new preferences
    this.generatePersonalizedRecommendations();
  }
}

export default AIRecommendationStore; 