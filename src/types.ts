export interface Property {
  id: string;
  title: string;
  type: 'Residential' | 'Commercial' | 'Industrial' | 'Investment' | 'Luxury' | 'Rental';
  price: string;
  priceNumeric: number;
  location: string;
  status: 'Available' | 'Sold' | 'New Launch' | 'Under Construction';
  image: string;
  gallery: string[];
  specs: {
    area: string;
    bedrooms?: string;
    bathrooms?: string;
    furnishing?: string;
  };
  description: string;
  amenities: string[];
  floorPlan?: string;
}

export interface Service {
  id: string;
  title: string;
  image: string;
  description: string;
  benefits: string[];
  process: string[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Completed' | 'Ongoing' | 'Upcoming';
  location: string;
  investmentValue: string;
  status: string;
  timeline: string;
  description: string;
  image: string;
  gallery: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Office' | 'Site Visit' | 'Construction' | 'Completed Projects' | 'Corporate Events';
  type: 'image' | 'video';
  url: string;
}

export interface Blog {
  id: string;
  title: string;
  category: 'Property Tips' | 'Investment Advice' | 'Market Trends' | 'Buying Guide' | 'Selling Guide' | 'Ahmedabad Property News';
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  type: 'review' | 'video';
  videoThumbnail?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'General' | 'Property' | 'Consultation' | 'Site Visit';
  propertyName?: string;
  message: string;
  date: string;
  status: 'Pending' | 'Contacted' | 'Closed';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface AppSettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  facebook: string;
  linkedin: string;
  twitter: string;
}
