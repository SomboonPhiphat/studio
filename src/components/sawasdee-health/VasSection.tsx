import * as SliderPrimitive from '@radix-ui/react-slider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type VasSectionProps = {
  vasScore: number;
  setVasScore: (score: number) => void;
};

export default function VasSection({ vasScore, setVasScore }: VasSectionProps) {
  const handleSliderChange = (value: number[]) => {
    setVasScore(value[0]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value);
    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    setVasScore(value);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          🌡️ Visual Analog Scale (EQ-VAS)
        </CardTitle>
        <CardDescription>
          โปรดระบุระดับสุขภาพของคุณในวันนี้ โดยที่ 0 คือสุขภาพที่แย่ที่สุด และ 100
          คือสุขภาพที่ดีที่สุด
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 pt-2">
        <SliderPrimitive.Root
          className="relative flex w-full touch-none select-none items-center"
          value={[vasScore]}
          onValueChange={handleSliderChange}
          max={100}
          step={1}
        >
          <SliderPrimitive.Track className="vas-slider-track relative h-3 w-full grow overflow-hidden rounded-full">
            <SliderPrimitive.Range className="absolute h-full bg-transparent" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className="vas-slider-thumb block h-6 w-6 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            data-value={vasScore}
          />
        </SliderPrimitive.Root>
        <Input
          type="number"
          className="w-40 text-center text-4xl font-bold font-headline h-auto py-2"
          value={vasScore}
          onChange={handleInputChange}
          min="0"
          max="100"
        />
      </CardContent>
    </Card>
  );
}
