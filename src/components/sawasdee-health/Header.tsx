import { Badge } from '@/components/ui/badge';
import { ModeToggle } from '@/components/mode-toggle';

export default function Header() {
  return (
    <header className="relative bg-gradient-to-b from-card via-card to-background/80 py-8 text-center shadow-sm">
      <div className="container mx-auto">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <Badge
          variant="outline"
          className="mb-4 border-primary/50 bg-primary/10 text-primary"
        >
          Thai Hybrid Model
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-gradient bg-gradient-to-r from-primary to-blue-400 dark:to-cyan-400">
          Thai EQ-5D-5L Calculator
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          เครื่องมือประเมินคุณภาพชีวิตและค่าอรรถประโยชน์
        </p>
      </div>
    </header>
  );
}
