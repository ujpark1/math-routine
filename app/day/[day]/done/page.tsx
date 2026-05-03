"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import data from "@/content/fractions.json";
import { recordSession, getProgress } from "@/lib/storage";
import Link from "next/link";
import { useEffect, useState } from "react";

type Params = { day: string };

export default function DoneScreen({ params }: { params: Params }) {
  const { day: dayStr } = params;
  const dayNum = parseInt(dayStr, 10);
  const day = data.days.find((d) => d.day === dayNum);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!day) return;
    let correct = 0;
    for (let i = 0; i < day.problems.length; i++) {
      if (sessionStorage.getItem(`day-${dayNum}-correct-${i}`)) correct++;
    }
    recordSession(dayNum, correct, day.problems.length);
    setStreak(getProgress().streak);

    // Cleanup session storage for this day
    for (let i = 0; i < day.problems.length; i++) {
      sessionStorage.removeItem(`day-${dayNum}-correct-${i}`);
    }
  }, [day, dayNum]);

  if (!day) return null;

  const isFinal = dayNum === 14;

  return (
    <main className="container max-w-[480px] py-12 space-y-10">
      <header className="space-y-2">
        <p className="text-small text-ink-soft">Day {day.day} · Done</p>
        <h1 className="text-display">{isFinal ? "다 했어." : "오늘 끝."}</h1>
        <p className="text-body text-ink-soft">
          {isFinal ? "14일 분수 단원을 마쳤어." : "내일 또 봐."}
        </p>
      </header>

      <section >
        <Card className="text-center space-y-4">
          {streak > 1 && (
            <p className="text-body">
              연속 <span className="text-accent font-semibold tabular-nums">{streak}일</span>째.
            </p>
          )}
          {streak === 1 && <p className="text-body">시작했어.</p>}
        </Card>
      </section>

      <Link href="/" className="contents">
        <Button variant="outline" size="lg">
          홈으로
        </Button>
      </Link>
    </main>
  );
}
