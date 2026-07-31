import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GearDetailData, GearSpecification } from "@/lib/types";
import { GearImage } from "./GearImage";
import { GearSpecifications } from "./GearSpecfications";
import { ProviderInfo } from "./ProviderInfo";
import { RentNowCard } from "./RentNowCard";
import { getMe } from "@/service/getMe";
import EmptyOrderCard from "./EmptyOrderCard";

interface GearDetailProps {
  gear: GearDetailData;
  onRentRequest?: (range: { from: Date; to: Date }) => void;
}

const GearDetails = async ({ gear, onRentRequest }: GearDetailProps) => {
  const user = await getMe()
    const specifications: GearSpecification[] = [
        {
        label: "Brand",
        value: gear.brand,
        },
        {
            label: "Available Stock",
            value: gear.quantity.toString(),
        },
        {
            label: "Gear Details",
            value: gear.description,
        }
    ]
        
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Left: image, specs, provider */}
      <div className="space-y-8 lg:col-span-2">
        <GearImage src={gear.image || ""} alt={gear.name} />

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{gear.category}</Badge>
            <Badge variant="outline">{gear.brand}</Badge>
          { gear.quantity > 1 ? (
            <Badge variant="default">AVAILABLE</Badge>
          ) : <Badge variant="destructive"> NOT AVAILABLE</Badge> }
          </div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {gear.name}
          </h1>
          <p className="leading-relaxed text-muted-foreground">
            {gear.description}
          </p>
        </div>

        <Separator />

        <GearSpecifications specifications={specifications} />

        <Separator />

        <ProviderInfo provider={gear.provider} />
      </div>

      {/* Right: sticky rent-now panel */}
      <div className="lg:col-span-1">
        {user.success ? (
          <div className="lg:sticky lg:top-20">
            {gear.quantity > 1 ? (
            <RentNowCard
              orderItemId={gear.id}
              pricePerDay={gear.pricePerDay}
              unavailableDates={gear.unavailableDates}
              onRentRequest={onRentRequest}
            />
            ) : ""
            }
          </div>
          ) : <EmptyOrderCard/>
        }
      </div>
    </div>
  );
};

export default GearDetails;