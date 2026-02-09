import Image from "next/image";

export function Hero() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
        Fotos profissionais
        <br />
        para o linkedin
      </h1>

      <p className="text-muted-foreground text-base max-w-md">
        Transforme qualquer foto sua em um retrato profissional de alta
        qualidade usando inteligência artificial. Perfeito para seu perfil do
        LinkedIn.
      </p>

      <div className="flex items-center gap-3 mt-2">
        <div className="relative size-28 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/headshot-1.png"
            alt="Exemplo de foto profissional 1"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative size-28 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/headshot-2.png"
            alt="Exemplo de foto profissional 2"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative size-28 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/images/headshot-3.png"
            alt="Exemplo de foto profissional 3"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
