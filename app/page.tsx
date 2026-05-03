"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getProgress, todayISO, type Progress } from "@/lib/storage";
import data from "@/content/fractions.json";
import Link from "next/link";

export default function StartScreen() {
  const [p, setP] = useState<Progress | null>(null);
  useEffect(() => setP(getProgress()), []);

  if (!p) return null;

  const completedToday = p.lastSessionDate === todayISO();
  const day = p.currentDay;
  const today = data.days.find((d) => d.day === day);

  return (
    <main className="container max-w-[480px] py-12 space-y-10">
      <header className="space-y-2">
        <p className="text-small text-ink-soft">Day {day} of 14 · Fractions</p>
        <h1 className="text-display">오늘의 미션</h1>
        <p className="text-body text-ink-soft">약 8분. 개념 1개와 문제 5개.</p>
      </header>

      {today && (
        <Card className="space-y-1">
          <p className="text-caption text-ink-soft uppercase tracking-wide">오늘 배울 것</p>
          <p className="text-h1">{today.concept.title}</p>
        </Card>
      )}

      <section className="space-y-3">
        {completedToday ? (
          <>
            <p className="text-body text-center text-ink-soft">오늘은 완료했어. 내일 또 봐.</p>
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
          <p className="text-small text-ink-soft text-center">
            연속 {p.streak}일째.
          </p>
        )}
      </section>

      <footer className="text-caption text-ink-soft text-center pt-4">
        <Link href="/parent" className="hover:text-ink">부모용 요약</Link>
      </footer>
    </main>
  );
}
