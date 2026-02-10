"use client";

import { Button } from "@/components/ui/button";
import { generateProfessionalPhoto } from "@/lib/api/analyze";
import { useMutation } from "@tanstack/react-query";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

interface UploadPhotoProps {
  onPhotoSelected: (photo: string) => void;
  onContinue: (url: string) => void;
  selectedPhoto: string | null;
}

export function UploadPhoto({
  onPhotoSelected,
  onContinue,
  selectedPhoto,
}: UploadPhotoProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const generateMutation = useMutation({
    mutationFn: generateProfessionalPhoto,
    onSuccess: (response) => {
      if (response.data?.generatedImage) {
        onContinue(response.data?.generatedImage);
      }
    },
    onError: (error) => {
      console.error("FALHA NA MUTATION: ", error);
    },
  });
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      setFileSize(file.size);
      setFileType(file.type);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          onPhotoSelected(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setFileName(file.name);
      setFileSize(file.size);
      setFileType(file.type);

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target) {
          onPhotoSelected(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const handleGeneratePhoto = async () => {
    if (!selectedPhoto) return;

    try {
      await generateMutation.mutateAsync({
        imageUrl: selectedPhoto!,
        fileName: fileName!,
        fileSize: fileSize!,
        fileType: fileType!,
      });
    } catch (error) {
      console.error("ERRO AO GERAR FOTO: ", error);
    }
  };

  function handleRemoveFile() {
    onPhotoSelected("");
    setFileName(null);
    setFileSize(null);
    setFileType(null);
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Envie sua foto</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Escolha uma foto sua para transformar em retrato profissional.
          <br />
          Funciona melhor com fotos onde seu rosto está bem visível.
        </p>
      </div>

      <div className="w-full">
        {selectedPhoto ? (
          <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-border">
            <Image
              src={selectedPhoto}
              alt="Preview da foto selecionada"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveFile}
              className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm border border-border rounded-full p-1.5 hover:bg-destructive hover:text-white transition-colors cursor-pointer"
              aria-label="Remover foto"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <div
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            role="button"
            tabIndex={0}
            className={`
              w-full aspect-square rounded-xl border-2 border-dashed
              flex flex-col items-center justify-center gap-3
              cursor-pointer transition-colors relative
              ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/30 hover:border-primary hover:bg-muted/50"
              }
            `}
          >
            <div className="bg-muted rounded-full p-3">
              <Upload className="size-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-center">
              Arraste sua foto aqui ou clique para selecionar
            </p>
            <span className="text-xs text-muted-foreground">
              PNG, JPG ou WEBP
            </span>

            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={handleFileSelect}
              className="transparent h-full w-full absolute inset-0 cursor-pointer opacity-0"
            />
          </div>
        )}
      </div>

      {selectedPhoto && (
        <Button
          size="lg"
          className="w-full cursor-pointer"
          onClick={handleGeneratePhoto}
        >
          Gerar foto profissional
        </Button>
      )}
    </div>
  );
}
