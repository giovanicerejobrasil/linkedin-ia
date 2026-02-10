import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
import Image from "next/image";

interface ResultViewProps {
  selectedPhoto: string;
  generatedPhoto: string;
  onStartOver: () => void;
}

export function ResultView({
  selectedPhoto,
  generatedPhoto,
  onStartOver,
}: ResultViewProps) {
  const handleDownload = async () => {
    const response = await fetch(generatedPhoto);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "foto-profissional-linkedin.png";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Sua foto profissional
          </h2>
          <p className="text-muted-foreground">
            Compare o antes e depois. Faça o download para usar no LinkedIn!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-muted-foreground font-medium">
              Antes
            </span>
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={selectedPhoto}
                alt="Foto original"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <span className="text-sm text-muted-foreground font-medium">
              Depois
            </span>
            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={generatedPhoto}
                alt="Foto gerada por IA"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleDownload} className="cursor-pointer">
            <Download className="size-4" />
            Baixar foto
          </Button>
          <Button
            variant="outline"
            onClick={onStartOver}
            className="cursor-pointer"
          >
            <RefreshCw className="size-4" />
            Criar outra foto
          </Button>
        </div>
      </div>
    </main>
  );
}
