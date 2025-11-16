import Image from "next/image";
import { BarbershopService } from "@/app/generated/prisma/client";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  const priceInReais = (service.priceInCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <>
      <div className="flex gap-4 py-4">
        {/* Image - Left */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content - Middle */}
        <div className="flex flex-1 flex-col justify-between">
          {/* Header */}
          <div className="space-y-1">
            <h3 className="text-foreground text-sm font-semibold">
              {service.name}
            </h3>
            <p className="text-muted-foreground text-xs">
              {service.description}
            </p>
          </div>

          {/* Footer - Price and Button */}
          <div className="flex items-center justify-between">
            <p className="text-foreground text-sm font-semibold">
              {priceInReais}
            </p>
            <Button size="sm" className="shrink-0">
              Reservar
            </Button>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default ServiceItem;
