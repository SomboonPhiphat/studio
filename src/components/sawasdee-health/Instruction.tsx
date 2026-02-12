import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';
import { Separator } from '../ui/separator';

export default function Instruction() {
  return (
    <>
      <Separator />
      <Alert className="border-primary/30 bg-primary/10 text-primary-foreground dark:text-foreground">
        <Lightbulb className="h-5 w-5 text-primary" />
        <AlertTitle className="font-semibold text-primary">คำชี้แจง</AlertTitle>
        <AlertDescription className="text-muted-foreground dark:text-gray-300">
          ให้ผู้ตอบแบบสอบถาม
          <strong>เลือกระดับสุขภาพที่ตรงกับของตนเอง ในวันที่ทำแบบสอบถาม</strong>
          มากที่สุด
        </AlertDescription>
      </Alert>
    </>
  );
}
