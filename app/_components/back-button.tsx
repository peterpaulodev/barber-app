"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="bg-background/80 hover:bg-background absolute top-6 left-6 z-10 rounded-full p-2 backdrop-blur-sm transition-all"
    >
      <ArrowLeft size={20} />
    </button>
  );
};

export default BackButton;
