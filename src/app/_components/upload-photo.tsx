"use client";

import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export function UploadPhoto() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File | undefined) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    handleFile(file);
  }

  function handleRemove() {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
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

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    handleFile(file);
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
        {preview ? (
          <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-border">
            <Image
              src={preview}
              alt="Preview da foto selecionada"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm border border-border rounded-full p-1.5 hover:bg-destructive hover:text-white transition-colors cursor-pointer"
              aria-label="Remover foto"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                inputRef.current?.click();
              }
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              w-full aspect-square rounded-xl border-2 border-dashed
              flex flex-col items-center justify-center gap-3
              cursor-pointer transition-colors
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
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.webp"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {preview && (
        <Button size="lg" className="w-full">
          Gerar foto profissional
        </Button>
      )}
    </div>
  );
}
