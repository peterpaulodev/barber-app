import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import Image from "next/image";
import banner from "../public/banner.png";
import BookingItem from "./_components/booking-item";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";

const Home = async () => {
  const bookings = await prisma.booking.findMany();
  const recommendedBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div>
      <Header />
      <main className="space-y-4 px-5">
        <SearchInput />
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vh"
          className="h-auto w-full"
        />

        <h2 className="text-foreground text-xs font-semibold uppercase">
          Agendamentos
        </h2>
        <BookingItem
          serviceName="Corte de Cabelo"
          barbershopName="Barbearia do João"
          barbershopImageUrl="https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png"
          status="Confirmed"
          date={new Date()}
        />

        <h2 className="text-foreground text-xs font-semibold uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {recommendedBarbershops.map((shop) => (
            <BarbershopItem key={shop.id} barbershop={shop} />
          ))}
        </div>

        <h2 className="text-foreground text-xs font-semibold uppercase">
          Populares
        </h2>
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((shop) => (
            <BarbershopItem key={shop.id} barbershop={shop} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
