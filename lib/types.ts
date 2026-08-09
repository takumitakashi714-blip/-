export type ServiceCategory = "treatment" | "class";

export type ServiceVariant = {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  description?: string;
};

export type Service = {
  slug: string;
  category: ServiceCategory;
  name: string;
  kana: string;
  icon: string;
  tagline: string;
  description: string;
  points: string[];
  variants: ServiceVariant[];
  classTimes?: string[];
  capacity?: number;
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

export type BookingStatus = "confirmed" | "cancelled";

export type Booking = {
  id: number;
  serviceSlug: string;
  serviceName: string;
  variantId: string;
  variantName: string;
  durationMinutes: number;
  price: number;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  email: string;
  notes: string | null;
  status: BookingStatus;
  createdAt: string;
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
