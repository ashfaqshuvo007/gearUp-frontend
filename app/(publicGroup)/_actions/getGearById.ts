"use server";

export const getGearById = async (id: string) => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gears/${id}`, {
    cache: "no-store",
    next: {
      tags: [`gear-${id}`],
    },
  });

  if (res.status === 404) {
    return { success: false, data: null };
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch gear ${id}: ${res.status}`);
  }

  const result = await res.json();

  return result;
};
