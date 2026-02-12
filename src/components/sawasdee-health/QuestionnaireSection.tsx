import type { Answers, DimensionKey } from '@/lib/definitions';
import QuestionCard from './QuestionCard';

type QuestionnaireSectionProps = {
  dimensions: any;
  answers: Answers;
  setAnswers: (answers: Answers) => void;
};

export default function QuestionnaireSection({
  dimensions,
  answers,
  setAnswers,
}: QuestionnaireSectionProps) {
  const handleAnswerChange = (dimension: DimensionKey, level: number) => {
    setAnswers({ ...answers, [dimension]: level });
  };

  return (
    <div className="space-y-6">
      {Object.entries(dimensions).map(([key, value]: [string, any]) => (
        <QuestionCard
          key={key}
          dimensionKey={key as DimensionKey}
          title={value.title}
          choices={value.choices}
          currentAnswer={answers[key as DimensionKey]}
          onAnswerChange={handleAnswerChange}
        />
      ))}
    </div>
  );
}
