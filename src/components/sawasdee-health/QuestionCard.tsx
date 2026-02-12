import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SEVERITY_COLORS } from '@/lib/constants';
import type { AnswerLevel, DimensionKey } from '@/lib/definitions';
import { cn } from '@/lib/utils';

type QuestionCardProps = {
  dimensionKey: DimensionKey;
  title: string;
  choices: string[];
  currentAnswer: AnswerLevel;
  onAnswerChange: (dimension: DimensionKey, level: number) => void;
};

export default function QuestionCard({
  dimensionKey,
  title,
  choices,
  currentAnswer,
  onAnswerChange,
}: QuestionCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3" role="radiogroup" aria-labelledby={dimensionKey}>
          {choices.map((choice, index) => {
            const level = index + 1;
            const isSelected = currentAnswer === level;
            const severityColor = SEVERITY_COLORS[level];

            return (
              <div
                key={level}
                role="radio"
                aria-checked={isSelected}
                onClick={() => onAnswerChange(dimensionKey, level)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onAnswerChange(dimensionKey, level);
                  }
                }}
                className={cn(
                  'relative cursor-pointer rounded-xl border p-4 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary',
                  isSelected
                    ? 'text-white shadow-inner'
                    : 'border-border bg-card hover:translate-x-[7px] hover:shadow-xl'
                )}
                style={{
                  backgroundColor: isSelected ? severityColor : undefined,
                  borderColor: isSelected ? severityColor : undefined,
                }}
              >
                {!isSelected && (
                  <div
                    className="absolute left-0 top-0 h-full w-1.5 rounded-l-xl"
                    style={{ backgroundColor: severityColor }}
                  />
                )}
                <span className={cn('ml-4 block', isSelected ? 'font-semibold' : '')}>
                  {level}. {choice}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
