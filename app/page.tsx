import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import Image from "next/image";
import banner from "../public/banner.png";
import BookingItem from "./_components/booking-item";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "./_components/footer";
import {
  PageContainer,
  PageSection,
  PageSectionScroller,
  SectionTitle,
} from "./_components/ui/page";

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
    <main>
      <Header />

      <PageContainer>
        <SearchInput />
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vh"
          className="h-auto w-full"
        />

        <PageSection>
          <SectionTitle>Agendamentos</SectionTitle>
          <BookingItem
            serviceName="Corte de Cabelo"
            barbershopName="Barbearia do João"
            barbershopImageUrl="https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png"
            status="Confirmed"
            date={new Date()}
          />
        </PageSection>

        <PageSection>
          <SectionTitle>Recomendados</SectionTitle>
          <PageSectionScroller>
            {recommendedBarbershops.map((shop) => (
              <BarbershopItem key={shop.id} barbershop={shop} />
            ))}
          </PageSectionScroller>
        </PageSection>

        <PageSection>
          <SectionTitle>Populares</SectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((shop) => (
              <BarbershopItem key={shop.id} barbershop={shop} />
            ))}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>

      <Footer />
    </main>
  );
};

export default Home;
