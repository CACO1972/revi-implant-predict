
import React from "react";
import { Question } from "@/types/implant";

interface QuestionHeaderProps {
  question: Question;
}

export default function QuestionHeader({ question }: QuestionHeaderProps) {
  return (
    <>
      <h2 className="text-lg font-bold text-gold mb-4">
        {question.title}
      </h2>
      
      <p className="text-white/70 text-sm mb-6">
        {question.explanation}
      </p>
    </>
  );
}
