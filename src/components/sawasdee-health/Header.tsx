import { ModeToggle } from '@/components/mode-toggle';

export default function Header() {
  return (
    <header className="relative bg-gradient-to-b from-card via-card to-background/80 py-8 text-center shadow-sm">
      <div className="container mx-auto">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <h1 className="pt-8 text-4xl font-bold text-gradient bg-gradient-to-r from-primary to-blue-400 dark:to-cyan-400 md:text-5xl">
          Thai EQ-5D-5L <span className="text-lg md:text-2xl">Calculator</span>
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          เครื่องมือประเมินคุณภาพชีวิตและค่าอรรถประโยชน์
        </p>
      </div>
    </header>
  );
}
