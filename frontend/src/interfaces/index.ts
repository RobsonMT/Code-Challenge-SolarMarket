export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  createdAt: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  comment: string;
  rating: number;
}
