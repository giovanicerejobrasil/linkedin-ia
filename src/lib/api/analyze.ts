interface GeneratePhotoRequest {
  imageUrl: string;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
}

interface GeneratePhotoResponse {
  success: boolean;
  message: string;
  data: {
    originalImage: string;
    generatedImage?: string;
    fileName?: string;
    fileSize?: number;
    fileType?: string;
    [key: string]: any; // Para aceitar outros campos que vierem da API
  };
  error?: string;
}

export async function generateProfessionalPhoto(
  request: GeneratePhotoRequest,
): Promise<GeneratePhotoResponse> {
  const response = await fetch(`/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.error || "Erro ao gerar foto profissional");
  }

  return await response.json();
}
