"use client";

import { useState, useEffect, useMemo } from 'react';
import { differenceInYears } from 'date-fns';

import {
  COEFFICIENTS,
  DIMENSIONS,
  THAI_MONTHS,
  GENDERS,
  DAYS,
} from '@/lib/constants';
import type { Answers, HistoryEntry } from '@/lib/definitions';
import { useToast } from '@/hooks/use-toast';

import { saveToGoogleSheet } from './actions';
import Header from '@/components/sawasdee-health/Header';
import PatientInfoForm from '@/components/sawasdee-health/PatientInfoForm';
import Instruction from '@/components/sawasdee-health/Instruction';
import QuestionnaireSection from '@/components/sawasdee-health/QuestionnaireSection';
import ResultPanel from '@/components/sawasdee-health/ResultPanel';
import VasSection from '@/components/sawasdee-health/VasSection';
import ActionButtons from '@/components/sawasdee-health/ActionButtons';
import HistoryTable from '@/components/sawasdee-health/HistoryTable';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const initialAnswers: Answers = {
  mobility: 0,
  selfCare: 0,
  usualActivities: 0,
  pain: 0,
  anxiety: 0,
};

export default function Home() {
  const { toast } = useToast();

  // State
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [vasScore, setVasScore] = useState(50);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load history from localStorage on component mount
  useEffect(() => {
    setIsClient(true);
    try {
      const savedHistory = localStorage.getItem('sawasdee_health_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
    }
  }, []);

  // Derived state for calculations
  const { healthProfileCode, utilityScore } = useMemo(() => {
    const code = Object.values(answers)
      .map((a) => (a === 0 ? 'X' : a))
      .join('');

    let deduction = 0;
    (Object.keys(answers) as (keyof Answers)[]).forEach((key) => {
      const level = answers[key];
      if (level > 0) {
        deduction += COEFFICIENTS[key][level - 1];
      }
    });

    const score = 1 - deduction;
    return { healthProfileCode: code, utilityScore: score };
  }, [answers]);

  const years = useMemo(() => {
    const currentBE = new Date().getFullYear() + 543;
    return Array.from({ length: 100 }, (_, i) => (currentBE - i).toString());
  }, []);

  const handleReset = () => {
    setName('');
    setGender('');
    setDob({ day: '', month: '', year: '' });
    setAnswers(initialAnswers);
    setVasScore(50);
  };

  const handleSave = async () => {
    if (!name || !gender || !dob.day || !dob.month || !dob.year) {
      toast({
        title: 'ข้อมูลไม่สมบูรณ์',
        description: 'กรุณากรอกชื่อ, เพศ, และวันเกิดให้ครบถ้วน',
        variant: 'destructive',
      });
      return;
    }
    if (healthProfileCode.includes('X')) {
      toast({
        title: 'ข้อมูลไม่สมบูรณ์',
        description: 'กรุณาตอบแบบสอบถามให้ครบทั้ง 5 มิติ',
        variant: 'destructive',
      });
      return;
    }

    const yearAD = parseInt(dob.year) - 543;
    const monthIndex = THAI_MONTHS.indexOf(dob.month);
    const birthDate = new Date(yearAD, monthIndex, parseInt(dob.day));

    if (isNaN(birthDate.getTime())) {
      toast({
        title: 'วันเกิดไม่ถูกต้อง',
        description: 'กรุณาตรวจสอบวันเดือนปีเกิด',
        variant: 'destructive',
      });
      return;
    }

    const now = new Date();
    const age = differenceInYears(now, birthDate);

    const newEntry: HistoryEntry = {
      id: now.toISOString(),
      dateTime: now.toLocaleString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      name,
      gender,
      age,
      code: healthProfileCode,
      score: utilityScore,
      vas: vasScore,
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    try {
      localStorage.setItem(
        'sawasdee_health_history',
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error('Failed to save history to localStorage:', error);
      toast({
        title: 'บันทึกประวัติล้มเหลว',
        description: 'ไม่สามารถบันทึกข้อมูลลงในประวัติของเบราว์เซอร์ได้',
        variant: 'destructive',
      });
      return;
    }
    
    const sheetData = {
      dateTime: now,
      name,
      gender,
      age,
      code: healthProfileCode,
      score: utilityScore,
      vas: vasScore,
    };

    const sheetResult = await saveToGoogleSheet(sheetData);

    if (sheetResult.success) {
        toast({
            title: 'บันทึกข้อมูลสำเร็จ',
            description: `ข้อมูลของคุณ ${name} ถูกบันทึกและส่งไปยัง Google Sheet เรียบร้อยแล้ว`,
        });
    } else {
        toast({
            title: 'บันทึกข้อมูลสำเร็จ (บางส่วน)',
            description: `ข้อมูลถูกบันทึกในประวัติแล้ว แต่ส่งไปยัง Google Sheet ไม่สำเร็จ: ${sheetResult.message}`,
            variant: 'destructive'
        });
    }

    handleReset();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearHistory = () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูลประวัติทั้งหมด?')) {
      setHistory([]);
      try {
        localStorage.removeItem('sawasdee_health_history');
        toast({
          title: 'ล้างประวัติสำเร็จ',
          description: 'ข้อมูลทั้งหมดในประวัติถูกลบแล้ว',
        });
      } catch (error) {
        console.error('Failed to clear history from localStorage:', error);
      }
    }
  };

  if (!isClient) {
    return null; // Render nothing on the server to avoid hydration mismatches
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container mx-auto max-w-5xl space-y-8 px-4 py-8">
        <PatientInfoForm
          name={name}
          setName={setName}
          gender={gender}
          setGender={setGender}
          dob={dob}
          setDob={setDob}
          genders={GENDERS}
          days={DAYS}
          months={THAI_MONTHS}
          years={years}
        />
        <Instruction />
        <QuestionnaireSection
          dimensions={DIMENSIONS}
          answers={answers}
          setAnswers={setAnswers}
        />
        <ResultPanel
          healthProfileCode={healthProfileCode}
          utilityScore={utilityScore}
        />
        <VasSection vasScore={vasScore} setVasScore={setVasScore} />

        <Separator />

        <ActionButtons
          onSave={handleSave}
          onClearHistory={handleClearHistory}
        />

        <Card className="overflow-hidden">
           <HistoryTable history={history} />
        </Card>
      </div>
       <footer className="text-center text-sm text-muted-foreground py-6">
        © {new Date().getFullYear()} Sawasdee Health. All Rights Reserved.
      </footer>
    </main>
  );
}
