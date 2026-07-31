"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GearProvider } from "@/lib/types";
import { BadgeCheck, MapPin, Star } from "lucide-react";

export const ProviderInfo = ({ provider }: { provider: GearProvider }) => {
  const initials = provider.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div>
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Provided by
      </h2>
      <div className="flex items-center gap-4 rounded-lg border p-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={"#"} alt={provider.name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-medium">{provider.name}</span>
            {provider.status === "ACTIVE" && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            {provider.status !== undefined && (
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
              </span>
            )}
            {provider.status !== undefined && (
              <span>{provider.status}</span>
            )}
            {provider.status === "ACTIVE" && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {"Dhaka"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}