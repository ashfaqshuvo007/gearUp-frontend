"use server";

export const getProviderDetails = async (id: string) => {
  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/users/${id}`,
    {
      cache: "force-cache",
      next: {
        revalidate: 60 * 60 * 24, // 1day
        tags: ["provider-details"],
      },
    },
  );

  if (res.status === 404) {
    return { success: false, data: null };
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch provider ${id}: ${res.status}`);
  }

  const result = res.json();

  return result;
};
