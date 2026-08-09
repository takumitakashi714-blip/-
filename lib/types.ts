export type ServiceMenuItem = {
  id: string;
  name: string;
  description?: string;
};

export type Service = {
  slug: string;
  name: string;
  kana: string;
  icon: string;
  tagline: string;
  description: string;
  points: string[];
  menu: ServiceMenuItem[];
  priceLabel: string;
};

export type Testimonial = {
  name: string;
  text: string;
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  icon: string;
  price: number;
  shortDescription: string;
  description: string;
  volume?: string;
  stock: number;
};

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: number;
  stripeSessionId: string | null;
  status: "pending" | "paid" | "cancelled";
  customerEmail: string | null;
  totalAmount: number;
  items: CartItem[];
  createdAt: string;
};
