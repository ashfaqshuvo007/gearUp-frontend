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
