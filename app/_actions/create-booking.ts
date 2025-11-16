"use server";

import { prisma } from "@/lib/prisma";

interface CreateBookingInput {
  serviceId: string;
  barbershopId: string;
  date: Date;
  time: string;
}

export async function createBooking(input: CreateBookingInput) {
  const { serviceId, barbershopId, date, time } = input;

  // Combine date and time into a single DateTime
  const [hours, minutes] = time.split(":").map(Number);
  const bookingDateTime = new Date(date);
  bookingDateTime.setHours(hours, minutes, 0, 0);

  // Validate input
  if (!serviceId || !barbershopId || !date || !time) {
    return {
      success: false,
      error: "Missing required fields",
    };
  }

  // Validate service exists and belongs to barbershop
  const service = await prisma.barbershopService.findUnique({
    where: { id: serviceId },
  });

  if (!service || service.barbershopId !== barbershopId) {
    return {
      success: false,
      error: "Service not found or does not belong to this barbershop",
    };
  }

  // Validate barbershop exists
  const barbershop = await prisma.barbershop.findUnique({
    where: { id: barbershopId },
  });

  if (!barbershop) {
    return {
      success: false,
      error: "Barbershop not found",
    };
  }

  try {
    // Create booking
    const booking = await prisma.booking.create({
      data: {
        serviceId,
        barbershopId,
        date: bookingDateTime,
      },
      include: {
        service: true,
        barbershop: true,
      },
    });

    return {
      success: true,
      booking,
    };
  } catch (error) {
    console.error("Error creating booking:", error);
    return {
      success: false,
      error: "Failed to create booking",
    };
  }
}
