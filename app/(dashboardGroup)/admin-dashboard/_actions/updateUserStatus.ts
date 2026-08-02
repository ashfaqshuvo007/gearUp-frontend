// app/dashboard/_actions/updateUserStatus.ts
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { StatusUpdateState } from "../_components/UpdateStatusForm";

export const updateUserStatus = async (
  _prevState: StatusUpdateState,
  formData: FormData,
): Promise<StatusUpdateState> => {
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message ?? "Could not update user.",
    };
  }

  revalidatePath(`/admin-dashboard/users/${id}`);
  return { success: true, message: "User status updated." };
};
