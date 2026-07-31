"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const CATEGORIES = [
  { value: "electronics", label: "Electronics" },
  { value: "mechanical", label: "Mechanical" },
  { value: "industrial", label: "Industrial" },
  { value: "precision", label: "Precision" },
];

const BRANDS = [
  { value: "brand-a", label: "Brand A" },
  { value: "brand-b", label: "Brand B" },
  { value: "brand-c", label: "Brand C" },
  { value: "brand-d", label: "Brand D" },
];

export function FilterSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, searchParams, router]
  );

  // Handle category filter
  const handleCategoryChange = (categoryValue: string, checked: boolean) => {
    const categoriesParam = searchParams.get("categories");
    const categories = categoriesParam ? categoriesParam.split(",") : [];

    if (checked) {
      categories.push(categoryValue);
    } else {
      const index = categories.indexOf(categoryValue);
      if (index > -1) categories.splice(index, 1);
    }

    updateParams({
      categories: categories.length > 0 ? categories.join(",") : null,
    });
  };

  // Handle brand filter
  const handleBrandChange = (brandValue: string, checked: boolean) => {
    const brandsParam = searchParams.get("brands");
    const brands = brandsParam ? brandsParam.split(",") : [];

    if (checked) {
      brands.push(brandValue);
    } else {
      const index = brands.indexOf(brandValue);
      if (index > -1) brands.splice(index, 1);
    }

    updateParams({
      brands: brands.length > 0 ? brands.join(",") : null,
    });
  };

  // Handle price range
  const handlePriceChange = (value: number[]) => {
    updateParams({
      minPrice: value[0].toString(),
      maxPrice: value[1].toString(),
    });
  };

  // Handle availability dates
  const handleAvailabilityChange = (availabilityValue: string) => {
    const currentAvailability = searchParams.get("availability");

    if (currentAvailability === availabilityValue) {
      updateParams({ availability: null });
    } else {
      updateParams({ availability: availabilityValue });
    }
  };

  const categoriesParam = searchParams.get("categories");
  const selectedCategories = categoriesParam ? categoriesParam.split(",") : [];

  const brandsParam = searchParams.get("brands");
  const selectedBrands = brandsParam ? brandsParam.split(",") : [];

  const minPrice = parseInt(searchParams.get("minPrice") || "0");
  const maxPrice = parseInt(searchParams.get("maxPrice") || "1000");

  const currentAvailability = searchParams.get("availability");

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-background p-6">
      <div className="space-y-8">
        {/* Category Filter */}
        <div>
          <h3 className="mb-4 font-semibold text-foreground">Category</h3>
          <div className="space-y-3">
            {CATEGORIES.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.value}`}
                  checked={selectedCategories.includes(category.value)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={`category-${category.value}`}
                  className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="mb-4 font-semibold text-foreground">Price Range</h3>
          <div className="space-y-4">
            <Slider
              value={[minPrice, maxPrice]}
              onValueChange={handlePriceChange}
              min={0}
              max={1000}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <h3 className="mb-4 font-semibold text-foreground">Brand</h3>
          <div className="space-y-3">
            {BRANDS.map((brand) => (
              <div key={brand.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand.value}`}
                  checked={selectedBrands.includes(brand.value)}
                  onCheckedChange={(checked) =>
                    handleBrandChange(brand.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={`brand-${brand.value}`}
                  className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                >
                  {brand.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Filter */}
        <div>
          <h3 className="mb-4 font-semibold text-foreground">Availability</h3>
          <div className="space-y-3">
            {[
              { value: "in-stock", label: "In Stock" },
              { value: "pre-order", label: "Pre-order" },
              { value: "coming-soon", label: "Coming Soon" },
            ].map((availability) => (
              <div key={availability.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`availability-${availability.value}`}
                  checked={currentAvailability === availability.value}
                  onCheckedChange={() =>
                    handleAvailabilityChange(availability.value)
                  }
                />
                <label
                  htmlFor={`availability-${availability.value}`}
                  className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                >
                  {availability.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
