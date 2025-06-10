
export type PatientInfo = {
  name: string;
  age: number | null;
};

export type QuestionOption = {
  value: string | number;
  label: string;
  score: number;
};

export type Question = {
  id: number;
  title: string;
  explanation: string;
  options: QuestionOption[];
  recommendation: string;
  multiSelect?: boolean;
  isConditional?: boolean;
  showWhenQuestionHasValues?: {
    questionId: number;
    values: (string | number)[];
  };
};

export type Answer = {
  questionId: number;
  selectedValues: (string | number)[];
  score: number;
};

export type AssessmentResult = {
  totalScore: number;
  level: number;
  prediction: string;
  recommendations: string[];
};
