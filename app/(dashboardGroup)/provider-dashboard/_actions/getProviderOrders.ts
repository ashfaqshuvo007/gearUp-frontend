"use server";
import { verifyToken } from "@/lib/utils";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { OrderStatus } from "@/lib/types"; // adjust path to wherever OrderStatus type lives

export const getProviderOrders = async (status?: OrderStatus) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const decodedAccessToken = verifyToken(
    accessToken,
    process.env.JWT_SECRET as string,
  );

  const userRole = (decodedAccessToken.data as JwtPayload).role;
  const userId = (decodedAccessToken.data as JwtPayload).id;

  if (userRole !== "PROVIDER") {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const statusUrl = status ? `?status=${status}` : "";

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/providers/orders${statusUrl}`,
    {
      method: "GET",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: {
        revalidate: 60 * 10,
        tags: ["provider-rentals-" + userId],
      },
    },
  );

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message:
        result.message || "There is a problem. Cannot fetch your orders.",
    };
  }

  return result;
};
