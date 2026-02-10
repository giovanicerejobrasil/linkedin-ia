"use client";

import { useState } from "react";
import { Header } from "./header";
import { Hero } from "./hero";
import { ResultView } from "./result-view";
import { UploadPhoto } from "./upload-photo";

type Step = "home" | "result";

export function HomeContent() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [generatedPhoto, setGeneratedPhoto] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("home");

  const handleSelectPhoto = (photo: string) => {
    setSelectedPhoto(photo || null);
  };

  const handleContinue = (url: string) => {
    setGeneratedPhoto(url || null);
    setStep("result");
  };

  const handleReset = () => {
    setSelectedPhoto(null);
    setGeneratedPhoto(null);
    setStep("home");
  };

  if (step === "result" && selectedPhoto) {
    return (
      <>
        <Header />
        <ResultView
          selectedPhoto={selectedPhoto}
          generatedPhoto={generatedPhoto || ""}
          onStartOver={handleReset}
        />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-200px)]">
          <div className="flex items-center justify-center">
            <Hero />
          </div>
          <div className="flex items-center justify-center">
            <UploadPhoto
              onPhotoSelected={handleSelectPhoto}
              onContinue={handleContinue}
              selectedPhoto={selectedPhoto}
            />
          </div>
        </div>
      </main>
    </>
  );
}
