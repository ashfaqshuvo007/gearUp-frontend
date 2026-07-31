"use server";

export const getGearsList = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();

  const allowedFields = ["name", "category", "brand", "price"] as const;

  if (query) {
    for (const field of allowedFields) {
      const value = query[field];
      if (typeof value === "string" && value.length > 0) {
        params.set(field, value);
      }
    }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/gears?${params.toString()}`,
    {
      cache: "no-cache",
      next: {
        revalidate: 60 * 60 * 6,
        tags: ["gears"],
      },
    },
  );

  const result = await res.json();

  return result;
};
