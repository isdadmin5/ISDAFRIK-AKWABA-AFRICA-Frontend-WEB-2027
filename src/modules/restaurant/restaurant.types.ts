export interface MenuItem {
  id: string;
  name: string;
  category: "Entrées" | "Plats Principaux" | "Desserts" | "Boissons & Cocktails" | "Entrée" | "Plats" | "Boissons";
  price: number; // in FCFA
  description: string;
  image?: string;
  tags?: string[];
  prepTime?: string;
  calories?: string;
  badge?: string;
  isVegetarian?: boolean;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface ChefInfo {
  name: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface Restaurant {
  id: string;
  name: string;
  category: string;
  ambiance?: string;
  description: string;
  fullDescription?: string;
  location: string;
  address?: string;
  city: string;
  country: string;
  price: string;
  averagePriceNum?: number;
  rating: number;
  reviewsCount?: number;
  open: boolean;
  openingHours?: string;
  phone?: string;
  popularity?: string;
  tags: string[];
  amenities?: string[];
  image: string;
  gallery?: string[];
  menu?: MenuItem[];
  reviews?: Review[];
  featured?: boolean;
  chef?: ChefInfo;
}


export interface Reservation {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  restaurantLocation: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
  status: "confirmée" | "en attente" | "annulée";
  createdAt: string;
  confirmationCode: string;
}
