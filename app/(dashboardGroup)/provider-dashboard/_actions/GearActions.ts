/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { verifyToken } from "@/lib/utils";
import { isAccessTokenExist } from "@/service/refreshToken";
import { JwtPayload } from "jsonwebtoken";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type GearState = {
  success: true;
  message: string;
  data: Record<string, any>;
};

// id: gear.data.id,
//     name: gear.data.name,
//     description: gear.data.name,
//     brand: gear.data.brand,
//     quantity: gear.data.quantity,
//     price: gear.data.price,
//     status: gear.data.status,

export const createGear = async (prevState: GearState, formData: FormData) => {
  const payload = {
    name: formData.get("name"),
    description: formData.get("description"),
    brand: formData.get("brand"),
    quantity: formData.get("quantity"),
    price: formData.get("price"),
  };
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value as string;

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/providers/gears`,
    {
      method: "POST",
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("provider-gears-created", {
      expire: 0,
    });
  }
  revalidatePath(`/provider-dashboard/gears/`);
  return result;
};

export const updateGear = async (
  gearId: string,
  prevState: GearState,
  formData: FormData,
) => {
  const payload = {
    name: formData.get("name") ?? "",
    description: formData.get("description") ?? "",
    brand: formData.get("brand") ?? "",
    quantity: formData.get("quantity") ?? "",
    price: formData.get("price") ?? "",
  };

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value as string;

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/providers/gears/${gearId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await res.json();

  if (result.success) {
    revalidateTag("provider-gears-updated", {
      expire: 0,
    });
  }

  revalidatePath(`/provider-dashboard/gears/${gearId}`);
  return result;
};
