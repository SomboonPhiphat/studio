import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="relative bg-gradient-to-b from-card via-card to-background/80 py-8 text-center shadow-sm">
        <div className="container mx-auto">
          <h1 className="pt-8 text-4xl font-bold text-gradient bg-gradient-to-r from-primary to-blue-400 dark:to-cyan-400 md:text-5xl">
            EQ-5D-5L คืออะไร?
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            แบบประเมินคุณภาพชีวิตที่เกี่ยวข้องกับสุขภาพ
          </p>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8">
        <Card className="shadow-lg">
           <CardHeader>
             <Link href="/" passHref>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                กลับไปหน้าหลัก
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-6 text-base leading-relaxed">
            <p className="font-semibold text-primary">
              EQ-5D-5L เป็นเครื่องมือมาตรฐานที่ใช้กันอย่างแพร่หลายทั่วโลกในการวัดและประเมินคุณภาพชีวิตที่เกี่ยวข้องกับสุขภาพ (Health-Related Quality of Life - HRQoL) พัฒนาโดยกลุ่ม EuroQol.
            </p>
            <p>
              แบบประเมินนี้ประกอบด้วย 2 ส่วนหลัก:
            </p>
            
            <div>
              <h3 className="mb-2 text-xl font-semibold">1. ส่วนชุดคำถาม 5 ข้อ (EQ-5D-5L)</h3>
              <p>
                เป็นการประเมินสุขภาพใน 5 มิติ (5 Dimensions) โดยแต่ละมิติมี 5 ระดับความรุนแรง (5 Levels) ได้แก่:
              </p>
              <ul className="ml-6 mt-4 list-disc space-y-2">
                <li><strong>การเคลื่อนไหว (Mobility):</strong> ความสามารถในการเดิน</li>
                <li><strong>การดูแลตนเอง (Self-Care):</strong> ความสามารถในการล้างหน้า/แต่งตัว</li>
                <li><strong>กิจกรรมที่ทำเป็นประจำ (Usual Activities):</strong> ความสามารถในการทำกิจกรรมต่างๆ เช่น ทำงาน เรียนหนังสือ ทำงานบ้าน</li>
                <li><strong>ความเจ็บปวด/ไม่สบาย (Pain/Discomfort):</strong> ระดับความเจ็บปวดหรือไม่สบายตัว</li>
                <li><strong>ความวิตกกังวล/ซึมเศร้า (Anxiety/Depression):</strong> สภาพจิตใจ</li>
              </ul>
              <p className="mt-4">
                ผลลัพธ์จากส่วนนี้จะถูกแปลงเป็นรหัสสุขภาพ 5 หลัก (Health Profile) ซึ่งสามารถนำไปคำนวณเป็นค่าอรรถประโยชน์ (Utility Score) ได้
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">2. ส่วน Visual Analog scale (EQ-VAS)</h3>
              <p>
                เป็นการให้ผู้ตอบประเมินระดับสุขภาพของตนเองในวันนั้นๆ โดยให้คะแนนตั้งแต่ 0 (สุขภาพแย่ที่สุดที่คิดได้) ถึง 100 (สุขภาพดีที่สุดที่คิดได้)
              </p>
            </div>
            
            <p className="border-t border-border pt-6">
              ข้อมูลที่ได้จาก EQ-5D-5L มีประโยชน์อย่างยิ่งในงานวิจัยทางคลินิก, การประเมินผลทางเศรษฐศาสตร์สาธารณสุข, และการตัดสินใจเชิงนโยบายด้านสุขภาพ เพื่อให้เข้าใจถึงผลกระทบของโรคและการรักษาที่มีต่อคุณภาพชีวิตของผู้ป่วย
            </p>
          </CardContent>
        </Card>
      </div>
      <footer className="text-center text-sm text-muted-foreground py-6">
        © {new Date().getFullYear()} Sawasdee Health. All Rights Reserved.
      </footer>
    </main>
  );
}
