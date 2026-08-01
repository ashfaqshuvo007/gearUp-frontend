"use server";

import { verifyToken } from "@/lib/utils";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const getUserOrders = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;
  const decodedAccessToken = verifyToken(
    accessToken as string,
    process.env.JWT_SECRET as string,
  );

  //   const userRole = (decodedAccessToken.data as JwtPayload).role;
  const userId = (decodedAccessToken.data as JwtPayload).id;
  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "GET",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

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
