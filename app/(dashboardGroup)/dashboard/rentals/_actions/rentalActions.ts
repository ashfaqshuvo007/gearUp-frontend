"use server";

import { cookies } from "next/headers";

export const getRentalOrder = async (id: string) => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value || null;

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals/${id}`, {
    method: "GET",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 6,
      tags: ["rental-order-" + id],
    },
  });

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message || "Failed to load rental order.",
    };
  }
  return result.data;
};
