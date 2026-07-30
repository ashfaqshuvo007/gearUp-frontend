"use server";

import { cookies } from "next/headers";

export const getGearsList = async ({
  query,
}: {
  query?: { [key: string]: string | string[] | undefined };
}) => {
  const params = new URLSearchParams();

  if (query && query.searchTerm) {
    params.set("searchTerm", query.searchTerm as string);
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
