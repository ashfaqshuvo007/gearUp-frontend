"use server";

import { verifyToken } from "@/lib/utils";
import { getNewAccessToken } from "@/service/refreshToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { toast } from "sonner";

export const createRentalOrder = async (formData: FormData) => {
  const fromRaw = formData.get("from");
  const toRaw = formData.get("to");
  const daysRaw = formData.get("days");
  const totalRaw = formData.get("total");

  if (!fromRaw || !toRaw || !daysRaw || !totalRaw) {
    toast.error("Please select a rental date range.");
    return;
  }

  const from = new Date(fromRaw as string);
  const to = new Date(toRaw as string);
  const parsedDays = Number(daysRaw);
  const parsedTotal = Number(totalRaw);

  //Creating Payload
  const rentFrom = fromRaw;
  const rentTill = toRaw;
  const orderItemId = formData.get("orderItemId");
  const orderQty = Number(formData.get("days"));
  const price = Number(formData.get("price"));

  const payload = {
    rentFrom,
    rentTill,
    orderItemId,
    orderQty,
    price,
  };

  if (Number.isNaN(parsedDays) || Number.isNaN(parsedTotal)) {
    toast.error(
      "Something went wrong calculating the total. Please reselect your dates.",
    );
    return;
  }

  const cookieStore = await cookies();

  let accessToken = cookieStore.get("accessToken")?.value || null;
  const refreshToken = cookieStore.get("refreshToken")?.value || null;

  console.log(accessToken);
  if (!accessToken && !refreshToken) {
    // throw new Error("User Not Logged In!");

    return {
      success: false,
      message: "User not logged in!",
    };
  }

  const decodedAccessToken = accessToken
    ? verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string)
    : null;

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    //access token has expired but refresh token is valid, get new access token from backend
    const result = await getNewAccessToken();

    if (result.success) {
      const newAccessToken = result.data.accessToken;

      cookieStore.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: "lax",
      });

      accessToken = newAccessToken;
    }
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentals`, {
    method: "POST",
    headers: {
      // Authorization : accessToken as unknown as string,
      Authorization: `${accessToken}`,
      // Authorization : `Bearer ${accessToken}`
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidateTag("my-rentals", {
      expire: 0,
    });
  }

  return result;
};
