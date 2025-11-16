"use client";

import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CopyPhoneButtonProps {
  phone: string;
}

const CopyPhoneButton = ({ phone }: CopyPhoneButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      toast.success("Telefone copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Erro ao copiar telefone");
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
      {copied ? (
        <>
          <Check size={16} />
          Copiado
        </>
      ) : (
        <>
          <Copy size={16} />
          Copiar
        </>
      )}
    </Button>
  );
};

export default CopyPhoneButton;
