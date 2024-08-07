"use client"
import WordRotate from "@/components/magicui/word-rotate";

export async function WordRotateDemo() {
  return (
    <WordRotate
      className="text-2xl font-bold text-white dark:text-white"
      words={["Ad owner (Campaigner)", "Influencer", "Viewer"]}
    />
  );
}
