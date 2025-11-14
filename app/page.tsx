import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import Image from "next/image";
import banner from "../public/banner.png";

const Home = () => {
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
      </main>
    </div>
  );
};

export default Home;
