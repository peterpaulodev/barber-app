import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import ServiceItem from "@/app/_components/service-item";
import CopyPhoneButton from "@/app/_components/copy-phone-button";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";
import { PageContainer } from "@/app/_components/ui/page";
import BackButton from "../../_components/back-button";
import { prisma } from "@/lib/prisma";

interface BarbershopDetailPageProps {
  params: {
    id: string;
  };
}

const BarbershopDetailPage = async ({ params }: BarbershopDetailPageProps) => {
  const { id: barbershopId } = await params;

  const barbershop = await prisma.barbershop.findUnique({
    where: { id: barbershopId },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    notFound();
  }

  return (
    <main>
      <Header />

      <PageContainer>
        {/* Hero Image */}
        <div className="relative -m-5 mb-6 h-80 w-screen">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="object-cover"
            priority
          />
          {/* Back Button */}
          <BackButton />
        </div>

        {/* Barbershop Info Section */}
        <Card>
          <div className="space-y-4 px-6">
            <h1 className="text-foreground text-2xl font-bold">
              {barbershop.name}
            </h1>

            <p className="text-muted-foreground text-sm">
              {barbershop.description}
            </p>

            <Separator />

            {/* Address */}
            <div className="space-y-2">
              <p className="text-muted-foreground text-xs font-semibold uppercase">
                Endereço
              </p>
              <p className="text-foreground text-sm">{barbershop.address}</p>
            </div>

            <Separator />

            {/* Phones */}
            <div className="space-y-3">
              <p className="text-muted-foreground text-xs font-semibold uppercase">
                Telefone
              </p>
              <div className="flex flex-col gap-2">
                {barbershop.phones.map((phone, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2"
                  >
                    <p className="text-foreground text-sm">{phone}</p>
                    <CopyPhoneButton phone={phone} />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Book Button */}
            <Button className="w-full" size="default">
              Reservar
            </Button>
          </div>
        </Card>

        {/* Services Section */}
        {barbershop.services && barbershop.services.length > 0 && (
          <div className="mt-8 space-y-4">
            <h2 className="text-foreground text-xs font-semibold uppercase">
              Serviços
            </h2>

            <Card>
              <div className="px-6">
                {barbershop.services.map((service) => (
                  <ServiceItem key={service.id} service={service} />
                ))}
              </div>
            </Card>
          </div>
        )}
      </PageContainer>

      <Footer />
    </main>
  );
};

export default BarbershopDetailPage;
