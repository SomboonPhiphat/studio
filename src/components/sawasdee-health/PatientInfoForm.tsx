import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type PatientInfoFormProps = {
  name: string;
  setName: (name: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  dob: { day: string; month: string; year: string };
  setDob: (dob: { day: string; month: string; year: string }) => void;
  genders: string[];
  days: string[];
  months: string[];
  years: string[];
};

export default function PatientInfoForm({
  name,
  setName,
  gender,
  setGender,
  dob,
  setDob,
  genders,
  days,
  months,
  years,
}: PatientInfoFormProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          ข้อมูลผู้ป่วย (Patient Information)
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">👤 ชื่อ - นามสกุล</Label>
          <Input
            id="name"
            placeholder="กรอกชื่อและนามสกุล"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gender">⚧ เพศ</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="เลือกเพศ" />
            </SelectTrigger>
            <SelectContent>
              {genders.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>🎂 วันเกิด (วัน / เดือน / พ.ศ.)</Label>
          <div className="grid grid-cols-3 gap-3">
            <Select
              value={dob.day}
              onValueChange={(day) => setDob({ ...dob, day })}
            >
              <SelectTrigger>
                <SelectValue placeholder="วัน" />
              </SelectTrigger>
              <SelectContent>
                {days.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={dob.month}
              onValueChange={(month) => setDob({ ...dob, month })}
            >
              <SelectTrigger>
                <SelectValue placeholder="เดือน" />
              </SelectTrigger>
              <SelectContent>
                {months.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={dob.year}
              onValueChange={(year) => setDob({ ...dob, year })}
            >
              <SelectTrigger>
                <SelectValue placeholder="พ.ศ." />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
