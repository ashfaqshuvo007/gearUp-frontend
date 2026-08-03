"use server";

import { verifyToken } from "@/lib/utils";
import { JwtPayload } from "jsonwebtoken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getUserStats = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;
  const decodedAccessToken = verifyToken(
    accessToken as string,
    process.env.JWT_SECRET as string,
  );

  const userRole = (decodedAccessToken.data as JwtPayload).role;

  if (userRole != "ADMIN") {
    return {
      success: false,
      message: "Unauthrized",
    };
  }
  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/admin/users`, {
    method: "GET",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 20,
      tags: ["total-users"],
    },
  });

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message || "There is a problem. Cannot fetch Users.",
    };
  }
  return result;
};
