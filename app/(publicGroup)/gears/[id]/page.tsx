
import { GearDetailData } from "@/lib/types";
import { getGearById } from "../../_actions/getGearById";
import GearDetails from "../../_components/GearDetails";
import { notFound } from "next/navigation";
import { getProviderDetails } from "@/service/getProviderDetails";
import { Toaster } from "@/components/ui/sonner";

interface GearDetailProps {
  params: Promise<{id: string}>;
}

const GearDetailPage = async ({ params }: GearDetailProps) => {
  const {id} = await params;
  const result = await getGearById(id)

   if (!result.success || !result.data) {
    notFound();
  }

  const gear = result.data;
  const providerDetails = await getProviderDetails(gear.providerId)
  const provider = providerDetails.data

  const gearDetails : GearDetailData = {
    id: gear.id,
    name: gear.name,
    description: gear.description,
    quantity: gear.quantity,
    image: gear.image,
    category: gear.category?.name ?? "Uncategorized",
    brand: gear.brand,
    pricePerDay: gear.price,
    specifications: gear.specifications ?? [],
    provider: provider ?? {
      name: "Unknown provider",
    },
  };


  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <GearDetails gear={gearDetails} />
    </div>
  );
}

export default GearDetailPage