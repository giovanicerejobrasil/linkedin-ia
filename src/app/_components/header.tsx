import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-background">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="size-5" />
          <span className="font-semibold text-lg">Linkfotos AI</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="#como-funciona"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Como funciona
          </Link>
          <Link
            href="#exemplos"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Exemplos
          </Link>
        </nav>
      </div>
    </header>
  );
}
