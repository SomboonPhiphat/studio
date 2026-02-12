import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { HistoryEntry } from '@/lib/definitions';
import { CardDescription, CardHeader, CardTitle } from '../ui/card';

type HistoryTableProps = {
  history: HistoryEntry[];
};

export default function HistoryTable({ history }: HistoryTableProps) {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          ประวัติการประเมิน
        </CardTitle>
        <CardDescription>
          ข้อมูลที่บันทึกไว้จะถูกเก็บไว้ในเบราว์เซอร์ของคุณเท่านั้น
        </CardDescription>
      </CardHeader>
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>วันที่-เวลา</TableHead>
              <TableHead>ชื่อ-นามสกุล</TableHead>
              <TableHead>เพศ</TableHead>
              <TableHead className="text-center">อายุ</TableHead>
              <TableHead className="text-center">Code</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">VAS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.length > 0 ? (
              history.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="whitespace-nowrap">{entry.dateTime}</TableCell>
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell>{entry.gender}</TableCell>
                  <TableCell className="text-center">{entry.age}</TableCell>
                  <TableCell className="font-mono text-center">{entry.code}</TableCell>
                  <TableCell className="text-right">{entry.score.toFixed(4)}</TableCell>
                  <TableCell className="text-right">{entry.vas}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  ไม่มีข้อมูลในประวัติ
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
