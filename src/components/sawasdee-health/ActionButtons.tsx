import { Button } from '@/components/ui/button';
import { Save, BarChart3, Trash2 } from 'lucide-react';

type ActionButtonsProps = {
  onSave: () => void;
  onExport: () => void;
  onClearHistory: () => void;
};

export default function ActionButtons({
  onSave,
  onExport,
  onClearHistory,
}: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Button size="lg" onClick={onSave}>
        <Save className="mr-2 h-5 w-5" />
        บันทึกข้อมูล
      </Button>
      <Button size="lg" variant="secondary" onClick={onExport}>
        <BarChart3 className="mr-2 h-5 w-5" />
        ส่งออก
      </Button>
      <Button size="lg" variant="destructive" onClick={onClearHistory}>
        <Trash2 className="mr-2 h-5 w-5" />
        ล้างประวัติ
      </Button>
    </div>
  );
}
