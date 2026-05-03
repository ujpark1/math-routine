"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import data from "@/content/fractions.json";
import { useRouter } from "next/navigation";


type Params = { day: string };

export default function ConceptScreen({ params }: { params: Params }) {
  const { day: dayStr } = params;
  const dayNum = parseInt(dayStr, 10);
  const day = data.days.find((d) => d.day === dayNum);
  const router = useRouter();

  if (!day) {
    return <main className="container py-12"><p>이 날의 콘텐츠가 없어.</p></main>;
  }

  return (
    <main className="container max-w-[480px] py-12 space-y-10">
      <header className="space-y-2">
        <p className="text-small text-ink-soft">Day {day.day} · Concept</p>
        <h1 className="text-h1">{day.concept.title}</h1>
      </header>

      <section className="flex items-center justify-center py-4">
        <Card className="w-full text-center space-y-6">
          <FractionVisual kind={day.concept.visual} note={day.concept.visualNote} />
          <p className="text-body">{day.concept.body}</p>
        </Card>
      </section>

      <Button
        size="lg"
        variant="default"
        onClick={() => router.push(`/day/${day.day}/q/0`)}
        autoFocus
        className="w-full"
      >
        이해했어요
      </Button>
    </main>
  );
}

function FractionVisual({ kind, note }: { kind: string; note: string }) {
  // Simple SVG visuals matching BRAND-DNA: minimal, no decoration
  if (kind === "pie") {
    return (
      <svg viewBox="0 0 100 100" className="w-32 h-32 mx-auto" aria-label={note}>
        <circle cx="50" cy="50" r="45" fill="hsl(var(--bg-subtle))" stroke="hsl(var(--border))" strokeWidth="2" />
        <path d="M50 50 L50 5 A45 45 0 0 1 95 50 Z" fill="hsl(var(--accent))" opacity="0.9" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="hsl(var(--border))" strokeWidth="1" />
      </svg>
    );
  }
  if (kind === "numberLine") {
    return (
      <svg viewBox="0 0 200 40" className="w-full max-w-xs mx-auto" aria-label={note}>
        <line x1="10" y1="20" x2="190" y2="20" stroke="hsl(var(--border))" strokeWidth="2" />
        {[10, 55, 100, 145, 190].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="14" x2={x} y2="26" stroke="hsl(var(--border))" strokeWidth="2" />
            <text x={x} y="38" textAnchor="middle" fontSize="10" fill="hsl(var(--text-subtle))">{i === 0 ? "0" : i === 4 ? "1" : `${i}/4`}</text>
          </g>
        ))}
      </svg>
    );
  }
  // Generic fallback: a labeled fraction
  return (
    <div className="text-display tabular-nums" aria-label={note}>
      <span className="block">3</span>
      <span className="block w-12 mx-auto h-[2px] bg-ink my-1" />
      <span className="block">4</span>
    </div>
  );
}
