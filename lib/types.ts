import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

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

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export type IOrderItem = {
  id: string;
  name: string;
  description: string;
  brand: string;
  quantity: number;
  price: string;
  categoryName: string;
  providerId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type IPayment = {
  id: string;
  rentalOrderid: string;
  transactionId: string;
  userid: string;
  stripeCustomerId: string;
  amount: string;
  currency: string;
  method: string;
  provider: string;
  status: string;
  paidAt: string;
};

export type ICustomerUser = {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type IRentalOrderData = {
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
  customer: ICustomerUser;
  payment: IPayment;
  orderItems: IOrderItem[];
};

export type IUserRentalOrders = {
  success: string;
  message: string;
  data: IRentalOrderData[];
};

export type IProviderSingleOrder = {
  id: string;
  name: string;
  description?: string;
  status: string;
  total: string;
  rentFrom: string;
  rentTill: string;
  orderItemId: string;
  providerId: string;
  createdAt: string;
  updatedAt: string;
};

export type IProviderRentalOrders = {
  success: string;
  message: string;
  data: IProviderSingleOrder[];
};

export type ISingleRentalOrder = {
  id: string;
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELED" | string;
  total: string;
  rentFrom: string;
  rentTill: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
  };
  payment: {
    transactionId: string;
    amount: string;
    currency: string;
    method: string;
    status: string;
    paidAt: string;
  };
  orderItems: Array<{
    id: string;
    name: string;
    brand: string;
    quantity: number;
    price: string;
    categoryName: string;
  }>;
};

export const OrderStatus = {
  PENDING_PAYMENT: "PENDING_PAYMENT",
  CONFIRMED: "CONFIRMED",
  PICKEDUP: "PICKEDUP",
  RETURNED: "RETURNED",
  CANCELED: "CANCELED",
  FAILED: "FAILED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const ActiveStatus = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
  DRAFT: "DRAFT",
} as const;

export type ActiveStatus = (typeof ActiveStatus)[keyof typeof ActiveStatus];

export type IGearRequest = {
  id?: string;
  name: string;
  description: string;
  brand: string;
  categoryName: string;
  quantity: number;
  price: number;
  status: ActiveStatus;
};
