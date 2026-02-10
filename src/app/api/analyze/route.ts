import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const maxDuration = 60;

const analyzeRequestSchema = z.object({
  imageUrl: z.string().min(1, "URL da imagem é obrigatória"),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
  fileType: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = analyzeRequestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Dados inválidos",
        },
        { status: 400 },
      );
    }

    const { imageUrl, fileName, fileSize, fileType } = validation.data;

    const base64Data = imageUrl.split(",")[1];
    const mimeType =
      imageUrl.match(/data:([^;]+);/)?.[1] || fileType || "image/jpeg";
    const buffer = Buffer.from(base64Data, "base64");
    const blob = new Blob([buffer], { type: mimeType });

    const formData = new FormData();
    formData.append("data", blob, fileName);

    const n8nWebhookUrl =
      "https://giovanibrasil.app.n8n.cloud/webhook/076d2a73-5763-4465-af0f-47207324ae6a";
    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: "POST",
      body: formData,
    });

    if (!n8nResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Dados inválidos",
        },
        { status: 400 },
      );
    }

    const response = await n8nResponse.json();

    console.log("N8N RESPONSE: ", response);

    return NextResponse.json(
      {
        success: true,
        message: "Foto analisada e gerada com sucesso",
        data: {
          originalImage: imageUrl,
          ...response,
          fileName,
          fileSize,
          fileType,
        },
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("ERRO NA API: ", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro ao analisar e gerar foto profissional",
      },
      { status: 500 },
    );
  }
}
