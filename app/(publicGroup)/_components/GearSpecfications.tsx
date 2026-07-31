"use client"

import { GearSpecification } from "@/lib/types";
import { Package } from "lucide-react";

export const GearSpecifications = ({
  specifications,
}: {
  specifications: GearSpecification[];
}) => {
  if (specifications.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
        <Package className="h-4 w-4" />
        Specifications
      </h2>
      <dl className="divide-y divide-border rounded-lg border">
        {specifications.map((spec) => (
          <div
            key={spec.label}
            className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
          >
            <dt className="text-muted-foreground">{spec.label}</dt>
            <dd className="font-mono text-right">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}