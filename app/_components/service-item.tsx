"use client";

import { useState } from "react";
import Image from "next/image";
import { BarbershopService, Barbershop } from "@/app/generated/prisma/client";
import { Button } from "./ui/button";
import BookingSheet from "./booking-sheet";

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Barbershop;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [bookingSheetOpen, setBookingSheetOpen] = useState(false);

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
            <Button size="sm" className="shrink-0" onClick={() => setBookingSheetOpen(true)}>
              Reservar
            </Button>
          </div>
        </div>
      </div>

      <BookingSheet
        open={bookingSheetOpen}
        onOpenChange={setBookingSheetOpen}
        service={service}
        barbershop={barbershop}
      />
    </>
  );
};

export default ServiceItem;
