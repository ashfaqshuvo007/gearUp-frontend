type IReview = {
  id: string;
  customerId: string;
  itemId: string;
  content: string;
  rating: string;
  createdAt: string;
  updatedAt: string;
};
type IOrder = {
  id: string;
  name: string;
  description?: string;
  status: string;
  total: string;
  rentFrom: string;
  rentTill: string;
  customerId: string;
  orderItemId: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
};

export type IUser = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    status: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    orders?: IOrder[];
    reviews?: IReview[];
  };
};

export type ICategory = {
  id: string;
  name: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type IGear = {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    description?: string;
    brand: string;
    quantity: number;
    price: string;
    categoryName: string;
    providerId: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    category: ICategory;
  };
};

export type NavbarProps = {
  user: IUser;
};

export interface GearSpecification {
  label: string;
  value: string;
}

export interface GearProvider {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export type IOrderPayload = {
  rentFrom: string;
  rentTill: string;
  orderItemId: string;
  orderQty: number;
  price: number;
};

export interface GearDetailData {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  quantity: number;
  brand: string;
  pricePerDay: number;
  specifications: GearSpecification[];
  provider: GearProvider;
  /** Dates that cannot be booked (already reserved). */
  unavailableDates?: Date[];
}
