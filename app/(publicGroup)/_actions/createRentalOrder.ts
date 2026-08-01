"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type RentalOrderState = {
  success: boolean;
  message?: string;
} | null;

export const createRentalOrder = async (
  _prevState: RentalOrderState,
  formData: FormData,
): Promise<RentalOrderState> => {
  const fromRaw = formData.get("from");
  const toRaw = formData.get("to");
  const daysRaw = formData.get("days");
  const totalRaw = formData.get("total");

  if (!fromRaw || !toRaw || !daysRaw || !totalRaw) {
    return {
      success: false,
      message: "Please select a rental data range.",
    };
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
    return {
      success: false,
      message:
        "Something went wrong calculating the total. Please reselect your dates.",
    };
  }

  const cookieStore = await cookies();

  let accessToken = cookieStore.get("accessToken")?.value || null;

  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in!",
    };
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

  if (!result.success) {
    return {
      success: false,
      message: result.message || "Could not place a rental order.",
    };
  }

  if (result.data?.checkoutUrl) {
    redirect(result.data.checkoutUrl);
  }

  return result;
};
