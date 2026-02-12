import { cn } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

type ResultPanelProps = {
  healthProfileCode: string | null;
  utilityScore: number | null;
};

export default function ResultPanel({
  healthProfileCode,
  utilityScore,
}: ResultPanelProps) {
  const scoreColorClass =
    utilityScore === null
      ? 'text-gray-400'
      : utilityScore >= 0.8
      ? 'text-green-400'
      : utilityScore >= 0.5
      ? 'text-yellow-400'
      : 'text-red-400';

  return (
    <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-blue-900 p-6 text-white shadow-2xl">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm uppercase tracking-widest text-blue-300">
            Health Profile
          </p>
          {healthProfileCode ? (
             <p className="font-mono text-4xl font-bold tracking-wider">
               {healthProfileCode}
            </p>
          ) : (
            <Skeleton className="mt-2 h-10 w-32 bg-slate-700" />
          )}
        </div>
        <div className="h-16 w-px bg-blue-700 hidden sm:block"></div>
        <div className="text-center sm:text-right">
          <p className="text-sm uppercase tracking-widest text-blue-300">
            Utility Score (Hybrid)
          </p>
          {utilityScore !== null ? (
            <p className={cn('text-4xl font-bold', scoreColorClass)}>
              {utilityScore.toFixed(4)}
            </p>
          ) : (
            <Skeleton className="mt-2 h-10 w-36 bg-slate-700" />
          )}
        </div>
      </div>
      <p className="absolute bottom-3 right-4 text-xs text-blue-400/60">
        อ้างอิงค่าสัมประสิทธิ์จาก Pattanaphesaj และคณะ (2018)
      </p>
    </div>
  );
}
