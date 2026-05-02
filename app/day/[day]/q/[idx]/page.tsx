"use client";

import { Button } from "@/components/ui/button";
import { Card, ProgressDots } from "@/components/ui/card";
import data from "@/content/fractions.json";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Params = { day: string; idx: string };

export default function QuestionScreen({ params }: { params: Params }) {
  const { day: dayStr, idx: idxStr } = params;
  const dayNum = parseInt(dayStr, 10);
  const idxNum = parseInt(idxStr, 10);
  const day = data.days.find((d) => d.day === dayNum);
  const router = useRouter();

  const [chosen, setChosen] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);

  if (!day || idxNum >= day.problems.length) {
    return <main className="container py-12"><p>잘못된 페이지.</p></main>;
  }

  const problem = day.problems[idxNum];
  const isCorrect = chosen !== null && chosen === problem.answer;
  const isWrong = chosen !== null && chosen !== problem.answer;

  function pick(i: number) {
    if (chosen !== null && chosen === problem.answer) return;
    setChosen(i);
    if (i !== problem.answer) {
      setShowHint(true);
    }
  }

  function next() {
    const totalProblems = day!.problems.length;
    if (idxNum + 1 < totalProblems) {
      router.push(`/day/${dayNum}/q/${idxNum + 1}`);
    } else {
      // pass results to done page through query params (no global state)
      const correctCount = (typeof window !== "undefined" ? sessionStorage.getItem(`day-${dayNum}-correct`) : null);
      router.push(`/day/${dayNum}/done`);
    }
  }

  function tryAgain() {
    setChosen(null);
    setShowHint(false);
  }

  // Track correct count in sessionStorage (resets each session)
  if (typeof window !== "undefined" && isCorrect) {
    const key = `day-${dayNum}-correct-${idxNum}`;
    sessionStorage.setItem(key, "1");
  }

  return (
    <main className="container max-w-[480px] min-h-screen flex flex-col justify-between py-12">
      <header className="space-y-3">
        <p className="text-small text-text-subtle">Day {day.day} · Question {idxNum + 1} of {day.problems.length}</p>
        <ProgressDots total={day.problems.length} current={idxNum} />
      </header>

      <section className="my-12 space-y-6">
        <Card>
          <p className="text-body">{problem.q}</p>
        </Card>

        <div role="radiogroup" aria-label="answer choices" className="grid gap-3">
          {problem.choices.map((c, i) => {
            const isThisChosen = chosen === i;
            const isThisAnswer = isCorrect && i === problem.answer;
            const isThisWrong = isWrong && i === chosen;
            return (
              <button
                key={i}
                role="radio"
                aria-checked={isThisChosen}
                onClick={() => pick(i)}
                disabled={isCorrect}
                className={[
                  "min-h-[44px] rounded-lg border px-4 py-3 text-left text-body transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                  "disabled:cursor-not-allowed",
                  isThisAnswer ? "border-accent bg-accent/10 text-text" :
                  isThisWrong ? "border-wrong bg-wrong/5 text-text" :
                  "border-border bg-bg hover:bg-bg-subtle",
                ].join(" ")}
              >
                {c}
              </button>
            );
          })}
        </div>

        {showHint && !isCorrect && (
          <Card className="border-warn/40 bg-warn/5">
            <p className="text-body text-text">
              <span className="font-semibold text-warn">힌트.</span> {problem.hint}
            </p>
          </Card>
        )}
      </section>

      <div className="flex gap-3">
        {isWrong && (
          <Button variant="outline" size="lg" onClick={tryAgain} className="flex-1">
            다시
          </Button>
        )}
        {isCorrect && (
          <Button variant="default" size="lg" onClick={next} className="flex-1" autoFocus>
            {idxNum + 1 < day.problems.length ? "다음" : "마치기"}
          </Button>
        )}
      </div>
    </main>
  );
}
