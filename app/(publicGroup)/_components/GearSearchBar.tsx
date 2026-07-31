"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SEARCH_FIELDS = [
  { value: "category", label: "Category" },
  { value: "brand", label: "Brand" },
  { value: "price", label: "Price" },
  { value: "name", label: "Name" },
] as const;

type SearchField = (typeof SEARCH_FIELDS)[number]["value"];

interface GearsSearchBarProps {
  /** Field selected by default when the component mounts. Defaults to "name". */
  defaultField?: SearchField;
  /** Placeholder shown in the input; falls back to a per-field default. */
  placeholder?: string;
  /** Debounce delay in ms before the URL updates as the user types. Defaults to 400. */
  debounceMs?: number;
  className?: string;
}

const FIELD_PLACEHOLDERS: Record<SearchField, string> = {
  category: "e.g. smartwatch",
  brand: "e.g. philips",
  price: "e.g. 10000",
  name: "e.g. wireless mouse",
};

export function GearsSearchBar({
  defaultField = "name",
  placeholder,
  debounceMs = 400,
  className,
}: GearsSearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [field, setField] = useState<SearchField>(defaultField);
  const [term, setTerm] = useState("");

  // Skip the update-on-mount pass so an empty initial term doesn't
  // immediately strip any server-rendered filters from the URL.
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const handle = setTimeout(() => {
      const trimmed = term.trim();

      // Build a fresh param set: strip any previous single-attribute
      // search fields so switching category doesn't stack stale filters
      // (e.g. leftover ?brand=philips when the user now searches name=mouse).
      const params = new URLSearchParams(searchParams.toString());
      SEARCH_FIELDS.forEach(({ value }) => params.delete(value));

      if (trimmed.length > 0) {
        params.set(field, trimmed);
      }

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    }, debounceMs);

    return () => clearTimeout(handle);
    // searchParams intentionally excluded: including it would re-trigger
    // this effect on every router.push it causes, fighting the debounce.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, term, debounceMs, pathname, router]);

  return (
    <div
      className={className}
      role="search"
      aria-label="Search gear by attribute"
    >
      <div className="flex w-full max-w-xl items-stretch overflow-hidden rounded-md border border-input bg-background focus-within:ring-1 focus-within:ring-ring">
        <Select
          value={field}
          onValueChange={(value) => setField(value as SearchField)}
        >
          <SelectTrigger
            className="shrink-0 rounded-none border-0 border-r border-input bg-muted/40 focus:ring-0 focus:ring-offset-0"
            aria-label="Search field"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SEARCH_FIELDS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type={field === "price" ? "number" : "text"}
            inputMode={field === "price" ? "decimal" : "text"}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder={placeholder ?? FIELD_PLACEHOLDERS[field]}
            className="rounded-none border-0 pl-9 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label={`Search by ${field}`}
          />
        </div>
      </div>
    </div>
  );
}