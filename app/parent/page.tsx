"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getProgress } from "@/lib/storage";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ParentSummary() {
  const [p, setP] = useState<ReturnType<typeof getProgress> | null>(null);
  useEffect(() => setP(getProgress()), []);
  if (!p) return null;

  const last7 = p.history.slice(-7);
  const totalCorrect = last7.reduce((s, h) => s + h.correct, 0);
  const totalQs = last7.reduce((s, h) => s + h.total, 0);
  const accuracy = totalQs ? Math.round((totalCorrect / totalQs) * 100) : 0;

  return (
    <main className="container max-w-[480px] min-h-screen flex flex-col justify-between py-12">
      <header className="space-y-2">
        <p className="text-small text-text-subtle">Parent summary</p>
        <h1 className="text-display">최근 7일</h1>
      </header>

      <section className="space-y-4 my-12">
        <Card>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-subtle">완료 일수</span>
              <span className="tabular-nums">{last7.length}/7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-subtle">정답률</span>
              <span className="tabular-nums">{accuracy}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-subtle">현재 연속</span>
              <span className="tabular-nums">{p.streak}일</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-subtle">진도</span>
              <span className="tabular-nums">Day {Math.min(p.currentDay, 14)} / 14</span>
            </div>
          </div>
        </Card>

        {last7.length === 0 && (
          <p className="text-small text-text-subtle text-center">
            기록 없음. 첫 미션을 끝내면 여기 표시돼.
          </p>
        )}
      </section>

      <Link href="/" className="contents">
        <Button variant="outline" size="lg">
          홈으로
        </Button>
      </Link>
    </main>
  );
}
