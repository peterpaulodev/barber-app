"use client";

import { useState } from "react";
import { BarbershopService, Barbershop } from "@/app/generated/prisma/client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import { createBooking } from "@/app/_actions/create-booking";
import { toast } from "sonner";

interface BookingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: BarbershopService;
  barbershop: Barbershop;
}

const BookingSheet = ({
  open,
  onOpenChange,
  service,
  barbershop,
}: BookingSheetProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${String(hour).padStart(2, "0")}:00`);
      slots.push(`${String(hour).padStart(2, "0")}:30`);
    }
    slots.push("18:00");
    return slots;
  };

  const timeSlots = generateTimeSlots();
  const priceInReais = (service.priceInCents / 100)
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    .replace(/[^\d,]/g, "")
    .replace(",", ".");

  const isConfirmButtonEnabled = selectedDate && selectedTime;

  const handleConfirm = async () => {
    if (!selectedDate || !selectedTime) return;

    const result = await createBooking({
      serviceId: service.id,
      barbershopId: barbershop.id,
      date: selectedDate,
      time: selectedTime,
    });

    if (result.success) {
      toast.success("Reserva confirmada com sucesso!");
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      onOpenChange(false);
    } else {
      toast.error(result.error || "Erro ao confirmar reserva");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="border-border border-b px-6 py-4">
          <SheetTitle className="text-left">Reservar horário</SheetTitle>
        </SheetHeader>

        {/* Content */}
        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-4">
          {/* Calendar Section */}
          <div>
            <p className="text-foreground mb-3 text-sm font-semibold">
              Selecione uma data
            </p>
            <div className="border-border bg-secondary flex justify-center rounded-lg border">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </div>
          </div>

          {/* Time Slots Section */}
          {selectedDate && (
            <div className="mt-6">
              <p className="text-foreground mb-3 text-sm font-semibold">
                Selecione um horário
              </p>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="text-sm"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Booking Summary Section */}
          {selectedDate && selectedTime && (
            <div className="border-border bg-secondary mt-6 rounded-lg border p-4">
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase">
                    Serviço
                  </p>
                  <p className="text-foreground text-sm font-semibold">
                    {service.name}
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-xs font-semibold uppercase">
                      Data
                    </p>
                    <p className="text-foreground text-sm font-semibold">
                      {selectedDate.toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-semibold uppercase">
                      Horário
                    </p>
                    <p className="text-foreground text-sm font-semibold">
                      {selectedTime}
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-muted-foreground text-xs font-semibold uppercase">
                    Barbearia
                  </p>
                  <p className="text-foreground text-sm font-semibold">
                    {barbershop.name}
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground text-xs font-semibold uppercase">
                    Preço
                  </p>
                  <p className="text-foreground text-lg font-bold">
                    R$ {priceInReais}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Button */}
        <div className="border-border border-t px-6 py-4">
          <Button
            className="w-full"
            disabled={!isConfirmButtonEnabled}
            onClick={handleConfirm}
          >
            Confirmar reserva
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingSheet;
