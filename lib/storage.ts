// LocalStorage helpers — no backend, no auth (per first version spec)
const KEY = "math-routine-v1";

export type Progress = {
  currentDay: number;        // 1-14
  streak: number;
  lastSessionDate: string | null; // YYYY-MM-DD
  history: Array<{ day: number; date: string; correct: number; total: number }>;
};

const empty: Progress = { currentDay: 1, streak: 0, lastSessionDate: null, history: [] };

export function getProgress(): Progress {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

export function saveProgress(p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function recordSession(day: number, correct: number, total: number) {
  const p = getProgress();
  const today = todayISO();
  const lastDate = p.lastSessionDate;
  let nextStreak = p.streak;
  if (lastDate === today) {
    // already logged today; do nothing to streak
  } else if (lastDate && isYesterday(lastDate)) {
    nextStreak = p.streak + 1;
  } else if (!lastDate) {
    nextStreak = 1;
  } else {
    nextStreak = 1; // missed day(s) — gentle reset, no shaming
  }
  saveProgress({
    currentDay: Math.min(day + 1, 14),
    streak: nextStreak,
    lastSessionDate: today,
    history: [...p.history, { day, date: today, correct, total }],
  });
}

function isYesterday(dateISO: string) {
  const d = new Date(dateISO + "T00:00:00");
  const today = new Date(todayISO() + "T00:00:00");
  const diff = today.getTime() - d.getTime();
  return diff > 0 && diff <= 24 * 60 * 60 * 1000 + 5000;
}
