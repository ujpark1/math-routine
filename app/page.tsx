"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getProgress, todayISO, type Progress } from "@/lib/storage";
import Link from "next/link";

export default function StartScreen() {
  const [p, setP] = useState<Progress | null>(null);
  useEffect(() => setP(getProgress()), []);

  if (!p) return null;

  const completedToday = p.lastSessionDate === todayISO();
  const day = p.currentDay;

  return (
    <main className="container max-w-[480px] min-h-screen flex flex-col justify-between py-12">
      <header className="space-y-2">
        <p className="text-small text-text-subtle">Day {day} of 14 · Fractions</p>
        <h1 className="text-display">오늘의 미션</h1>
        <p className="text-body text-text-subtle">약 8분. 개념 1개와 문제 5개.</p>
      </header>

      <section className="flex flex-col items-stretch gap-3">
        {completedToday ? (
          <>
            <p className="text-body text-center">오늘은 완료했어. 내일 또 봐.</p>
            <Button variant="outline" size="lg" disabled>
              완료
            </Button>
          </>
        ) : (
          <Link href={`/day/${day}/concept`} className="contents">
            <Button variant="default" size="lg" autoFocus>
              시작하기
            </Button>
          </Link>
        )}
        {p.streak > 0 && (
          <p className="text-small text-text-subtle text-center">
            연속 {p.streak}일째.
          </p>
        )}
      </section>

      <footer className="text-caption text-text-subtle text-center">
        <Link href="/parent" className="hover:text-text">부모용 요약</Link>
      </footer>
    </main>
  );
}
