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

type IUser = {
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
    reviews?: IReview[];
    orders?: IOrder[];
  };
};

export type NavbarProps = {
  user: IUser;
};
