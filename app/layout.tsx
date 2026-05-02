import "./globals.css";

export const metadata = {
  title: "Math Routine — 매일 10분",
  description: "3-4학년을 위한 매일 10분 수학 루틴.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
